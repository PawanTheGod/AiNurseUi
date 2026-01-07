import { Activity } from "lucide-react";
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
    <Card className="col-span-full">
      <CardHeader className="pb-4">
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10">
            <Activity className="h-4 w-4 text-primary" />
          </div>
          <div>
            <CardTitle className="text-lg">Live Monitoring</CardTitle>
            <p className="text-xs text-muted-foreground">
              Real-time patient vitals
            </p>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {sortedPatients.map((patient) => (
            <PatientMonitorCard
              key={patient.id}
              patient={patient}
              onClick={() => navigate(`/patients/${patient.id}`)}
            />
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
