import { useState } from "react";
import { AlertTriangle, CheckCircle, Clock, Bell } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { alerts, Alert } from "@/data/mockData";
import { cn } from "@/lib/utils";

const alertConfig = {
  critical: {
    icon: AlertTriangle,
    label: "Critical",
    className: "border-status-critical/30 bg-status-critical/5",
    badgeClass: "bg-status-critical text-status-critical-foreground",
    iconClass: "text-status-critical",
  },
  moderate: {
    icon: Bell,
    label: "Moderate",
    className: "border-status-warning/30 bg-status-warning/5",
    badgeClass: "bg-status-warning text-status-warning-foreground",
    iconClass: "text-status-warning",
  },
  normal: {
    icon: CheckCircle,
    label: "Normal",
    className: "border-status-normal/30 bg-status-normal/5",
    badgeClass: "bg-status-normal text-status-normal-foreground",
    iconClass: "text-status-normal",
  },
};

function AlertCard({
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
    <Card
      className={cn(
        "transition-all duration-200 card-hover",
        config.className,
        alert.type === "critical" && !alert.isResolved && "status-glow-critical"
      )}
    >
      <CardContent className="p-4">
        <div className="flex items-start gap-4">
          <div
            className={cn(
              "flex h-10 w-10 shrink-0 items-center justify-center rounded-lg",
              alert.type === "critical" && "bg-status-critical/20",
              alert.type === "moderate" && "bg-status-warning/20",
              alert.type === "normal" && "bg-status-normal/20"
            )}
          >
            <Icon className={cn("h-5 w-5", config.iconClass)} />
          </div>

          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1">
              <Badge className={cn("text-xs", config.badgeClass)}>
                {config.label}
              </Badge>
              {alert.isAcknowledged && !alert.isResolved && (
                <Badge variant="outline" className="text-xs">
                  Acknowledged
                </Badge>
              )}
              {alert.isResolved && (
                <Badge variant="outline" className="text-xs bg-muted">
                  Resolved
                </Badge>
              )}
            </div>

            <h4 className="font-semibold text-sm mb-1">{alert.patientName}</h4>
            <p className="text-sm text-muted-foreground mb-2">{alert.reason}</p>

            <div className="flex items-center gap-4 text-xs text-muted-foreground">
              <span className="flex items-center gap-1">
                <Clock className="h-3 w-3" />
                {alert.timestamp}
              </span>
            </div>
          </div>

          {!alert.isResolved && (
            <div className="flex flex-col gap-2">
              {!alert.isAcknowledged && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => onAcknowledge(alert.id)}
                >
                  Acknowledge
                </Button>
              )}
              <Button
                variant="default"
                size="sm"
                onClick={() => onResolve(alert.id)}
              >
                Resolve
              </Button>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
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
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">AI Alert Center</h1>
          <p className="text-muted-foreground">
            AI-prioritized patient alerts requiring attention
          </p>
        </div>
        <Badge variant="outline" className="text-sm">
          {unresolvedCount} unresolved
        </Badge>
      </div>

      {/* Critical Alerts */}
      {criticalAlerts.length > 0 && (
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <AlertTriangle className="h-5 w-5 text-status-critical" />
            <h2 className="text-lg font-semibold">
              Critical ({criticalAlerts.length})
            </h2>
          </div>
          <div className="space-y-3">
            {criticalAlerts.map((alert) => (
              <AlertCard
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
          <div className="flex items-center gap-2">
            <Bell className="h-5 w-5 text-status-warning" />
            <h2 className="text-lg font-semibold">
              Moderate ({moderateAlerts.length})
            </h2>
          </div>
          <div className="space-y-3">
            {moderateAlerts.map((alert) => (
              <AlertCard
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
          <div className="flex items-center gap-2">
            <CheckCircle className="h-5 w-5 text-status-normal" />
            <h2 className="text-lg font-semibold">
              Normal ({normalAlerts.length})
            </h2>
          </div>
          <div className="space-y-3">
            {normalAlerts.map((alert) => (
              <AlertCard
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
