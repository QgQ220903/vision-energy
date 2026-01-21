"use client";
import { useTheme } from "next-themes";
import { Sun, Moon, Languages, MapPin } from "lucide-react";
import { Switch } from "@/components/ui/switch";
import { useEffect, useState } from "react";
import { translations } from "@/constants/translations";

export default function Header({ lang, setLang }: { lang: string, setLang: any }) {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const t = translations[lang as keyof typeof translations];

  // Đảm bảo không bị lỗi Hydration khi render server-side
  useEffect(() => setMounted(true), []);
  if (!mounted) return null;

  return (
    <header className="w-full flex flex-col items-center py-6 gap-6">
      <div className="flex justify-between w-full items-center">
        
        {/* Toggle Ngôn ngữ - Sử dụng màu Accent (Xanh dương) */}
        <div className="flex items-center gap-2 bg-card border border-border p-1.5 rounded-full shadow-sm transition-colors">
          <span className={`text-[9px] font-black ml-2 transition-colors ${lang === 'vi' ? 'text-accent' : 'text-muted-foreground'}`}>
            VI
          </span>
          <Switch 
            checked={lang === 'en'} 
            onCheckedChange={() => setLang(lang === 'vi' ? 'en' : 'vi')}
            // Sử dụng màu accent cho switch khi bật
            className="data-[state=checked]:bg-accent data-[state=unchecked]:bg-input scale-75" 
          />
          <span className={`text-[9px] font-black mr-2 transition-colors ${lang === 'en' ? 'text-accent' : 'text-muted-foreground'}`}>
            EN
          </span>
        </div>

        {/* Toggle Theme - Sử dụng màu Primary (Xanh lá) */}
        <div className="flex items-center gap-2 bg-card border border-border p-1.5 rounded-full shadow-sm transition-colors">
          <Sun 
            size={14} 
            className={`transition-colors ${theme === 'light' ? 'text-primary' : 'text-muted-foreground'}`} 
          />
          <Switch 
            checked={theme === 'dark'} 
            onCheckedChange={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            // Sử dụng màu primary cho switch khi bật
            className="data-[state=checked]:bg-primary data-[state=unchecked]:bg-input scale-75"
          />
          <Moon 
            size={14} 
            className={`transition-colors ${theme === 'dark' ? 'text-primary' : 'text-muted-foreground'}`} 
          />
        </div>
      </div>

      <div className="text-center">
        <h1 className="text-4xl font-black tracking-tighter uppercase italic leading-none">
          <span className="text-primary transition-colors">ENERGY</span> 
          <span className="text-foreground transition-colors ml-1">STATION</span>
        </h1>
        <div className="flex items-center justify-center gap-1.5 mt-2">
           <div className="h-[1px] w-4 bg-accent/50" />
           <p className="text-muted-foreground text-[9px] font-bold uppercase tracking-[0.2em]">
             {t.address}
           </p>
           <div className="h-[1px] w-4 bg-accent/50" />
        </div>
      </div>
    </header>
  );
}