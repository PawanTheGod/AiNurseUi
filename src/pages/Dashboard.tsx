import { Users, AlertTriangle, Activity, Cpu } from "lucide-react";
import { StatCard } from "@/components/dashboard/StatCard";
import { LiveMonitoringPanel } from "@/components/dashboard/LiveMonitoringPanel";
import { dashboardStats, alerts } from "@/data/mockData";

export default function Dashboard() {
  const criticalAlerts = alerts.filter(
    (a) => a.type === "critical" && !a.isResolved
  ).length;

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-muted-foreground">
          Welcome back, Dr. Smith. Here's your patient overview.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard
          title="Total Patients"
          value={dashboardStats.totalPatients}
          subtitle="Active in system"
          icon={Users}
          trend={{ value: 12, isPositive: true }}
        />
        <StatCard
          title="Critical Alerts"
          value={criticalAlerts}
          subtitle="Require immediate attention"
          icon={AlertTriangle}
          variant="critical"
        />
        <StatCard
          title="Active Cases"
          value={dashboardStats.activeCases}
          subtitle="Under monitoring"
          icon={Activity}
          trend={{ value: 5, isPositive: false }}
        />
        <StatCard
          title="AI System Status"
          value={dashboardStats.aiSystemStatus}
          subtitle={`${dashboardStats.systemHealth}% health`}
          icon={Cpu}
          variant="success"
        />
      </div>

      {/* Live Monitoring */}
      <LiveMonitoringPanel />
    </div>
  );
}
