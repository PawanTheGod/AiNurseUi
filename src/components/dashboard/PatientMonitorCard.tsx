import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import type { Patient, PatientStatus } from "@/data/mockData";

interface PatientMonitorCardProps {
  patient: Patient;
  onClick?: () => void;
}

const statusConfig: Record<
  PatientStatus,
  { label: string; className: string; bgClass: string }
> = {
  normal: {
    label: "Normal",
    className: "bg-status-normal",
    bgClass: "bg-status-normal/5",
  },
  warning: {
    label: "Alert",
    className: "bg-status-warning",
    bgClass: "bg-status-warning/5",
  },
  critical: {
    label: "Critical",
    className: "bg-status-critical animate-pulse-subtle",
    bgClass: "bg-status-critical/5",
  },
};

export function PatientMonitorCard({ patient, onClick }: PatientMonitorCardProps) {
  const status = statusConfig[patient.status];

  return (
    <button
      onClick={onClick}
      className={cn(
        "w-full text-left p-5 rounded-xl border elevation-sm card-hover transition-all duration-200",
        "bg-gradient-to-br from-card to-card/95",
        patient.status === "critical" && "pulse-glow"
      )}
    >
      <div className="flex items-center justify-between mb-4">
        <div>
          <h4 className="font-semibold text-base mb-0.5">{patient.name}</h4>
          <p className="text-sm text-muted-foreground">
            Room {patient.roomNumber}
          </p>
        </div>
        <Badge 
          variant="secondary" 
          className={cn(
            "text-xs font-normal px-3 py-1 rounded-full",
            status.bgClass,
            "border-0"
          )}
        >
          <span className={cn("status-indicator mr-1.5", status.className)} />
          {status.label}
        </Badge>
      </div>

      <div className="flex items-center gap-6 text-sm pt-3 border-t border-border/40">
        <div className="flex items-center gap-2">
          <div className="flex flex-col">
            <span className="text-xs text-muted-foreground">Heart Rate</span>
            <span className="font-semibold">{patient.heartRate} BPM</span>
          </div>
        </div>
        <div className="h-8 w-px bg-border/40" />
        <div className="flex items-center gap-2">
          <div className="flex flex-col">
            <span className="text-xs text-muted-foreground">Temperature</span>
            <span className="font-semibold">{patient.temperature}°F</span>
          </div>
        </div>
        <div className="text-xs text-muted-foreground ml-auto">
          {patient.lastUpdated}
        </div>
      </div>
    </button>
  );
}
