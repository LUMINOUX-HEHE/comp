import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Lightbulb, Target, ArrowRight } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription
} from "@/components/ui/dialog";

export default function Insights() {
  const [open, setOpen] = useState(false);
  const [selectedInsight, setSelectedInsight] = useState(null);

  const insightsList = [
    {
      title: "Trend Alert",
      desc: "SaaS consolidation is increasing in the Fintech sector.",
      score: 85,
      full:
        "Funding in early-stage fintech SaaS has slowed, while M&A activity has increased by 27% QoQ. Smaller tools are being acquired by platform players, reducing competitive room for independent SaaS products.",
      recommendation:
        "Position your product as an integration-friendly platform. Build partnerships with top fintech suite providers."
    },
    {
      title: "Competitor Weakness",
      desc: "TechFlow's support satisfaction score dropped by 12 points.",
      score: 92,
      full:
        "Customer interviews reveal delays in TechFlow's ticket resolution, causing dissatisfaction among SMB users. Their AI-assist feature is also underperforming.",
      recommendation:
        "Launch a targeted comparison ad focusing on your faster support response times and stronger reliability."
    },
    {
      title: "Market Gap",
      desc: "No major player is offering AI-driven churn prediction for SMBs.",
      score: 78,
      full:
        "Competitors focus heavily on enterprise AI services, leaving SMB tools underserved. Demand signals show growing interest in predictive churn scoring.",
      recommendation:
        "Accelerate your SMB churn-prediction module launch and target SaaS startups, EdTech, and BFSI sectors."
    },
  ];

  const handleViewAnalysis = (insight) => {
    setSelectedInsight(insight);
    setOpen(true);
  };

  return (
    <div className="space-y-8">
      {/* Top Section */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight flex items-center gap-2">
            <Sparkles className="w-6 h-6 text-yellow-500 fill-yellow-500" /> AI Insights
          </h2>
          <p className="text-muted-foreground mt-1">
            Automated strategic recommendations based on market data.
          </p>
        </div>
      </div>

      {/* Main Highlight Card */}
      <div className="grid gap-6 md:grid-cols-3">
        <Card className="col-span-3 bg-gradient-to-r from-primary/10 via-background to-background border-primary/20">
          <CardContent className="p-8 flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="space-y-2 max-w-2xl">
              <h3 className="text-2xl font-bold">Opportunity Detected: Enterprise Pricing Gap</h3>
              <p className="text-muted-foreground text-lg">
                Our analysis indicates a 15% churn in 'InnovateX' enterprise customers due to their
                recent price hike. Target this segment with a "Switch & Save" campaign.
              </p>
            </div>
            <Button size="lg" className="shrink-0 bg-primary text-white shadow-lg shadow-primary/25">
              Launch Campaign Wizard
            </Button>
          </CardContent>
        </Card>

        {/* Insight Cards */}
        {insightsList.map((insight, i) => (
          <motion.div key={i} whileHover={{ scale: 1.02 }} className="h-full">
            <Card className="h-full border-border/50 flex flex-col">
              <CardHeader>
                <div className="flex items-center justify-between mb-2">
                  <Lightbulb className="w-5 h-5 text-primary" />
                  <span className="text-xs font-mono text-muted-foreground">
                    CONFIDENCE: {insight.score}%
                  </span>
                </div>
                <CardTitle className="text-lg">{insight.title}</CardTitle>
              </CardHeader>

              <CardContent className="flex-1 flex flex-col gap-4">
                <p className="text-muted-foreground">{insight.desc}</p>

                <div className="mt-auto pt-4">
                  <Progress value={insight.score} className="h-1 mb-2" />

                  {/* View Analysis button */}
                  <Button
                    variant="ghost"
                    className="w-full justify-between text-xs p-0 h-auto hover:bg-transparent hover:text-primary"
                    onClick={() => handleViewAnalysis(insight)}
                  >
                    View Analysis <ArrowRight className="w-3 h-3" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Modal / Dialog */}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-xl">
          {selectedInsight && (
            <>
              <DialogHeader>
                <DialogTitle>{selectedInsight.title}</DialogTitle>
                <DialogDescription>
                  Confidence Score: {selectedInsight.score}%
                </DialogDescription>
              </DialogHeader>

              <div className="space-y-4 mt-4 text-sm">
                <div>
                  <h4 className="font-semibold mb-1">Detailed Insight</h4>
                  <p className="text-muted-foreground">{selectedInsight.full}</p>
                </div>

                <div>
                  <h4 className="font-semibold mb-1">Recommended Action</h4>
                  <p className="text-muted-foreground">{selectedInsight.recommendation}</p>
                </div>
              </div>

              <div className="mt-6 flex justify-end">
                <Button variant="outline" onClick={() => setOpen(false)}>
                  Close
                </Button>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
