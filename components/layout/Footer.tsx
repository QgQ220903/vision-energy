// components/layout/Footer.tsx - Nút chỉ đường full width trên mobile
import { Zap, MapPin, Phone, Navigation } from "lucide-react";
import { translations } from "@/constants/translations";

export default function Footer({ lang = "vi" }: { lang?: string }) {
  const t = translations[lang as keyof typeof translations];
  const currentYear = new Date().getFullYear();

  // Hàm mở Google Maps
  const openGoogleMaps = () => {
    const address = encodeURIComponent(t.address);
    window.open(`https://www.google.com/maps/search/?api=1&query=${address}`, '_blank');
  };

  return (
    <footer className="pt-6 mt-6 border-t border-border">
      <div className="space-y-4">
        {/* Logo và tên lớn */}
        <div className="text-center space-y-3">
          <div className="flex items-center justify-center gap-3">
            <div className="w-12 h-12 bg-gradient-to-br from-primary to-accent rounded-xl flex items-center justify-center shadow-md">
              <Zap size={24} className="text-white" />
            </div>
            <div className="text-left">
              <h3 className="text-xl font-bold text-foreground">{t.companyName}</h3>
              <p className="text-xs text-muted-foreground mt-0.5">
                {t.evChargingSystem}
              </p>
            </div>
          </div>
        </div>

        {/* Thông tin liên hệ */}
        <div className="space-y-3">
          {/* Địa chỉ */}
          <div className="flex items-center bg-card border border-border rounded-lg p-3">
            <div className="flex items-center gap-2 flex-1 min-w-0">
              <MapPin size={16} className="text-primary flex-shrink-0" />
              <div className="min-w-0">
                <p className="text-sm font-medium text-foreground truncate">
                  {t.address}
                </p>
              </div>
            </div>
          </div>

          

          {/* Hotline */}
          <div className="flex items-center bg-card border border-border rounded-lg p-3">
            <div className="flex items-center gap-2 flex-1">
              <Phone size={16} className="text-primary" />
              <div className="text-left">
                <p className="text-sm font-medium text-foreground">{t.hotline}</p>
                <p className="text-xs text-muted-foreground mt-0.5">
                  {lang === "vi" ? "Hỗ trợ 24/7" : "24/7 Support"}
                </p>
              </div>
            </div>
          </div>
        </div>
        {/* Nút chỉ đường full width trên mobile */}
          <button
            onClick={openGoogleMaps}
            className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-gradient-to-r from-accent to-accent/90 hover:from-accent hover:to-accent text-accent-foreground rounded-lg font-semibold text-sm shadow-sm hover:shadow-md active:scale-95 transition-all"
          >
            <Navigation size={18} />
            <span>{t.getDirections}</span>
          </button>
        {/* Copyright */}
        <div className="text-center pt-4 border-t border-border">
          <p className="text-xs text-muted-foreground/70">
            {t.copyrightYear.replace("2024", currentYear.toString())}
          </p>
        </div>
      </div>
    </footer>
  );
}