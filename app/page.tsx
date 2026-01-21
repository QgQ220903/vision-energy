"use client";
import { useState } from "react";
import Header from "@/components/layout/Header";
import CheckInForm from "@/components/forms/CheckInForm";
import Amenities from "@/components/sections/Amenities";
import Footer from "@/components/layout/Footer";

export default function HomePage() {
  const [lang, setLang] = useState<"vi" | "en">("vi");

  return (
    <div className="min-h-screen flex justify-center bg-background transition-colors duration-500">
      {/* Giới hạn khung hình mobile app trên desktop */}
      <div className="w-full max-w-md flex flex-col min-h-screen px-6">
        <Header lang={lang} setLang={setLang} />
        
        <main className="flex-grow flex flex-col">
          <CheckInForm lang={lang} />
          <Amenities lang={lang} />
        </main>

        <Footer />
      </div>
    </div>
  );
}