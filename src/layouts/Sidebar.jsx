import React from 'react';
import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom';
import { LayoutDashboard, Users, Activity, Zap, Settings, LogOut, Menu, X, Layers } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { motion } from 'framer-motion';

const navItems = [
  { icon: LayoutDashboard, label: 'Dashboard', href: '/dashboard' },
  { icon: Users, label: 'Competitors', href: '/competitors' },
  { icon: Activity, label: 'Activity Feed', href: '/activity' },
  { icon: Zap, label: 'Insights', href: '/insights' },
  { icon: Settings, label: 'Settings', href: '/settings' },
];

export function Sidebar() {
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = () => {
    // Remove saved auth data if any
    localStorage.removeItem("authToken");
    localStorage.removeItem("user");

    // Redirect to Get Started page
    navigate("/");
  };

  return (
    <div className="hidden md:flex flex-col w-64 bg-card border-r border-border h-screen sticky top-0 z-40 shadow-sm">
      
      {/* Logo Section */}
      <div className="p-6 flex items-center gap-3 border-b border-border/40">
        <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-accent flex items-center justify-center text-white font-bold">
          CT
        </div>
        <span className="font-bold text-xl tracking-tight">CompetiTrack</span>
      </div>

      {/* Navigation Items */}
      <div className="flex-1 py-6 px-4 space-y-1">
        {navItems.map((item) => (
          <NavLink
            key={item.href}
            to={item.href}
            className={({ isActive }) =>
              cn(
                "flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group relative",
                isActive
                  ? "bg-primary/10 text-primary font-medium"
                  : "text-muted-foreground hover:bg-secondary/10 hover:text-secondary"
              )
            }
          >
            <item.icon className="w-5 h-5" />
            <span>{item.label}</span>

            {location.pathname === item.href && (
              <motion.div
                layoutId="sidebar-active"
                className="absolute left-0 w-1 h-8 bg-primary rounded-r-full"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              />
            )}
          </NavLink>
        ))}
      </div>

      {/* Bottom Actions */}
      <div className="p-4 border-t border-border/40">
        <div className="p-4 rounded-xl bg-gradient-to-br from-primary/5 to-accent/5 border border-primary/10 mb-4">
          <div className="flex items-center gap-2 mb-2">
            <Layers className="w-4 h-4 text-primary" />
            <span className="text-sm font-semibold">Pro Plan</span>
          </div>
          <p className="text-xs text-muted-foreground mb-3">
            You have 2 days left in your trial.
          </p>
          <Button size="sm" className="w-full text-xs bg-primary hover:bg-primary/90">
            Upgrade Now
          </Button>
        </div>

        {/* 👉 LOGOUT BUTTON WITH REDIRECT */}
        <Button 
          variant="ghost" 
          className="w-full justify-start gap-3 text-muted-foreground hover:text-destructive"
          onClick={handleLogout}
        >
          <LogOut className="w-5 h-5" />
          <span>Log Out</span>
        </Button>
      </div>
    </div>
  );
}

export function MobileSidebar() {
  const location = useLocation();

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="md:hidden">
          <Menu className="w-6 h-6" />
        </Button>
      </SheetTrigger>
      
      <SheetContent side="left" className="p-0 w-72">
        <div className="flex flex-col h-full bg-card">
          
          {/* Mobile Header */}
          <div className="p-6 flex items-center gap-3 border-b border-border">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-accent flex items-center justify-center text-white font-bold">
              CT
            </div>
            <span className="font-bold text-xl tracking-tight">CompetiTrack</span>
          </div>
          
          {/* Mobile Nav Items */}
          <div className="flex-1 py-6 px-4 space-y-2">
            {navItems.map((item) => (
              <NavLink
                key={item.href}
                to={item.href}
                className={({ isActive }) =>
                  cn(
                    "flex items-center gap-3 px-4 py-3 rounded-lg transition-colors",
                    isActive
                      ? "bg-primary/10 text-primary font-medium"
                      : "text-muted-foreground hover:bg-muted"
                  )
                }
              >
                <item.icon className="w-5 h-5" />
                <span>{item.label}</span>
              </NavLink>
            ))}
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
