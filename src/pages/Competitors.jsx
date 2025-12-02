// src/pages/Competitors.jsx
import React from "react";
import { Link } from "react-router-dom";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardDescription,
} from "@/components/ui/card";

// Updated competitor dataset matching your UI
const competitors = [
  {
    id: "techflow-inc",
    name: "TechFlow",
    domain: "global-tech.com",
    marketShare: "15%",
    revenue: "$8.5M",
    growth: "+5.2%",
    threat: "High Threat",
  },
  {
    id: "innovatex",
    name: "InnovateX",
    domain: "global-tech.com",
    marketShare: "12%",
    revenue: "$6.2M",
    growth: "-1.5%",
    threat: "Medium Threat",
  },
  {
    id: "softsystems",
    name: "SoftSystems",
    domain: "global-tech.com",
    marketShare: "8%",
    revenue: "$4.1M",
    growth: "+2.1%",
    threat: "Low Threat",
  },
  {
    id: "datacore",
    name: "DataCore",
    domain: "global-tech.com",
    marketShare: "22%",
    revenue: "$15.2M",
    growth: "+8.9%",
    threat: "High Threat",
  },
  {
    id: "cloudnine",
    name: "CloudNine",
    domain: "global-tech.com",
    marketShare: "5%",
    revenue: "$2.8M",
    growth: "+12%",
    threat: "Medium Threat",
  },
];

export default function Competitors() {
  return (
    <div className="px-6 py-6 lg:px-10 max-w-7xl mx-auto">
      <h1 className="text-2xl md:text-3xl font-semibold mb-2">Competitors</h1>
      <p className="text-sm text-muted-foreground mb-6">
        Manage and track your competitive landscape.
      </p>

      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {competitors.map((c) => (
          <Card key={c.id} className="flex flex-col justify-between">
            <CardHeader>
              <CardTitle className="flex items-center justify-between text-base">
                <span>{c.name}</span>
              </CardTitle>
              <CardDescription>@ {c.domain}</CardDescription>
            </CardHeader>

            <CardContent className="space-y-3">
              {/* Market Share */}
              <div className="flex items-center justify-between text-xs text-muted-foreground">
                <span>Market Share</span>
                <span className="text-foreground font-medium">
                  {c.marketShare}
                </span>
              </div>

              {/* Estimated Revenue */}
              <div className="flex items-center justify-between text-xs text-muted-foreground">
                <span>Est. Revenue</span>
                <span className="text-foreground font-medium">{c.revenue}</span>
              </div>

              {/* bottom row */}
              <div className="mt-4 flex items-center justify-between text-xs">
                {/* Threat tag */}
                <span
                  className={`px-2 py-1 rounded-full border text-[10px] ${
                    c.threat === "High Threat"
                      ? "border-destructive/40 text-destructive"
                      : c.threat === "Medium Threat"
                      ? "border-yellow-600/40 text-yellow-600"
                      : "border-blue-600/40 text-blue-600"
                  }`}
                >
                  {c.threat}
                </span>

                {/* FULL REPORT → LINK */}
                <Link
                  to={`/competitors/${c.id}`}
                  className="text-primary font-medium hover:underline"
                >
                  Full Report →
                </Link>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
