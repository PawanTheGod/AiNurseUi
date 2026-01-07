import { useState } from "react";
import { AlertTriangle, Bell, CheckCircle, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { alerts, Alert } from "@/data/mockData";
import { cn } from "@/lib/utils";

const alertConfig = {
  critical: {
    icon: AlertTriangle,
    label: "Critical",
    badgeClass: "bg-status-critical",
    bgClass: "bg-status-critical/5",
  },
  moderate: {
    icon: Bell,
    label: "Moderate",
    badgeClass: "bg-status-warning",
    bgClass: "bg-status-warning/5",
  },
  normal: {
    icon: CheckCircle,
    label: "Normal",
    badgeClass: "bg-status-normal",
    bgClass: "bg-status-normal/5",
  },
};

function AlertItem({
  alert,
  onAcknowledge,
  onResolve,
}: {
  alert: Alert;
  onAcknowledge: (id: string) => void;
  onResolve: (id: string) => void;
}) {
  const config = alertConfig[alert.type];
  const Icon = config.icon;

  return (
    <div 
      className={cn(
        "flex items-start gap-4 p-5 rounded-xl border elevation-sm transition-all duration-200",
        "bg-gradient-to-br from-card to-card/95",
        alert.type === "critical" && !alert.isResolved && "pulse-glow"
      )}
    >
      {/* Icon */}
      <div className={cn(
        "h-10 w-10 rounded-lg flex items-center justify-center shrink-0",
        config.bgClass
      )}>
        <Icon className={cn("h-5 w-5", `text-${alert.type === 'critical' ? 'status-critical' : alert.type === 'moderate' ? 'status-warning' : 'status-normal'}`)} />
      </div>

      {/* Content */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-3 mb-2">
          <Badge 
            variant="secondary" 
            className={cn(
              "text-xs font-normal px-3 py-1 rounded-full border-0",
              config.bgClass
            )}
          >
            <span className={cn("status-indicator mr-1.5", config.badgeClass)} />
            {config.label}
          </Badge>
          {alert.isAcknowledged && !alert.isResolved && (
            <Badge variant="outline" className="text-xs px-2 py-0.5">
              Acknowledged
            </Badge>
          )}
          {alert.isResolved && (
            <Badge variant="outline" className="text-xs bg-muted px-2 py-0.5">
              Resolved
            </Badge>
          )}
        </div>

        <h4 className="font-semibold mb-1">{alert.patientName}</h4>
        <p className="text-sm text-muted-foreground mb-3">{alert.reason}</p>

        <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
          <Clock className="h-3 w-3" />
          {alert.timestamp}
        </div>
      </div>

      {/* Actions */}
      {!alert.isResolved && (
        <div className="flex gap-2 shrink-0">
          {!alert.isAcknowledged && (
            <Button
              variant="outline"
              size="sm"
              onClick={() => onAcknowledge(alert.id)}
              className="h-9"
            >
              Acknowledge
            </Button>
          )}
          <Button
            variant="default"
            size="sm"
            onClick={() => onResolve(alert.id)}
            className="h-9"
          >
            Resolve
          </Button>
        </div>
      )}
    </div>
  );
}

export default function Alerts() {
  const [alertList, setAlertList] = useState(alerts);

  const handleAcknowledge = (id: string) => {
    setAlertList((prev) =>
      prev.map((alert) =>
        alert.id === id ? { ...alert, isAcknowledged: true } : alert
      )
    );
  };

  const handleResolve = (id: string) => {
    setAlertList((prev) =>
      prev.map((alert) =>
        alert.id === id
          ? { ...alert, isAcknowledged: true, isResolved: true }
          : alert
      )
    );
  };

  const criticalAlerts = alertList.filter((a) => a.type === "critical");
  const moderateAlerts = alertList.filter((a) => a.type === "moderate");
  const normalAlerts = alertList.filter((a) => a.type === "normal");

  const unresolvedCount = alertList.filter((a) => !a.isResolved).length;

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <h1 className="text-3xl font-semibold tracking-tight">AI Alert Center</h1>
          <p className="text-muted-foreground">
            AI-prioritized patient alerts requiring attention
          </p>
        </div>
        <Badge 
          variant="outline" 
          className={cn(
            "text-sm px-4 py-2",
            unresolvedCount > 0 && "bg-status-critical/10 border-status-critical/20"
          )}
        >
          {unresolvedCount} unresolved
        </Badge>
      </div>

      {/* Critical Alerts */}
      {criticalAlerts.length > 0 && (
        <div className="space-y-4">
          <div className="flex items-center gap-3 pb-2 border-b border-status-critical/20">
            <div className="h-8 w-1 rounded-full bg-status-critical" />
            <h2 className="text-lg font-semibold">
              Critical ({criticalAlerts.length})
            </h2>
          </div>
          <div className="space-y-3">
            {criticalAlerts.map((alert) => (
              <AlertItem
                key={alert.id}
                alert={alert}
                onAcknowledge={handleAcknowledge}
                onResolve={handleResolve}
              />
            ))}
          </div>
        </div>
      )}

      {/* Moderate Alerts */}
      {moderateAlerts.length > 0 && (
        <div className="space-y-4">
          <div className="flex items-center gap-3 pb-2 border-b border-status-warning/20">
            <div className="h-8 w-1 rounded-full bg-status-warning" />
            <h2 className="text-lg font-semibold">
              Moderate ({moderateAlerts.length})
            </h2>
          </div>
          <div className="space-y-3">
            {moderateAlerts.map((alert) => (
              <AlertItem
                key={alert.id}
                alert={alert}
                onAcknowledge={handleAcknowledge}
                onResolve={handleResolve}
              />
            ))}
          </div>
        </div>
      )}

      {/* Normal Alerts */}
      {normalAlerts.length > 0 && (
        <div className="space-y-4">
          <div className="flex items-center gap-3 pb-2 border-b border-status-normal/20">
            <div className="h-8 w-1 rounded-full bg-status-normal" />
            <h2 className="text-lg font-semibold">
              Normal ({normalAlerts.length})
            </h2>
          </div>
          <div className="space-y-3">
            {normalAlerts.map((alert) => (
              <AlertItem
                key={alert.id}
                alert={alert}
                onAcknowledge={handleAcknowledge}
                onResolve={handleResolve}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
