import { supabase } from "@/lib/supabase";

// CẤU HÌNH THỜI GIAN CHẶN (Phút)
const CHECKIN_INTERVAL = 5; // Đổi thành 120 khi chạy thật

export const processCheckIn = async (plate: string, name?: string, phone?: string) => {
  // --- BƯỚC 0: KIỂM TRA KHOẢNG CÁCH THỜI GIAN (ANTI-FRAUD) ---
  const { data: sessions, error: fetchError } = await supabase
    .from("charging_sessions")
    .select("start_time")
    .eq("license_plate", plate)
    .order("start_time", { ascending: false })
    .limit(1);

  if (fetchError) {
    console.error("Lỗi kiểm tra lịch sử sạc:", fetchError.message);
  }

  // Kiểm tra nếu tìm thấy ít nhất 1 phiên sạc trước đó
  if (sessions && sessions.length > 0) {
    const lastSession = sessions[0]; // Lấy phiên sạc gần nhất từ mảng
    const lastTime = new Date(lastSession.start_time).getTime();
    const now = new Date().getTime();
    const diffMinutes = Math.floor((now - lastTime) / (1000 * 60));

    // Nếu thời gian chờ chưa đủ (Cooldown)
    if (diffMinutes < CHECKIN_INTERVAL) {
      throw new Error(`COOLDOWN:${CHECKIN_INTERVAL - diffMinutes}`);
    }
  }

  // 1. Xử lý thông tin khách hàng 
  if (name || phone) {
    const { error: customerError } = await supabase.from("customers").upsert({
      license_plate: plate,
      full_name: name,
      phone_number: phone,
    }, { onConflict: 'license_plate' });
    if (customerError) throw customerError;
  }

  // 2. Ghi nhận lượt sạc mới
  const { error: sessionError } = await supabase
    .from("charging_sessions")
    .insert([{ license_plate: plate }]);
  if (sessionError) throw sessionError;

  // 3. Lấy thống kê 
  const { count: totalCount } = await supabase
    .from("charging_sessions")
    .select("*", { count: 'exact', head: true })
    .eq("license_plate", plate);

  const date = new Date();
  const firstDayOfMonth = new Date(date.getFullYear(), date.getMonth(), 1).toISOString();
  const { count: monthlyCount } = await supabase
    .from("charging_sessions")
    .select("*", { count: 'exact', head: true })
    .eq("license_plate", plate)
    .gte("start_time", firstDayOfMonth);

  return {
    monthlyCount: monthlyCount || 0,
    totalCount: totalCount || 0
  };
};