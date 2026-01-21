// components/sections/Amenities.tsx - Phiên bản chuyên nghiệp, hiện đại
import { Zap, Coffee, Car, Bed, Sparkles, Shield, Home, Gift, Battery, CheckCircle } from "lucide-react";
import { motion } from "framer-motion";
import { translations } from "@/constants/translations";

export default function Amenities({ lang }: { lang: string }) {
  const t = translations[lang as keyof typeof translations];
  
  const amenities = [
    { 
      icon: <Zap size={22} />, 
      label: t.chargingGuns,
      description: lang === "vi" ? "Sạc siêu tốc" : "Ultra fast charging",
      color: "text-primary",
      bgColor: "from-primary/5 to-primary/10",
      borderColor: "border-primary/20",
      iconBg: "bg-primary/10"
    },
    { 
      icon: <Coffee size={22} />, 
      label: t.coffeeFood,
      description: lang === "vi" ? "Nhà hàng & giải khát" : "Restaurant & drinks",
      color: "text-accent",
      bgColor: "from-accent/5 to-accent/10",
      borderColor: "border-accent/20",
      iconBg: "bg-accent/10"
    },
    { 
      icon: <Car size={22} />, 
      label: t.overnightParking,
      description: lang === "vi" ? "An toàn 24/7" : "Secure 24/7",
      color: "text-primary",
      bgColor: "from-primary/5 to-primary/10",
      borderColor: "border-primary/20",
      iconBg: "bg-primary/10"
    },
    { 
      icon: <Bed size={22} />, 
      label: t.driverRest,
      description: lang === "vi" ? "Khu nghỉ ngơi" : "Rest area",
      color: "text-accent",
      bgColor: "from-accent/5 to-accent/10",
      borderColor: "border-accent/20",
      iconBg: "bg-accent/10"
    },
    { 
      icon: <Sparkles size={22} />, 
      label: t.cleanFacility,
      description: lang === "vi" ? "Tiêu chuẩn vệ sinh cao" : "High cleanliness standards",
      color: "text-primary",
      bgColor: "from-primary/5 to-primary/10",
      borderColor: "border-primary/20",
      iconBg: "bg-primary/10"
    },
    { 
      icon: <Shield size={22} />, 
      label: t.securityCameras,
      description: lang === "vi" ? "Giám sát toàn bộ" : "Full surveillance",
      color: "text-accent",
      bgColor: "from-accent/5 to-accent/10",
      borderColor: "border-accent/20",
      iconBg: "bg-accent/10"
    },
    { 
      icon: <Home size={22} />, 
      label: t.coveredArea,
      description: lang === "vi" ? "Tránh mưa nắng" : "Weather protection",
      color: "text-primary",
      bgColor: "from-primary/5 to-primary/10",
      borderColor: "border-primary/20",
      iconBg: "bg-primary/10"
    },
    { 
      icon: <Gift size={22} />, 
      label: t.freeWaterGifts,
      description: lang === "vi" ? "Quà tặng thành viên" : "Member gifts",
      color: "text-accent",
      bgColor: "from-accent/5 to-accent/10",
      borderColor: "border-accent/20",
      iconBg: "bg-accent/10"
    },
  ];

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-8"
    >
      {/* HEADER */}
      <div className="text-center space-y-3">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-primary/5 rounded-full mb-2">
          <Battery size={16} className="text-primary" />
          <span className="text-xs font-semibold text-primary uppercase tracking-wider">
            {lang === "vi" ? "TIỆN ÍCH CAO CẤP" : "PREMIUM AMENITIES"}
          </span>
        </div>
        
        <h3 className="text-2xl font-bold text-foreground">
          {t.amenitiesTitle}
        </h3>
        <p className="text-base text-muted-foreground max-w-md mx-auto leading-relaxed">
          {t.heroSlogan}
        </p>
      </div>

      {/* AMENITIES GRID */}
      <div className="grid grid-cols-2 gap-4">
        {amenities.map((item, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.05 }}
            whileHover={{ 
              y: -6, 
              transition: { duration: 0.2 }
            }}
            className={`relative bg-gradient-to-br ${item.bgColor} border ${item.borderColor} rounded-2xl p-5 transition-all duration-300 hover:shadow-xl group cursor-pointer overflow-hidden`}
          >
            {/* Hover Effect */}
            <div className="absolute inset-0 bg-gradient-to-br from-white/0 via-white/5 to-white/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            
            {/* Content */}
            <div className="relative z-10">
              <div className="flex items-start justify-between mb-4">
                <div className={`p-3 ${item.iconBg} rounded-xl ${item.color} group-hover:scale-110 transition-transform duration-300`}>
                  {item.icon}
                </div>
                <CheckCircle size={16} className={`${item.color} opacity-0 group-hover:opacity-100 transition-opacity`} />
              </div>
              
              <div className="space-y-2">
                <h4 className="font-bold text-foreground text-sm leading-tight">
                  {item.label}
                </h4>
                <p className="text-xs text-muted-foreground">
                  {item.description}
                </p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* FOOTNOTE */}

    </motion.div>
  );
}