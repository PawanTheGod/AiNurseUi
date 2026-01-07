import { useState } from "react";
import { Search, Filter, Eye, Heart, Thermometer, Droplets } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { patients, Patient, PatientStatus, vitalsHistory } from "@/data/mockData";
import { cn } from "@/lib/utils";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Area,
  AreaChart,
} from "recharts";

const statusConfig: Record<
  PatientStatus,
  { label: string; className: string }
> = {
  normal: {
    label: "Normal",
    className: "bg-status-normal/10 text-status-normal border-status-normal/20",
  },
  warning: {
    label: "Warning",
    className: "bg-status-warning/10 text-status-warning border-status-warning/20",
  },
  critical: {
    label: "Critical",
    className: "bg-status-critical/10 text-status-critical border-status-critical/20",
  },
};

export default function Patients() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedPatient, setSelectedPatient] = useState<Patient | null>(null);

  const filteredPatients = patients.filter(
    (patient) =>
      patient.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      patient.id.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Patients</h1>
        <p className="text-muted-foreground">
          Manage and monitor all registered patients
        </p>
      </div>

      {/* Search and Filters */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="relative max-w-sm">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search patients..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
        <Button variant="outline" size="sm">
          <Filter className="mr-2 h-4 w-4" />
          Filters
        </Button>
      </div>

      {/* Patients Table */}
      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Patient</TableHead>
                <TableHead>Room</TableHead>
                <TableHead>Vitals</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Last Updated</TableHead>
                <TableHead className="text-right">Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredPatients.map((patient) => (
                <TableRow
                  key={patient.id}
                  className={cn(
                    "transition-colors",
                    patient.status === "critical" && "bg-status-critical/5"
                  )}
                >
                  <TableCell>
                    <div>
                      <p className="font-medium">{patient.name}</p>
                      <p className="text-xs text-muted-foreground">
                        {patient.id} • {patient.age}y • {patient.gender}
                      </p>
                    </div>
                  </TableCell>
                  <TableCell className="font-medium">
                    {patient.roomNumber}
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-3 text-sm">
                      <span className="flex items-center gap-1">
                        <Heart className="h-3 w-3 text-status-critical" />
                        {patient.heartRate}
                      </span>
                      <span className="flex items-center gap-1">
                        <Thermometer className="h-3 w-3 text-status-warning" />
                        {patient.temperature}°
                      </span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant="outline"
                      className={cn("text-xs", statusConfig[patient.status].className)}
                    >
                      {statusConfig[patient.status].label}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-muted-foreground">
                    {patient.lastUpdated}
                  </TableCell>
                  <TableCell className="text-right">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setSelectedPatient(patient)}
                    >
                      <Eye className="mr-2 h-4 w-4" />
                      View
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Patient Detail Modal */}
      <Dialog open={!!selectedPatient} onOpenChange={() => setSelectedPatient(null)}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          {selectedPatient && (
            <>
              <DialogHeader>
                <DialogTitle className="flex items-center gap-3">
                  {selectedPatient.name}
                  <Badge
                    variant="outline"
                    className={cn(
                      "text-xs",
                      statusConfig[selectedPatient.status].className
                    )}
                  >
                    {statusConfig[selectedPatient.status].label}
                  </Badge>
                </DialogTitle>
              </DialogHeader>

              <div className="space-y-6">
                {/* Patient Info */}
                <div className="grid grid-cols-2 gap-4 text-sm md:grid-cols-4">
                  <div>
                    <p className="text-muted-foreground">Patient ID</p>
                    <p className="font-medium">{selectedPatient.id}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Age / Gender</p>
                    <p className="font-medium">
                      {selectedPatient.age}y / {selectedPatient.gender}
                    </p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Room</p>
                    <p className="font-medium">{selectedPatient.roomNumber}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Condition</p>
                    <p className="font-medium">{selectedPatient.condition}</p>
                  </div>
                </div>

                {/* Current Vitals */}
                <div className="grid gap-4 sm:grid-cols-4">
                  <Card>
                    <CardContent className="p-4 text-center">
                      <Heart className="mx-auto h-6 w-6 text-status-critical mb-2" />
                      <p className="text-2xl font-bold">{selectedPatient.heartRate}</p>
                      <p className="text-xs text-muted-foreground">BPM</p>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="p-4 text-center">
                      <Thermometer className="mx-auto h-6 w-6 text-status-warning mb-2" />
                      <p className="text-2xl font-bold">{selectedPatient.temperature}</p>
                      <p className="text-xs text-muted-foreground">°F</p>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="p-4 text-center">
                      <Droplets className="mx-auto h-6 w-6 text-primary mb-2" />
                      <p className="text-2xl font-bold">{selectedPatient.oxygenSaturation}</p>
                      <p className="text-xs text-muted-foreground">SpO2 %</p>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="p-4 text-center">
                      <p className="text-xs text-muted-foreground mb-2">Blood Pressure</p>
                      <p className="text-2xl font-bold">{selectedPatient.bloodPressure}</p>
                      <p className="text-xs text-muted-foreground">mmHg</p>
                    </CardContent>
                  </Card>
                </div>

                {/* Vitals History Chart */}
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-base">Heart Rate History (24h)</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="h-48">
                      <ResponsiveContainer width="100%" height="100%">
                        <AreaChart data={vitalsHistory.heartRate}>
                          <defs>
                            <linearGradient id="heartRateGradient" x1="0" y1="0" x2="0" y2="1">
                              <stop offset="5%" stopColor="hsl(var(--chart-1))" stopOpacity={0.3} />
                              <stop offset="95%" stopColor="hsl(var(--chart-1))" stopOpacity={0} />
                            </linearGradient>
                          </defs>
                          <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                          <XAxis dataKey="time" className="text-xs" />
                          <YAxis domain={[50, 100]} className="text-xs" />
                          <Tooltip
                            contentStyle={{
                              backgroundColor: "hsl(var(--card))",
                              border: "1px solid hsl(var(--border))",
                              borderRadius: "8px",
                            }}
                          />
                          <Area
                            type="monotone"
                            dataKey="value"
                            stroke="hsl(var(--chart-1))"
                            fill="url(#heartRateGradient)"
                            strokeWidth={2}
                          />
                        </AreaChart>
                      </ResponsiveContainer>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
