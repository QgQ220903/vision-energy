// components/sections/Amenities.tsx - Cập nhật với 8 pills mới
import { Zap, Coffee, Car, Bed, Sparkles, Shield, Home, Gift } from "lucide-react";
import { translations } from "@/constants/translations";

export default function Amenities({ lang }: { lang: string }) {
  const t = translations[lang as keyof typeof translations];
  
  const amenities = [
    { 
      icon: <Zap size={18} />, 
      label: t.chargingGuns,
      color: "text-primary"
    },
    { 
      icon: <Coffee size={18} />, 
      label: t.coffeeFood,
      color: "text-accent"
    },
    { 
      icon: <Car size={18} />, 
      label: t.overnightParking,
      color: "text-primary"
    },
    { 
      icon: <Bed size={18} />, 
      label: t.driverRest,
      color: "text-accent"
    },
    { 
      icon: <Sparkles size={18} />, 
      label: t.cleanFacility,
      color: "text-primary"
    },
    { 
      icon: <Shield size={18} />, 
      label: t.securityCameras,
      color: "text-accent"
    },
    { 
      icon: <Home size={18} />, 
      label: t.coveredArea,
      color: "text-primary"
    },
    { 
      icon: <Gift size={18} />, 
      label: t.freeWaterGifts,
      color: "text-accent"
    },
  ];

  return (
    <div className="space-y-5">
      <div>
        <h3 className="text-lg font-semibold text-foreground mb-1">{t.amenitiesTitle}</h3>
        <p className="text-sm text-muted-foreground">
          {t.heroSlogan} {/* Sử dụng cùng slogan với hero section */}
        </p>
      </div>
      
      <div className="grid grid-cols-2 gap-3">
        {amenities.map((item, index) => (
          <div
            key={index}
            className="bg-card-secondary border border-border rounded-lg p-4 hover:border-primary/30 transition-colors"
          >
            <div className="flex items-center gap-3">
              <div className={`p-2 rounded-md ${item.color} bg-opacity-10`}>
                {item.icon}
              </div>
              <h4 className="font-medium text-foreground text-sm leading-tight">
                {item.label}
              </h4>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}