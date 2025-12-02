import React from 'react';
import { Routes, Route, Navigate, BrowserRouter } from 'react-router-dom';
import { ThemeProvider } from '@/components/ui/theme-provider';
import { Toaster } from '@/components/ui/sonner';
import DashboardLayout from '@/layouts/DashboardLayout';
import LandingPage from '@/pages/LandingPage';
import Dashboard from '@/pages/Dashboard';
import Competitors from '@/pages/Competitors';
import ActivityFeed from '@/pages/ActivityFeed';
import Insights from '@/pages/Insights';
import Settings from '@/pages/Settings';
import CompetitorDetails from "@/pages/CompetitorDetails";


function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/competitors/:id" element={<CompetitorDetails />} />
          <Route path="/competitors/:id" element={<CompetitorDetails />} />
          
          <Route element={<DashboardLayout />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/competitors" element={<Competitors />} />
            <Route path="/activity" element={<ActivityFeed />} />
            <Route path="/insights" element={<Insights />} />
            <Route path="/settings" element={<Settings />} />
          </Route>
          
          {/* Fallback */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
        <Toaster />
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
