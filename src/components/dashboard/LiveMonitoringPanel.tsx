import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PatientMonitorCard } from "./PatientMonitorCard";
import { patients } from "@/data/mockData";
import { useNavigate } from "react-router-dom";

export function LiveMonitoringPanel() {
  const navigate = useNavigate();
  
  // Sort patients: critical first, then warning, then normal
  const sortedPatients = [...patients].sort((a, b) => {
    const priority = { critical: 0, warning: 1, normal: 2 };
    return priority[a.status] - priority[b.status];
  });

  return (
    <Card className="elevation-md">
      <CardHeader className="pb-6 border-b border-border/40">
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-xl font-semibold">Live Patient Monitoring</CardTitle>
            <p className="text-sm text-muted-foreground mt-1">
              Real-time vitals tracking
            </p>
          </div>
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <span className="flex h-2 w-2 rounded-full bg-primary animate-pulse" />
            <span>Live</span>
          </div>
        </div>
      </CardHeader>
      <CardContent className="pt-6 space-y-3">
        {sortedPatients.map((patient) => (
          <PatientMonitorCard
            key={patient.id}
            patient={patient}
            onClick={() => navigate(`/patients/${patient.id}`)}
          />
        ))}
      </CardContent>
    </Card>
  );
}
