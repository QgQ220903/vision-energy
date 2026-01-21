// components/forms/CheckInForm.tsx - Sửa validation CSS cho dark mode
"use client";
import { useState } from "react";
import { Car, User, Phone, CheckCircle, AlertCircle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { translations } from "@/constants/translations";

export default function CheckInForm({ lang }: { lang: string }) {
  const [isNewCustomer, setIsNewCustomer] = useState(false);
  const [formData, setFormData] = useState({
    plate: "",
    name: "",
    phone: ""
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const t = translations[lang as keyof typeof translations];

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.plate.trim()) {
      newErrors.plate = t.pleaseEnterPlate;
    }
    
    if (isNewCustomer) {
      if (!formData.name.trim()) {
        newErrors.name = t.pleaseEnterName;
      }
      if (!formData.phone.trim()) {
        newErrors.phone = t.pleaseEnterPhone;
      } else if (!/^\d{10,11}$/.test(formData.phone.replace(/\D/g, ''))) {
        newErrors.phone = t.invalidPhone;
      }
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      // Handle successful submission
      console.log("Form submitted successfully:", formData);
      alert(t.registrationSuccess);
    }
  };

  return (
    <div className="bg-card border border-border rounded-xl p-5 shadow-sm">
      <div className="mb-6">
        <h2 className="text-lg font-semibold text-foreground mb-1">{t.checkinTitle}</h2>
        <p className="text-sm text-muted-foreground">
          {t.fillInfoToCharge}
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
        {/* Plate Number */}
        <div className="space-y-1.5">
          <label className="text-sm font-medium text-foreground flex items-center gap-1.5">
            <Car size={14} className="text-primary" />
            {t.plateLabel}
            <span className="text-xs text-muted-foreground font-normal ml-1">
              ({t.examplePlate})
            </span>
          </label>
          <input
            type="text"
            value={formData.plate}
            onChange={(e) => {
              setFormData({...formData, plate: e.target.value.toUpperCase()});
              if (errors.plate) setErrors({...errors, plate: ''});
            }}
            placeholder={t.examplePlate}
            className={`w-full px-3 py-2.5 rounded-lg border focus:outline-none transition-colors ${
              errors.plate 
                ? 'error-input focus:ring-2 focus:ring-red-400/50' 
                : 'border-border bg-input focus:border-primary focus:ring-2 focus:ring-primary/50'
            }`}
          />
          {errors.plate && (
            <div className="flex items-center gap-1 text-xs error-text">
              <AlertCircle size={12} />
              <span>{errors.plate}</span>
            </div>
          )}
        </div>

        {/* Customer Type Selection */}
        <div className="space-y-3">
          <div className="flex items-center justify-center gap-4">
            {/* Existing Member Button */}
            <button
              type="button"
              onClick={() => setIsNewCustomer(false)}
              className={`flex-1 py-2.5 px-3 rounded-lg border transition-all ${
                !isNewCustomer 
                  ? 'border-primary bg-primary/10 text-primary font-semibold' 
                  : 'border-border bg-input text-muted-foreground hover:bg-muted'
              }`}
            >
              <span className="text-sm">
                {t.member}
              </span>
            </button>
            
            {/* New Customer Button */}
            <button
              type="button"
              onClick={() => setIsNewCustomer(true)}
              className={`flex-1 py-2.5 px-3 rounded-lg border transition-all ${
                isNewCustomer 
                  ? 'border-accent bg-accent/10 text-accent font-semibold' 
                  : 'border-border bg-input text-muted-foreground hover:bg-muted'
              }`}
            >
              <span className="text-sm">
                {t.newCustomer}
              </span>
            </button>
          </div>

          {/* Status Indicator */}
          <div className="text-center">
            <span className="text-xs font-medium text-muted-foreground">
              {isNewCustomer ? t.isNew : t.isOld}
            </span>
          </div>

          <AnimatePresence>
            {isNewCustomer && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="space-y-3 mt-3 pt-3 border-t border-border"
              >
                <p className="text-sm font-medium text-accent">
                  {t.provideInfoForRegistration}
                </p>
                
                {/* Name Input */}
                <div className="space-y-1.5">
                  <label className="text-sm font-medium text-foreground flex items-center gap-1.5">
                    <User size={14} className="text-accent" />
                    {t.nameLabel}
                  </label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => {
                      setFormData({...formData, name: e.target.value});
                      if (errors.name) setErrors({...errors, name: ''});
                    }}
                    placeholder={t.nameLabel}
                    className={`w-full px-3 py-2.5 rounded-lg border focus:outline-none transition-colors ${
                      errors.name 
                        ? 'error-input focus:ring-2 focus:ring-red-400/50' 
                        : 'border-border bg-input focus:border-accent focus:ring-2 focus:ring-accent/50'
                    }`}
                  />
                  {errors.name && (
                    <div className="flex items-center gap-1 text-xs error-text">
                      <AlertCircle size={12} />
                      <span>{errors.name}</span>
                    </div>
                  )}
                </div>

                {/* Phone Input */}
                <div className="space-y-1.5">
                  <label className="text-sm font-medium text-foreground flex items-center gap-1.5">
                    <Phone size={14} className="text-accent" />
                    {t.phoneLabel}
                  </label>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => {
                      setFormData({...formData, phone: e.target.value});
                      if (errors.phone) setErrors({...errors, phone: ''});
                    }}
                    placeholder={t.phoneLabel}
                    className={`w-full px-3 py-2.5 rounded-lg border focus:outline-none transition-colors ${
                      errors.phone 
                        ? 'error-input focus:ring-2 focus:ring-red-400/50' 
                        : 'border-border bg-input focus:border-accent focus:ring-2 focus:ring-accent/50'
                    }`}
                  />
                  {errors.phone && (
                    <div className="flex items-center gap-1 text-xs error-text">
                      <AlertCircle size={12} />
                      <span>{errors.phone}</span>
                    </div>
                  )}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-semibold py-3 rounded-lg transition-colors flex items-center justify-center gap-2"
        >
          <CheckCircle size={18} />
          <span>{t.btnConfirm}</span>
        </button>

        {/* Help Text */}
        <p className="text-xs text-muted-foreground text-center pt-2">
          {t.infoSecured}
        </p>
      </form>
    </div>
  );
}