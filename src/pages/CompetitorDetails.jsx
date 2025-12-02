// src/pages/CompetitorDetails.jsx
import React from "react";
import { Link, useParams } from "react-router-dom";
import { ArrowLeft, ExternalLink } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";

// demo data – you can extend this
const competitors = {
  "techflow-inc": {
    id: "techflow-inc",
    name: "TechFlow Inc",
    website: "https://techflow.com",
    tags: ["SaaS", "North America"],
    stats: {
      totalChanges: 45,
      launches: 8,
      priceChanges: 12,
      featureUpdates: 25,
    },
    activity: [
      {
        date: "2025-06-15",
        title: "New product: TechFlow Enterprise",
        description:
          "Comprehensive enterprise solution launched with dedicated support and custom integrations.",
        tags: ["Product", "Launch"],
      },
      {
        date: "2025-06-14",
        title: "Price update on TechFlow Pro",
        description:
          "Monthly subscription increased from $49 to $59. Added priority support feature.",
        tags: ["Pricing", "Feature"],
      },
      {
        date: "2025-06-10",
        title: "API access added to Starter plan",
        description:
          "Starter plan now includes basic API access with 1000 requests/month limit.",
        tags: ["Feature"],
      },
      {
        date: "2025-06-05",
        title: "Dashboard redesign",
        description:
          "Major UI/UX overhaul with new analytics dashboard and improved navigation.",
        tags: ["Feature", "UI"],
      },
      {
        date: "2025-05-28",
        title: "Mobile app beta release",
        description:
          "iOS and Android apps now available in beta for Pro and Enterprise customers.",
        tags: ["Product", "Mobile"],
      },
    ],
    snapshots: {
      previousDate: "2025-05-01",
      currentDate: "2025-06-15",
      previousPlans: [
        { name: "TechFlow Pro", price: "$49/mo" },
        { name: "TechFlow Starter", price: "$19/mo" },
      ],
      currentPlans: [
        { name: "TechFlow Pro", price: "$59/mo", badge: "Changed" },
        { name: "TechFlow Starter", price: "$19/mo" },
        { name: "TechFlow Enterprise", price: "$199/mo", badge: "New" },
      ],
    },
    portfolio: [
      {
        name: "TechFlow Pro",
        category: "Premium",
        status: "Existing",
        lastChange: "2 days ago",
        notes: "Price increased by 15%",
      },
      {
        name: "TechFlow Starter",
        category: "Basic",
        status: "Existing",
        lastChange: "1 week ago",
        notes: "New features added",
      },
      {
        name: "TechFlow Enterprise",
        category: "Enterprise",
        status: "New",
        lastChange: "Today",
        notes: "Just launched",
      },
    ],
  },
};

export default function CompetitorDetails() {
  const { id } = useParams();
  const competitor = competitors[id] || competitors["techflow-inc"]; // fallback

  return (
    <div className="px-6 py-6 lg:px-10 max-w-7xl mx-auto space-y-6">
      {/* Breadcrumb + Back */}
      <div className="flex items-center justify-between gap-4">
        <div className="text-sm text-muted-foreground">
          <span className="text-muted-foreground/70">Dashboard</span>
          <span className="mx-1">/</span>
          <Link to="/competitors" className="text-muted-foreground hover:underline">
            Competitors
          </Link>
          <span className="mx-1">/</span>
          <span className="text-foreground font-medium">{competitor.name}</span>
        </div>

        <Link
          to="/competitors"
          className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to list
        </Link>
      </div>

      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div className="space-y-2">
          <h1 className="text-2xl md:text-3xl font-semibold tracking-tight">
            {competitor.name}
          </h1>
          <a
            href={competitor.website}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1 text-sm text-primary hover:underline"
          >
            {competitor.website.replace("https://", "")}
            <ExternalLink className="w-3 h-3" />
          </a>
          <div className="flex flex-wrap gap-2 mt-2">
            {competitor.tags.map((tag) => (
              <Badge key={tag} variant="outline" className="text-xs">
                {tag}
              </Badge>
            ))}
          </div>
        </div>

        <div className="flex items-center gap-3">
          <span className="text-xs text-muted-foreground">Email alerts</span>
          <button className="relative inline-flex h-6 w-11 items-center rounded-full bg-primary/60">
            <span className="inline-block h-5 w-5 translate-x-5 rounded-full bg-background shadow transition-transform" />
          </button>
          <button className="px-4 py-2 rounded-lg bg-primary text-xs font-medium hover:bg-primary/90">
            Scan Now
          </button>
        </div>
      </div>

      {/* Top stats */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Total Changes (90d)</CardDescription>
            <CardTitle className="text-2xl">
              {competitor.stats.totalChanges}
            </CardTitle>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Product Launches</CardDescription>
            <CardTitle className="text-2xl">
              {competitor.stats.launches}
            </CardTitle>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Price Changes</CardDescription>
            <CardTitle className="text-2xl">
              {competitor.stats.priceChanges}
            </CardTitle>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Feature Updates</CardDescription>
            <CardTitle className="text-2xl">
              {competitor.stats.featureUpdates}
            </CardTitle>
          </CardHeader>
        </Card>
      </div>

      {/* Main 2-column section */}
      <div className="grid gap-6 lg:grid-cols-[minmax(0,2fr)_minmax(0,1.2fr)]">
        {/* Activity Timeline */}
        <Card className="h-full">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Activity Timeline</CardTitle>
                <CardDescription>
                  Recent product, pricing, and feature changes.
                </CardDescription>
              </div>
              <div className="flex gap-2 text-xs">
                <Badge variant="default">All</Badge>
                <Badge variant="outline">Product</Badge>
                <Badge variant="outline">Pricing</Badge>
                <Badge variant="outline">Feature</Badge>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            {competitor.activity.map((item, idx) => (
              <div key={idx} className="relative pl-6">
                {/* timeline dot & line */}
                <span className="absolute left-0 top-2 h-3 w-3 rounded-full bg-primary" />
                {idx !== competitor.activity.length - 1 && (
                  <span className="absolute left-1.5 top-5 h-full w-px bg-primary/40" />
                )}

                <div className="flex justify-between gap-4">
                  <div>
                    <p className="font-medium text-sm">{item.title}</p>
                    <p className="text-xs text-muted-foreground mt-1">
                      {item.description}
                    </p>
                    <div className="flex flex-wrap gap-2 mt-2">
                      {item.tags.map((t) => (
                        <Badge key={t} variant="outline" className="text-[10px]">
                          {t}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  <span className="text-xs text-muted-foreground whitespace-nowrap">
                    {item.date}
                  </span>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Snapshot Comparison */}
        <Card>
          <CardHeader>
            <CardTitle>Snapshot Comparison</CardTitle>
            <CardDescription>
              Compare product changes over time.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-3 text-xs">
              <div>
                <p className="text-muted-foreground mb-1">Old Snapshot</p>
                <div className="px-3 py-2 rounded-md bg-muted/40 border border-border">
                  {competitor.snapshots.previousDate}
                </div>
              </div>
              <div>
                <p className="text-muted-foreground mb-1">New Snapshot</p>
                <div className="px-3 py-2 rounded-md bg-muted/40 border border-border">
                  {competitor.snapshots.currentDate}
                </div>
              </div>
            </div>

            <div className="space-y-3">
              <p className="text-xs font-medium text-muted-foreground">
                Previous ({competitor.snapshots.previousDate})
              </p>
              <div className="space-y-2">
                {competitor.snapshots.previousPlans.map((plan) => (
                  <div
                    key={plan.name}
                    className="flex items-center justify-between px-3 py-2 rounded-md bg-muted/30 text-xs"
                  >
                    <span>{plan.name}</span>
                    <span className="text-muted-foreground">{plan.price}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-3">
              <p className="text-xs font-medium text-muted-foreground">
                Current ({competitor.snapshots.currentDate})
              </p>
              <div className="space-y-2">
                {competitor.snapshots.currentPlans.map((plan) => (
                  <div
                    key={plan.name}
                    className="flex items-center justify-between px-3 py-2 rounded-md bg-muted/30 text-xs"
                  >
                    <div className="flex items-center gap-2">
                      <span>{plan.name}</span>
                      {plan.badge && (
                        <Badge
                          variant={
                            plan.badge === "Changed" ? "outline" : "default"
                          }
                          className="text-[10px]"
                        >
                          {plan.badge}
                        </Badge>
                      )}
                    </div>
                    <span className="text-muted-foreground">{plan.price}</span>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Product Portfolio table */}
      <Card>
        <CardHeader>
          <CardTitle>Product Portfolio</CardTitle>
          <CardDescription>
            Overview of products, status, and recent changes.
          </CardDescription>
        </CardHeader>
        <CardContent className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="text-xs text-muted-foreground border-b border-border/60">
              <tr className="text-left">
                <th className="py-2 pr-4 font-medium">Product</th>
                <th className="py-2 pr-4 font-medium">Category</th>
                <th className="py-2 pr-4 font-medium">Status</th>
                <th className="py-2 pr-4 font-medium">Last Change</th>
                <th className="py-2 pr-4 font-medium">Notes</th>
              </tr>
            </thead>
            <tbody>
              {competitor.portfolio.map((item) => (
                <tr key={item.name} className="border-b border-border/30">
                  <td className="py-3 pr-4">{item.name}</td>
                  <td className="py-3 pr-4 text-muted-foreground">
                    {item.category}
                  </td>
                  <td className="py-3 pr-4">
                    <Badge
                      variant={
                        item.status === "New" ? "default" : "outline"
                      }
                      className="text-[10px]"
                    >
                      {item.status}
                    </Badge>
                  </td>
                  <td className="py-3 pr-4 text-muted-foreground">
                    {item.lastChange}
                  </td>
                  <td className="py-3 pr-4 text-muted-foreground">
                    {item.notes}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </CardContent>
      </Card>
    </div>
  );
}
