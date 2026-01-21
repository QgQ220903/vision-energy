// app/page.tsx - Hero Section đã cập nhật translation
"use client";
import { useState, useEffect } from "react";
import Header from "@/components/layout/Header";
import CheckInForm from "@/components/forms/CheckInForm";
import Amenities from "@/components/sections/Amenities";
import Footer from "@/components/layout/Footer";
import { motion } from "framer-motion";
import { Shield, Clock, Car, Zap } from "lucide-react";
import { translations } from "@/constants/translations";

export default function HomePage() {
  const [lang, setLang] = useState<"vi" | "en">("vi");
  const [mounted, setMounted] = useState(false);
  const t = translations[lang as keyof typeof translations];

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className="min-h-screen bg-background transition-colors duration-300">
      <Header lang={lang} setLang={setLang} />

      <div className="w-full max-w-md mx-auto px-4 py-6">
        <motion.main
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
          className="space-y-8"
        >
          {/* Hero Section */}
          <div className="text-center space-y-4">
            {/* Logo lớn giống Header và Footer */}
            <div className="flex justify-center mb-2">
              <div className="w-16 h-16 bg-gradient-to-br from-primary to-accent rounded-xl flex items-center justify-center shadow-md">
                <Zap size={28} className="text-white" />
              </div>
            </div>

            <h1 className="text-2xl font-bold text-foreground">
              <span className="text-primary">{t.visionText}</span>{" "}
              <span className="text-foreground">{t.energyStationText}</span>
            </h1>

            <p className="text-base text-muted-foreground max-w-sm mx-auto">
              {t.reliableCharging}
            </p>

            {/* Trust badges */}
            <div className="flex items-center justify-center gap-4 pt-2">
              <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                <Shield size={12} className="text-green-600" />
                <span>{t.secure}</span>
              </div>
              <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                <Clock size={12} className="text-primary" />
                <span>{t.twentyFourSeven}</span>
              </div>
              <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                <Car size={12} className="text-accent" />
                <span>{t.fastCharging}</span>
              </div>
            </div>
          </div>

          {/* Form check-in */}
          <CheckInForm lang={lang} />

          {/* Tiện ích */}
          <Amenities lang={lang} />

          {/* Footer */}
          <Footer lang={lang} />
        </motion.main>
      </div>
    </div>
  );
}