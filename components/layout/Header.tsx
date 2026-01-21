// components/layout/Header.tsx - Đã cập nhật translation
"use client";
import { useTheme } from "next-themes";
import { MapPin, Globe, Sun, Moon, Navigation, Zap } from "lucide-react";
import { useEffect, useState } from "react";
import { translations } from "@/constants/translations";

export default function Header({ lang, setLang }: { lang: string, setLang: any }) {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const t = translations[lang as keyof typeof translations];

  useEffect(() => setMounted(true), []);

  if (!mounted) return null;

  // Hàm mở Google Maps với địa chỉ
  const openGoogleMaps = () => {
    const address = encodeURIComponent(t.address);
    window.open(`https://www.google.com/maps/search/?api=1&query=${address}`, '_blank');
  };

  return (
    <header className="w-full border-b border-border bg-card py-3">
      <div className="px-4">
        {/* Dòng 1: Logo và các nút nhỏ */}
        <div className="flex items-center justify-between mb-3">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <div className="w-9 h-9 bg-gradient-to-br from-primary to-accent rounded-lg flex items-center justify-center shadow-sm">
              <Zap size={18} className="text-white" />
            </div>
            <div>
              <h1 className="text-base font-semibold text-foreground">{t.companyName}</h1>
            </div>
          </div>

          {/* Các nút nhỏ: Language và Theme */}
          <div className="flex items-center gap-1">
            {/* Language Selector - Compact */}
            <button
              onClick={() => setLang(lang === "vi" ? "en" : "vi")}
              className="p-2 bg-card-secondary border border-border rounded-md text-foreground hover:bg-muted transition-colors"
              title={t.changeLanguage}
            >
              <Globe size={16} />
            </button>

            {/* Theme Toggle - Compact */}
            <button
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className="p-2 bg-card-secondary border border-border rounded-md text-foreground hover:bg-muted transition-colors"
              aria-label={t.toggleTheme}
              title={t.toggleTheme}
            >
              {theme === "dark" ? (
                <Sun size={16} className="text-foreground" />
              ) : (
                <Moon size={16} className="text-foreground" />
              )}
            </button>
          </div>
        </div>

        {/* Dòng 2: Địa chỉ và nút chỉ đường */}
        <div className="flex items-center justify-between gap-2">
          {/* Địa chỉ */}
          <div className="flex items-center gap-1.5 min-w-0 flex-1">
            <MapPin size={12} className="text-muted-foreground flex-shrink-0" />
            <span className="text-xs text-muted-foreground truncate">
              {t.address}
            </span>
          </div>

          {/* Nút chỉ đường - Lớn và nổi bật */}
          <button
            onClick={openGoogleMaps}
            className="flex items-center gap-1.5 px-3 py-2 bg-gradient-to-r from-accent to-accent/90 text-accent-foreground rounded-lg font-semibold text-sm whitespace-nowrap flex-shrink-0 shadow-sm hover:shadow-md active:scale-95 transition-all"
            title={t.direction}
          >
            <Navigation size={16} />
            <span className="font-medium">{t.route}</span>
          </button>
        </div>
      </div>
    </header>
  );
}