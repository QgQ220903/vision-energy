// components/layout/Header.tsx - Phiên bản chuyên nghiệp, hiện đại
"use client";
import { useTheme } from "next-themes";
import { MapPin, Globe, Sun, Moon, Navigation, Zap, ChevronRight } from "lucide-react";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { translations } from "@/constants/translations";

export default function Header({ lang, setLang }: { lang: string, setLang: any }) {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const t = translations[lang as keyof typeof translations];

  useEffect(() => {
    setMounted(true);
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (!mounted) return null;

  const openGoogleMaps = () => {
    const address = encodeURIComponent(t.address);
    window.open(`https://www.google.com/maps/search/?api=1&query=${address}`, '_blank');
  };

  return (
    <motion.header 
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      className={`sticky top-0 z-40 w-full transition-all duration-300 ${
        scrolled 
          ? 'bg-card/80 backdrop-blur-lg border-b border-border/50 py-3' 
          : 'bg-transparent py-4'
      }`}
    >
      <div className="px-6">
        {/* MAIN HEADER ROW */}
        <div className="flex items-center justify-between">
          {/* LOGO SECTION */}
          <div className="flex items-center gap-3">
            <div className="relative">
              <div className="w-12 h-12 bg-gradient-to-br from-primary to-accent rounded-2xl flex items-center justify-center shadow-lg shadow-primary/20">
                <Zap size={24} className="text-white" />
              </div>
              <div className="absolute -top-1 -right-1 w-4 h-4 bg-white rounded-full border-2 border-primary" />
            </div>
            <div>
              <h1 className="text-lg font-bold text-foreground tracking-tight">
                <span className="text-primary">VISION</span>
                <span className="text-foreground ml-1">ENERGY</span>
              </h1>
              <p className="text-xs text-muted-foreground font-medium mt-0.5">
                {t.companyName.split(' ')[2]} {/* Hiển thị "Station" */}
              </p>
            </div>
          </div>

          {/* CONTROLS SECTION */}
          <div className="flex items-center gap-2">
            {/* LANGUAGE SELECTOR */}
            <div className="relative group">
              <button
                onClick={() => setLang(lang === "vi" ? "en" : "vi")}
                className="flex items-center gap-2 px-3 py-2 bg-card/50 border border-border/50 rounded-xl hover:bg-muted/30 transition-all duration-200"
              >
                <Globe size={18} className="text-primary" />
                <span className="text-sm font-semibold text-foreground">
                  {lang.toUpperCase()}
                </span>
                <ChevronRight size={14} className="text-muted-foreground group-hover:rotate-90 transition-transform" />
              </button>
              
              {/* Language dropdown (hidden until hover) */}
              <div className="absolute right-0 top-full mt-2 w-32 py-2 bg-card border border-border/50 rounded-xl shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 backdrop-blur-sm">
                <button
                  onClick={() => setLang("vi")}
                  className={`w-full px-4 py-2.5 text-left text-sm hover:bg-primary/5 transition-colors flex items-center justify-between ${
                    lang === "vi" ? "text-primary font-semibold" : "text-foreground"
                  }`}
                >
                  <span>Tiếng Việt</span>
                  {lang === "vi" && <div className="w-2 h-2 bg-primary rounded-full" />}
                </button>
                <button
                  onClick={() => setLang("en")}
                  className={`w-full px-4 py-2.5 text-left text-sm hover:bg-primary/5 transition-colors flex items-center justify-between ${
                    lang === "en" ? "text-primary font-semibold" : "text-foreground"
                  }`}
                >
                  <span>English</span>
                  {lang === "en" && <div className="w-2 h-2 bg-primary rounded-full" />}
                </button>
              </div>
            </div>

            {/* THEME TOGGLE */}
            <button
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className="p-3 bg-card/50 border border-border/50 rounded-xl hover:bg-muted/30 transition-all duration-200 group relative overflow-hidden"
              aria-label={t.toggleTheme}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-accent/10 opacity-0 group-hover:opacity-100 transition-opacity" />
              {theme === "dark" ? (
                <Sun size={20} className="text-primary relative z-10" />
              ) : (
                <Moon size={20} className="text-primary relative z-10" />
              )}
            </button>
          </div>
        </div>

        {/* ADDRESS AND DIRECTIONS ROW */}
        <motion.div 
          initial={{ opacity: 0, y: -5 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mt-4 flex items-center justify-between gap-3"
        >
          {/* ADDRESS */}
          <div 
            className="flex-1 min-w-0 group cursor-pointer"
            onClick={openGoogleMaps}
          >
            <div className="flex items-center gap-2">
              <MapPin size={16} className="text-primary flex-shrink-0" />
              <p className="text-sm font-medium text-foreground truncate group-hover:text-primary transition-colors">
                {t.address}
              </p>
            </div>
            <p className="text-xs text-muted-foreground mt-1 font-medium">
              {t.direction}
            </p>
          </div>

          {/* DIRECTIONS BUTTON */}
          <motion.button
            onClick={openGoogleMaps}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center gap-2 px-4 py-3 bg-gradient-to-r from-accent to-accent/90 text-accent-foreground font-semibold rounded-xl shadow-lg shadow-accent/20 hover:shadow-accent/30 transition-all duration-200 whitespace-nowrap"
          >
            <Navigation size={18} />
            <span>{t.route}</span>
          </motion.button>
        </motion.div>

        {/* STATUS INDICATOR */}
        <div className="mt-3 flex items-center gap-3">
          <div className="flex items-center gap-1.5">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
            <span className="text-xs font-medium text-green-600">
              {lang === "vi" ? "Đang mở cửa" : "Now Open"}
            </span>
          </div>
          <div className="h-3 w-px bg-border" />
        </div>
      </div>
    </motion.header>
  );
}