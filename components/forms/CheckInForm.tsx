"use client";
import { useState } from "react";
import { Zap, ChevronRight, User, Phone } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { translations } from "@/constants/translations";

export default function CheckInForm({ lang }: { lang: string }) {
  const [isNew, setIsNew] = useState(false);
  const t = translations[lang as keyof typeof translations];

  return (
    <div className="bg-card rounded-[2.5rem] p-7 shadow-2xl border border-border transition-all duration-300">
      <h2 className="text-base font-black mb-6 text-foreground flex items-center gap-2 uppercase italic tracking-tighter">
        <div className="p-1.5 bg-primary rounded-lg shadow-lg shadow-primary/20">
          <Zap size={16} className="text-primary-foreground fill-current" />
        </div>
        {t.checkinTitle}
      </h2>

      <div className="space-y-5">
        {/* Input Biển Số Xe */}
        <div className="group">
          <label className="text-[10px] font-black uppercase text-muted-foreground group-focus-within:text-primary transition-colors ml-1 tracking-widest">
            {t.plateLabel}
          </label>
          <input 
            type="text" 
            placeholder="51H-123.45" 
            className="w-full p-4 mt-1 rounded-2xl bg-input border-2 border-transparent focus:border-primary focus:bg-card outline-none font-black text-xl uppercase text-foreground transition-all placeholder:text-muted-foreground/30 shadow-inner" 
          />
        </div>

        {/* Thông tin khách hàng mới */}
        <AnimatePresence>
          {isNew && (
            <motion.div 
              initial={{ opacity: 0, height: 0 }} 
              animate={{ opacity: 1, height: "auto" }} 
              exit={{ opacity: 0, height: 0 }} 
              className="space-y-4 overflow-hidden"
            >
              <div className="relative">
                <User size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" />
                <input 
                  type="text" 
                  placeholder={t.nameLabel} 
                  className="w-full p-4 pl-12 rounded-2xl bg-input text-foreground font-bold outline-none border-2 border-transparent focus:border-accent transition-all" 
                />
              </div>
              <div className="relative">
                <Phone size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" />
                <input 
                  type="tel" 
                  placeholder={t.phoneLabel} 
                  className="w-full p-4 pl-12 rounded-2xl bg-input text-foreground font-bold outline-none border-2 border-transparent focus:border-accent transition-all" 
                />
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Nút Confirm - Màu Primary */}
        <button className="group w-full bg-primary hover:opacity-90 text-primary-foreground font-black py-4 rounded-2xl shadow-xl shadow-primary/20 uppercase tracking-widest active:scale-95 transition-all flex items-center justify-center gap-2">
          {t.btnConfirm}
          <ChevronRight size={18} className="group-hover:translate-x-1 transition-transform" />
        </button>

        {/* Toggle Khách cũ/mới - Màu Accent */}
        <button 
          onClick={() => setIsNew(!isNew)} 
          className="w-full text-center text-[10px] font-black text-muted-foreground hover:text-accent uppercase pt-2 transition-colors tracking-tight"
        >
          {isNew ? t.isOld : t.isNew}
        </button>
      </div>
    </div>
  );
}