import { supabase } from "@/lib/supabase";

export const processCheckIn = async (plate: string, name?: string, phone?: string) => {
  // 1. Xử lý thông tin khách hàng (Upsert)
  // Lưu ý: license_plate là khóa chính nên sẽ tự động cập nhật nếu đã tồn tại
  if (name || phone) {
    const { error: customerError } = await supabase.from("customers").upsert({
      license_plate: plate,
      full_name: name,
      phone_number: phone,
      // created_at sẽ tự động lấy now() theo schema nếu là dòng mới
    }, { onConflict: 'license_plate' });

    if (customerError) throw customerError;
  }

  // 2. Ghi nhận lượt sạc mới
  // Schema của bạn: mặc định start_time = now(), status = 'completed', station_id = 'station_01'
  const { error: sessionError } = await supabase
    .from("charging_sessions")
    .insert([{ license_plate: plate }]); 

  if (sessionError) throw sessionError;

  // 3. Lấy thống kê (Sửa lại tên cột thành start_time)
  
  // Tổng lượt sạc từ trước tới nay
  const { count: totalCount } = await supabase
    .from("charging_sessions")
    .select("*", { count: 'exact', head: true })
    .eq("license_plate", plate);

  // Lượt sạc trong tháng hiện tại
  const date = new Date();
  const firstDayOfMonth = new Date(date.getFullYear(), date.getMonth(), 1).toISOString();

  const { count: monthlyCount } = await supabase
    .from("charging_sessions")
    .select("*", { count: 'exact', head: true })
    .eq("license_plate", plate)
    .gte("start_time", firstDayOfMonth); // SỬA TẠI ĐÂY: created_at -> start_time

  return {
    monthlyCount: monthlyCount || 0,
    totalCount: totalCount || 0
  };
};