// components/layout/Footer.tsx - Phiên bản chuyên nghiệp, hiện đại
import { Zap, MapPin, Phone, Navigation, ChevronRight, Shield, Clock } from "lucide-react";
import { motion } from "framer-motion";
import { translations } from "@/constants/translations";

export default function Footer({ lang = "vi" }: { lang?: string }) {
  const t = translations[lang as keyof typeof translations];
  const currentYear = new Date().getFullYear();

  const openGoogleMaps = () => {
    const address = encodeURIComponent(t.address);
    window.open(`https://www.google.com/maps/search/?api=1&query=${address}`, '_blank');
  };

  return (
    <motion.footer
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="pt-8 mt-8 border-t border-border/50"
    >
      <div className="space-y-8">
        {/* HEADER SECTION */}
        <div className="text-center space-y-4">
          <div className="flex items-center justify-center gap-4">
            <div className="relative">
              <div className="w-16 h-16 bg-gradient-to-br from-primary to-accent rounded-2xl flex items-center justify-center shadow-xl shadow-primary/20">
                <Zap size={28} className="text-white" />
              </div>
              <div className="absolute -top-1 -right-1 w-5 h-5 bg-white rounded-full border-2 border-primary flex items-center justify-center">
                <Shield size={10} className="text-primary" />
              </div>
            </div>
            <div className="text-left">
              <h3 className="text-xl font-bold text-foreground">
                <span className="text-primary">VISION</span>
                <span className="text-foreground"> ENERGY</span>
              </h3>
              <p className="text-sm text-muted-foreground font-medium mt-0.5">
                {t.companyName.split(' ')[2]} {/* Station */}
              </p>
              <div className="flex items-center gap-2 mt-2">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                <span className="text-xs font-medium text-green-600">
                  {lang === "vi" ? "Đang hoạt động" : "Operational"}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* CONTACT INFORMATION */}
        <div className="space-y-4">
          {/* ADDRESS CARD */}
          <motion.div
            whileHover={{ scale: 1.02 }}
            className="bg-gradient-to-br from-card to-card/50 border border-border/50 rounded-2xl p-5 shadow-sm"
          >
            <div className="flex items-start gap-3">
              <div className="p-2.5 bg-primary/10 rounded-lg">
                <MapPin size={20} className="text-primary" />
              </div>
              <div className="flex-1 min-w-0">
                <h4 className="text-sm font-semibold text-foreground mb-1">
                  {lang === "vi" ? "Địa chỉ trạm sạc" : "Charging Station Address"}
                </h4>
                <p className="text-sm text-foreground/90 font-medium">
                  {t.address}
                </p>
              </div>
            </div>
          </motion.div>

          {/* HOTLINE CARD */}
          <motion.div
            whileHover={{ scale: 1.02 }}
            className="bg-gradient-to-br from-card to-card/50 border border-border/50 rounded-2xl p-5 shadow-sm"
          >
            <div className="flex items-start gap-3">
              <div className="p-2.5 bg-accent/10 rounded-lg">
                <Phone size={20} className="text-accent" />
              </div>
              <div className="flex-1">
                <h4 className="text-sm font-semibold text-foreground mb-1">
                  {lang === "vi" ? "Hỗ trợ khách hàng" : "Customer Support"}
                </h4>
                <div className="space-y-1">
                  <a
                    href={`tel:${t.hotline.replace(/\s+/g, '')}`}
                    className="text-lg font-bold text-foreground hover:text-primary transition-colors"
                  >
                    {t.hotline}
                  </a>
                  <div className="flex items-center gap-2">
                    <Clock size={14} className="text-muted-foreground" />
                    <span className="text-xs font-medium text-muted-foreground">
                      {lang === "vi" ? "Hỗ trợ 24/7" : "24/7 Support"}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* DIRECTIONS BUTTON */}
        <motion.button
          onClick={openGoogleMaps}
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          className="w-full flex items-center justify-center gap-3 px-6 py-4 bg-gradient-to-r from-accent to-accent/90 hover:from-accent hover:to-accent text-accent-foreground font-semibold rounded-2xl shadow-lg shadow-accent/25 transition-all duration-200 group"
        >
          <div className="p-2 bg-white/20 rounded-lg">
            <Navigation size={22} />
          </div>
          <div className="flex-1 text-left">
            <p className="text-sm font-medium text-white/90">{t.getDirections}</p>
            <p className="text-xs text-white/70 font-medium">
              {lang === "vi" ? "Mở Google Maps" : "Open Google Maps"}
            </p>
          </div>
          <ChevronRight size={18} className="group-hover:translate-x-1 transition-transform" />
        </motion.button>

        {/* COPYRIGHT */}
        <div className="pt-6 border-t border-border/30">
          <div className="text-center space-y-2">
            <p className="text-xs font-medium text-muted-foreground/70">
              {t.copyrightYear.replace("2024", currentYear.toString())}
            </p>
            <p className="text-xs text-muted-foreground/50">
              {t.evChargingSystem}
            </p>
          </div>
        </div>
      </div>
    </motion.footer>
  );
}