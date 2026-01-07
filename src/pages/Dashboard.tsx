import { Users, AlertTriangle, Activity, Cpu } from "lucide-react";
import { StatCard } from "@/components/dashboard/StatCard";
import { LiveMonitoringPanel } from "@/components/dashboard/LiveMonitoringPanel";
import { dashboardStats, alerts } from "@/data/mockData";

export default function Dashboard() {
  const criticalAlerts = alerts.filter(
    (a) => a.type === "critical" && !a.isResolved
  ).length;

  return (
    <div className="space-y-10 animate-fade-in">
      {/* Header */}
      <div className="space-y-1">
        <h1 className="text-3xl font-semibold tracking-tight">Dashboard</h1>
        <p className="text-muted-foreground">
          Welcome back, Dr. Smith
        </p>
      </div>

      {/* Core Metrics - Only 3 cards */}
      <div className="grid gap-6 md:grid-cols-3">
        <StatCard
          title="Total Patients"
          value={dashboardStats.totalPatients}
          icon={Users}
        />
        <StatCard
          title="Critical Alerts"
          value={criticalAlerts}
          icon={AlertTriangle}
          variant="critical"
        />
        <StatCard
          title="AI System Status"
          value={dashboardStats.aiSystemStatus}
          icon={Cpu}
          variant="success"
        />
      </div>

      {/* Live Monitoring */}
      <LiveMonitoringPanel />
    </div>
  );
}
