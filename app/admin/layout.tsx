"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  LayoutDashboard, History, Users, Settings, LogOut, Zap,
  Sun, Moon, User
} from "lucide-react";
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const [darkMode, setDarkMode] = useState(false);
  const [userEmail, setUserEmail] = useState<string | null>(null);

  // Kiểm tra theme từ localStorage và system preference
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    
    if (savedTheme === "dark" || (!savedTheme && prefersDark)) {
      setDarkMode(true);
      document.documentElement.classList.add("dark");
    }
  }, []);

  // Lấy thông tin user
  useEffect(() => {
    const getUser = async () => {
      const { data } = await supabase.auth.getUser();
      setUserEmail(data.user?.email || null);
    };
    getUser();
  }, []);

  const toggleDarkMode = () => {
    const newDarkMode = !darkMode;
    setDarkMode(newDarkMode);
    
    if (newDarkMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push("/login");
  };

  const menuItems = [
    { name: "Tổng quan", href: "/admin", icon: <LayoutDashboard size={20} /> },
    { name: "Lịch sử lượt sạc", href: "/admin/sessions", icon: <History size={20} /> },
    { name: "Khách hàng", href: "/admin/customers", icon: <Users size={20} /> },
    // { name: "Cài đặt", href: "/admin/settings", icon: <Settings size={20} /> },
  ];

  return (
    <div className="min-h-screen bg-background flex">
      {/* Sidebar - Sticky cho desktop */}
      <div className="sticky top-0 h-screen w-64 overflow-y-auto">
        <div className="h-full flex flex-col bg-card border-r border-border">
          {/* Logo */}
          <div className="p-6 border-b border-border">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-gradient-to-br from-primary to-accent rounded-lg text-white">
                <Zap size={22} />
              </div>
              <div>
                <div className="font-bold text-foreground text-lg">VISION ENERGY</div>
                <div className="text-xs text-muted-foreground">ADMIN SYSTEM</div>
              </div>
            </div>
          </div>

          {/* User Info */}
          <div className="p-4 border-b border-border">
            <div className="flex items-center gap-3 p-3 bg-muted rounded-lg">
              <div className="p-2 bg-primary/10 rounded-full">
                <User size={18} className="text-primary" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-foreground truncate">
                  {userEmail || "Administrator"}
                </p>
                <p className="text-xs text-muted-foreground">Admin</p>
              </div>
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
            {menuItems.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`
                    flex items-center gap-3 px-4 py-3 rounded-lg transition-all
                    ${isActive 
                      ? "bg-primary/10 text-primary font-medium border-l-4 border-primary" 
                      : "text-muted-foreground hover:bg-muted hover:text-foreground border-l-4 border-transparent"
                    }
                  `}
                >
                  <div className={isActive ? 'text-primary' : 'text-muted-foreground'}>
                    {item.icon}
                  </div>
                  <span className="text-sm">{item.name}</span>
                </Link>
              );
            })}
          </nav>

          {/* Bottom Actions */}
          <div className="p-4 border-t border-border space-y-3">
            {/* Dark Mode Toggle */}
            <button 
              onClick={toggleDarkMode}
              className="flex items-center justify-between w-full px-4 py-3 text-foreground hover:bg-muted rounded-lg transition-all text-sm"
            >
              <div className="flex items-center gap-3">
                {darkMode ? <Moon size={18} /> : <Sun size={18} />}
                <span>{darkMode ? "Dark Mode" : "Light Mode"}</span>
              </div>
              <div className={`w-12 h-6 flex items-center rounded-full p-1 transition-all ${darkMode ? 'bg-primary justify-end' : 'bg-gray-300 justify-start'}`}>
                <div className="w-4 h-4 bg-white rounded-full shadow-sm"></div>
              </div>
            </button>

            {/* Logout */}
            <button 
              onClick={handleLogout}
              className="flex items-center gap-3 px-4 py-3 w-full text-foreground hover:bg-red-500/10 hover:text-red-600 rounded-lg transition-all text-sm"
            >
              <LogOut size={18} />
              Đăng xuất
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-h-screen">
        {/* Top Bar - Sticky */}
        <header className="sticky top-0 z-20 bg-card/80 backdrop-blur-sm border-b border-border">
          <div className="px-6 py-4">
            <div className="flex items-center justify-between">
              {/* Left side - Page title */}
              <div className="text-sm text-muted-foreground">
                {menuItems.find(item => pathname === item.href)?.name || 'Dashboard'}
              </div>
              
              {/* Right side - Theme indicator */}
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <div className={`w-2 h-2 rounded-full ${darkMode ? 'bg-primary' : 'bg-accent'}`}></div>
                {darkMode ? 'Dark Mode' : 'Light Mode'}
              </div>
            </div>
          </div>
        </header>

        {/* Page Content - Scrollable area */}
        <main className="flex-1 overflow-y-auto p-6">
          {children}
        </main>
      </div>
    </div>
  );
}