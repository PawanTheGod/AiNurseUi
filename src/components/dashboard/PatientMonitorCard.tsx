import { Heart, Thermometer } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import type { Patient, PatientStatus } from "@/data/mockData";

interface PatientMonitorCardProps {
  patient: Patient;
  onClick?: () => void;
}

const statusConfig: Record<
  PatientStatus,
  { label: string; className: string; dotClass: string }
> = {
  normal: {
    label: "Normal",
    className: "bg-status-normal/10 text-status-normal border-status-normal/20",
    dotClass: "bg-status-normal",
  },
  warning: {
    label: "Warning",
    className: "bg-status-warning/10 text-status-warning border-status-warning/20",
    dotClass: "bg-status-warning",
  },
  critical: {
    label: "Critical",
    className: "bg-status-critical/10 text-status-critical border-status-critical/20",
    dotClass: "bg-status-critical animate-pulse-subtle",
  },
};

export function PatientMonitorCard({ patient, onClick }: PatientMonitorCardProps) {
  const status = statusConfig[patient.status];

  return (
    <Card
      className={cn(
        "card-hover cursor-pointer border transition-all duration-200",
        patient.status === "critical" && "border-status-critical/30 status-glow-critical"
      )}
      onClick={onClick}
    >
      <CardContent className="p-4">
        <div className="flex items-start justify-between mb-3">
          <div>
            <h4 className="font-semibold text-sm">{patient.name}</h4>
            <p className="text-xs text-muted-foreground">
              Room {patient.roomNumber}
            </p>
          </div>
          <Badge variant="outline" className={cn("text-xs", status.className)}>
            <span className={cn("mr-1.5 h-1.5 w-1.5 rounded-full", status.dotClass)} />
            {status.label}
          </Badge>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div className="flex items-center gap-2 rounded-lg bg-muted/50 p-2">
            <Heart className="h-4 w-4 text-status-critical" />
            <div>
              <p className="text-xs text-muted-foreground">Heart Rate</p>
              <p className="text-sm font-semibold">{patient.heartRate} BPM</p>
            </div>
          </div>
          <div className="flex items-center gap-2 rounded-lg bg-muted/50 p-2">
            <Thermometer className="h-4 w-4 text-status-warning" />
            <div>
              <p className="text-xs text-muted-foreground">Temp</p>
              <p className="text-sm font-semibold">{patient.temperature}°F</p>
            </div>
          </div>
        </div>

        <p className="mt-3 text-xs text-muted-foreground">
          Updated {patient.lastUpdated}
        </p>
      </CardContent>
    </Card>
  );
}
