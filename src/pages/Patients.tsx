import { useState } from "react";
import { Search, Heart, Thermometer, Droplets, Activity, Eye } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
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
  { label: string; className: string; bgClass: string }
> = {
  normal: {
    label: "Normal",
    className: "bg-status-normal",
    bgClass: "bg-status-normal/10",
  },
  warning: {
    label: "Alert",
    className: "bg-status-warning",
    bgClass: "bg-status-warning/10",
  },
  critical: {
    label: "Critical",
    className: "bg-status-critical",
    bgClass: "bg-status-critical/10",
  },
};

// Mock data for different vitals charts
const generateVitalsData = (baseValue: number, variance: number) => {
  const times = ["00:00", "04:00", "08:00", "12:00", "16:00", "20:00"];
  return times.map(time => ({
    time,
    value: baseValue + (Math.random() - 0.5) * variance
  }));
};

export default function Patients() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedPatient, setSelectedPatient] = useState<Patient | null>(null);
  const [activeTab, setActiveTab] = useState("heart-rate");

  const filteredPatients = patients.filter(
    (patient) =>
      patient.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      patient.id.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const chartData = {
    heartRate: vitalsHistory.heartRate,
    temperature: generateVitalsData(98.6, 2),
    bloodPressure: generateVitalsData(120, 20),
    oxygen: generateVitalsData(97, 3),
  };

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Header */}
      <div className="space-y-1">
        <h1 className="text-3xl font-semibold tracking-tight">Patients</h1>
        <p className="text-muted-foreground">
          Manage and monitor all registered patients
        </p>
      </div>

      {/* Search */}
      <div className="relative max-w-sm">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          placeholder="Search patients..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-10 h-11 elevation-sm"
        />
      </div>

      {/* Patients Table */}
      <Card className="elevation-md">
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow className="hover:bg-transparent border-b border-border/40">
                <TableHead className="font-semibold">Name</TableHead>
                <TableHead className="font-semibold">HR</TableHead>
                <TableHead className="font-semibold">Temp</TableHead>
                <TableHead className="font-semibold">Status</TableHead>
                <TableHead className="font-semibold">Last Updated</TableHead>
                <TableHead className="text-right font-semibold">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredPatients.map((patient) => (
                <TableRow
                  key={patient.id}
                  className="transition-colors hover:bg-muted/30"
                >
                  <TableCell>
                    <div>
                      <p className="font-medium">{patient.name}</p>
                      <p className="text-sm text-muted-foreground">
                        Room {patient.roomNumber}
                      </p>
                    </div>
                  </TableCell>
                  <TableCell className="font-medium">
                    {patient.heartRate} BPM
                  </TableCell>
                  <TableCell className="font-medium">
                    {patient.temperature}°F
                  </TableCell>
                  <TableCell>
                    <Badge 
                      variant="secondary" 
                      className={cn(
                        "text-xs font-normal px-3 py-1 rounded-full border-0",
                        statusConfig[patient.status].bgClass
                      )}
                    >
                      <span className={cn("status-indicator mr-1.5", statusConfig[patient.status].className)} />
                      {statusConfig[patient.status].label}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-muted-foreground text-sm">
                    {patient.lastUpdated}
                  </TableCell>
                  <TableCell className="text-right">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => {
                        setSelectedPatient(patient);
                        setActiveTab("heart-rate");
                      }}
                      className="h-9"
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

      {/* Patient Detail Modal with Tabs */}
      <Dialog open={!!selectedPatient} onOpenChange={() => setSelectedPatient(null)}>
        <DialogContent className="max-w-5xl max-h-[90vh] overflow-y-auto elevation-lg">
          {selectedPatient && (
            <>
              <DialogHeader className="pb-4 border-b border-border/40">
                <div className="flex items-center justify-between">
                  <div>
                    <DialogTitle className="text-2xl font-semibold">{selectedPatient.name}</DialogTitle>
                    <p className="text-sm text-muted-foreground mt-1">
                      {selectedPatient.id} • Room {selectedPatient.roomNumber}
                    </p>
                  </div>
                  <Badge 
                    variant="secondary" 
                    className={cn(
                      "text-xs font-normal px-3 py-1.5 rounded-full border-0",
                      statusConfig[selectedPatient.status].bgClass
                    )}
                  >
                    <span className={cn("status-indicator mr-1.5", statusConfig[selectedPatient.status].className)} />
                    {statusConfig[selectedPatient.status].label}
                  </Badge>
                </div>
              </DialogHeader>

              <div className="space-y-8 pt-4">
                {/* Current Vitals Overview */}
                <div className="grid gap-4 sm:grid-cols-4">
                  <Card className="elevation-sm bg-gradient-to-br from-card to-card/95">
                    <CardContent className="p-6 text-center space-y-2">
                      <div className="h-10 w-10 rounded-lg bg-status-critical/10 flex items-center justify-center mx-auto">
                        <Heart className="h-5 w-5 text-status-critical" />
                      </div>
                      <p className="text-3xl font-bold">{selectedPatient.heartRate}</p>
                      <p className="text-xs text-muted-foreground">BPM</p>
                    </CardContent>
                  </Card>
                  <Card className="elevation-sm bg-gradient-to-br from-card to-card/95">
                    <CardContent className="p-6 text-center space-y-2">
                      <div className="h-10 w-10 rounded-lg bg-status-warning/10 flex items-center justify-center mx-auto">
                        <Thermometer className="h-5 w-5 text-status-warning" />
                      </div>
                      <p className="text-3xl font-bold">{selectedPatient.temperature}</p>
                      <p className="text-xs text-muted-foreground">°F</p>
                    </CardContent>
                  </Card>
                  <Card className="elevation-sm bg-gradient-to-br from-card to-card/95">
                    <CardContent className="p-6 text-center space-y-2">
                      <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center mx-auto">
                        <Droplets className="h-5 w-5 text-primary" />
                      </div>
                      <p className="text-3xl font-bold">{selectedPatient.oxygenSaturation}</p>
                      <p className="text-xs text-muted-foreground">SpO2 %</p>
                    </CardContent>
                  </Card>
                  <Card className="elevation-sm bg-gradient-to-br from-card to-card/95">
                    <CardContent className="p-6 text-center space-y-2">
                      <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center mx-auto">
                        <Activity className="h-5 w-5 text-primary" />
                      </div>
                      <p className="text-3xl font-bold">{selectedPatient.bloodPressure}</p>
                      <p className="text-xs text-muted-foreground">mmHg</p>
                    </CardContent>
                  </Card>
                </div>

                {/* Vitals History Tabs */}
                <Card className="elevation-sm">
                  <CardHeader className="border-b border-border/40">
                    <CardTitle className="text-lg font-semibold">Vitals History (24h)</CardTitle>
                  </CardHeader>
                  <CardContent className="pt-6">
                    <Tabs value={activeTab} onValueChange={setActiveTab}>
                      <div className="mb-6 overflow-x-auto">
                        <TabsList className="inline-flex w-full sm:grid sm:grid-cols-4 gap-2">
                          <TabsTrigger value="heart-rate" className="flex items-center gap-2 min-w-[140px] sm:min-w-0">
                            <Heart className="h-4 w-4" />
                            <span>Heart Rate</span>
                          </TabsTrigger>
                          <TabsTrigger value="temperature" className="flex items-center gap-2 min-w-[140px] sm:min-w-0">
                            <Thermometer className="h-4 w-4" />
                            <span>Temperature</span>
                          </TabsTrigger>
                          <TabsTrigger value="blood-pressure" className="flex items-center gap-2 min-w-[140px] sm:min-w-0">
                            <Activity className="h-4 w-4" />
                            <span>Blood Pressure</span>
                          </TabsTrigger>
                          <TabsTrigger value="oxygen" className="flex items-center gap-2 min-w-[140px] sm:min-w-0">
                            <Droplets className="h-4 w-4" />
                            <span>Oxygen</span>
                          </TabsTrigger>
                        </TabsList>
                      </div>

                      <TabsContent value="heart-rate" className="space-y-4">
                        <div className="h-80">
                          <ResponsiveContainer width="100%" height="100%">
                            <AreaChart data={chartData.heartRate}>
                              <defs>
                                <linearGradient id="heartRateGradient" x1="0" y1="0" x2="0" y2="1">
                                  <stop offset="5%" stopColor="hsl(var(--status-critical))" stopOpacity={0.25} />
                                  <stop offset="95%" stopColor="hsl(var(--status-critical))" stopOpacity={0} />
                                </linearGradient>
                              </defs>
                              <CartesianGrid strokeDasharray="3 3" className="stroke-muted" opacity={0.3} />
                              <XAxis dataKey="time" className="text-xs" stroke="hsl(var(--muted-foreground))" />
                              <YAxis domain={[50, 100]} className="text-xs" stroke="hsl(var(--muted-foreground))" />
                              <Tooltip
                                contentStyle={{
                                  backgroundColor: "hsl(var(--card))",
                                  border: "1px solid hsl(var(--border))",
                                  borderRadius: "8px",
                                  boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)",
                                }}
                              />
                              <Area
                                type="monotone"
                                dataKey="value"
                                stroke="hsl(var(--status-critical))"
                                fill="url(#heartRateGradient)"
                                strokeWidth={2.5}
                              />
                            </AreaChart>
                          </ResponsiveContainer>
                        </div>
                      </TabsContent>

                      <TabsContent value="temperature" className="space-y-4">
                        <div className="h-80">
                          <ResponsiveContainer width="100%" height="100%">
                            <AreaChart data={chartData.temperature}>
                              <defs>
                                <linearGradient id="tempGradient" x1="0" y1="0" x2="0" y2="1">
                                  <stop offset="5%" stopColor="hsl(var(--status-warning))" stopOpacity={0.25} />
                                  <stop offset="95%" stopColor="hsl(var(--status-warning))" stopOpacity={0} />
                                </linearGradient>
                              </defs>
                              <CartesianGrid strokeDasharray="3 3" className="stroke-muted" opacity={0.3} />
                              <XAxis dataKey="time" className="text-xs" stroke="hsl(var(--muted-foreground))" />
                              <YAxis domain={[96, 101]} className="text-xs" stroke="hsl(var(--muted-foreground))" />
                              <Tooltip
                                contentStyle={{
                                  backgroundColor: "hsl(var(--card))",
                                  border: "1px solid hsl(var(--border))",
                                  borderRadius: "8px",
                                  boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)",
                                }}
                              />
                              <Area
                                type="monotone"
                                dataKey="value"
                                stroke="hsl(var(--status-warning))"
                                fill="url(#tempGradient)"
                                strokeWidth={2.5}
                              />
                            </AreaChart>
                          </ResponsiveContainer>
                        </div>
                      </TabsContent>

                      <TabsContent value="blood-pressure" className="space-y-4">
                        <div className="h-80">
                          <ResponsiveContainer width="100%" height="100%">
                            <AreaChart data={chartData.bloodPressure}>
                              <defs>
                                <linearGradient id="bpGradient" x1="0" y1="0" x2="0" y2="1">
                                  <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.25} />
                                  <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0} />
                                </linearGradient>
                              </defs>
                              <CartesianGrid strokeDasharray="3 3" className="stroke-muted" opacity={0.3} />
                              <XAxis dataKey="time" className="text-xs" stroke="hsl(var(--muted-foreground))" />
                              <YAxis domain={[100, 140]} className="text-xs" stroke="hsl(var(--muted-foreground))" />
                              <Tooltip
                                contentStyle={{
                                  backgroundColor: "hsl(var(--card))",
                                  border: "1px solid hsl(var(--border))",
                                  borderRadius: "8px",
                                  boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)",
                                }}
                              />
                              <Area
                                type="monotone"
                                dataKey="value"
                                stroke="hsl(var(--primary))"
                                fill="url(#bpGradient)"
                                strokeWidth={2.5}
                              />
                            </AreaChart>
                          </ResponsiveContainer>
                        </div>
                      </TabsContent>

                      <TabsContent value="oxygen" className="space-y-4">
                        <div className="h-80">
                          <ResponsiveContainer width="100%" height="100%">
                            <AreaChart data={chartData.oxygen}>
                              <defs>
                                <linearGradient id="oxygenGradient" x1="0" y1="0" x2="0" y2="1">
                                  <stop offset="5%" stopColor="hsl(var(--status-normal))" stopOpacity={0.25} />
                                  <stop offset="95%" stopColor="hsl(var(--status-normal))" stopOpacity={0} />
                                </linearGradient>
                              </defs>
                              <CartesianGrid strokeDasharray="3 3" className="stroke-muted" opacity={0.3} />
                              <XAxis dataKey="time" className="text-xs" stroke="hsl(var(--muted-foreground))" />
                              <YAxis domain={[94, 100]} className="text-xs" stroke="hsl(var(--muted-foreground))" />
                              <Tooltip
                                contentStyle={{
                                  backgroundColor: "hsl(var(--card))",
                                  border: "1px solid hsl(var(--border))",
                                  borderRadius: "8px",
                                  boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)",
                                }}
                              />
                              <Area
                                type="monotone"
                                dataKey="value"
                                stroke="hsl(var(--status-normal))"
                                fill="url(#oxygenGradient)"
                                strokeWidth={2.5}
                              />
                            </AreaChart>
                          </ResponsiveContainer>
                        </div>
                      </TabsContent>
                    </Tabs>
                  </CardContent>
                </Card>

                {/* Clinical Notes */}
                <Card className="elevation-sm bg-muted/20">
                  <CardHeader className="border-b border-border/40">
                    <CardTitle className="text-lg font-semibold">Clinical Notes</CardTitle>
                  </CardHeader>
                  <CardContent className="pt-4">
                    <p className="text-sm text-muted-foreground">
                      <span className="font-medium text-foreground">Condition:</span> {selectedPatient.condition}
                    </p>
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
