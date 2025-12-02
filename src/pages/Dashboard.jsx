import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { DollarSign, TrendingUp, Users, Activity, ArrowRight } from 'lucide-react';
import { StatsCard } from '@/components/dashboard/StatsCard';
import { RevenueChart, MarketShareChart, ActivityBarChart } from '@/components/dashboard/OverviewCharts';
import { Button } from '@/components/ui/button';
import { api } from '@/lib/api';
import { formatCurrency, formatNumber } from '@/lib/utils';
import { Skeleton } from '@/components/ui/skeleton';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';

export default function Dashboard() {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      const data = await api.get('/dashboard/stats');
      setStats(data);
      setLoading(false);
    };
    loadData();
  }, []);

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  if (loading) {
    return <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {[1, 2, 3, 4].map(i => <Skeleton key={i} className="h-32 rounded-xl" />)}
    </div>
  }

  return (
    <motion.div 
      variants={container}
      initial="hidden"
      animate="show"
      className="space-y-8"
    >
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">Dashboard Overview</h2>
        <div className="flex items-center gap-2">
           
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <motion.div variants={item}>
          <StatsCard 
            title="Total Revenue" 
            value={formatCurrency(stats?.revenue || 0)} 
            trend="up" 
            trendValue={`${stats?.revenueGrowth}%`}
            icon={DollarSign}
          />
        </motion.div>
        <motion.div variants={item}>
          <StatsCard 
            title="Market Share" 
            value={`${stats?.marketShare}%`} 
            trend="up" 
            trendValue={`${stats?.marketShareGrowth}%`}
            icon={TrendingUp}
          />
        </motion.div>
        <motion.div variants={item}>
          <StatsCard 
            title="Competitor Events" 
            value={stats?.competitorActivity} 
            trend="down" 
            trendValue={`${stats?.competitorActivityGrowth}%`}
            icon={Activity}
          />
        </motion.div>
        <motion.div variants={item}>
          <StatsCard 
            title="Sentiment Score" 
            value={stats?.customerSentiment} 
            trend="neutral" 
            trendValue="0%"
            icon={Users}
          />
        </motion.div>
      </div>

      {/* Charts Row */}
      <motion.div variants={item} className="grid gap-4 md:grid-cols-4 lg:grid-cols-4">
        <RevenueChart />
        <MarketShareChart />
      </motion.div>

      {/* Bottom Row */}
      <div className="grid gap-4 md:grid-cols-7">
        <motion.div variants={item} className="col-span-4 rounded-xl border border-border/50 bg-card text-card-foreground shadow-sm">
          <div className="p-6 flex flex-row items-center justify-between">
            <div>
                <h3 className="text-lg font-semibold">Recent Competitor Moves</h3>
                <p className="text-sm text-muted-foreground">High impact events from the last 7 days</p>
            </div>
            <Button variant="ghost" size="sm" className="gap-1">View All <ArrowRight className="w-4 h-4" /></Button>
          </div>
          <div className="p-0">
             <Table>
                <TableHeader>
                    <TableRow className="border-border/50 hover:bg-transparent">
                        <TableHead>Company</TableHead>
                        <TableHead>Event Type</TableHead>
                        <TableHead>Impact</TableHead>
                        <TableHead className="text-right">Date</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {[
                        { c: "TechFlow", t: "Pricing Change", i: "High", d: "2h ago" },
                        { c: "InnovateX", t: "New Feature", i: "Medium", d: "5h ago" },
                        { c: "DataCore", t: "Marketing Push", i: "Low", d: "1d ago" },
                        { c: "CloudNine", t: "Executive Hire", i: "Medium", d: "2d ago" },
                    ].map((row, i) => (
                        <TableRow key={i} className="border-border/50">
                            <TableCell className="font-medium">{row.c}</TableCell>
                            <TableCell>{row.t}</TableCell>
                            <TableCell>
                                <Badge variant="outline" className={
                                    row.i === "High" ? "border-destructive/50 text-destructive bg-destructive/10" : 
                                    row.i === "Medium" ? "border-yellow-500/50 text-yellow-500 bg-yellow-500/10" :
                                    "border-blue-500/50 text-blue-500 bg-blue-500/10"
                                }>
                                    {row.i}
                                </Badge>
                            </TableCell>
                            <TableCell className="text-right text-muted-foreground">{row.d}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
             </Table>
          </div>
        </motion.div>

        <motion.div variants={item} className="col-span-3 rounded-xl border border-border/50 bg-card text-card-foreground shadow-sm p-6">
            <h3 className="text-lg font-semibold mb-4">Activity by Category</h3>
            <ActivityBarChart />
        </motion.div>
      </div>
    </motion.div>
  );
}
