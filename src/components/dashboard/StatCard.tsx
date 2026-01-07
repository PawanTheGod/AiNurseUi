import { LucideIcon } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface StatCardProps {
  title: string;
  value: string | number;
  icon: LucideIcon;
  variant?: "default" | "critical" | "warning" | "success";
  className?: string;
}

export function StatCard({
  title,
  value,
  icon: Icon,
  variant = "default",
  className,
}: StatCardProps) {
  const variantStyles = {
    default: "bg-gradient-to-br from-card to-card/80",
    critical: "bg-gradient-to-br from-status-critical/5 to-status-critical/10 border-status-critical/20",
    warning: "bg-gradient-to-br from-status-warning/5 to-status-warning/10 border-status-warning/20",
    success: "bg-gradient-to-br from-status-normal/5 to-status-normal/10 border-status-normal/20",
  };

  const iconStyles = {
    default: "text-primary bg-primary/10",
    critical: "text-status-critical bg-status-critical/10",
    warning: "text-status-warning bg-status-warning/10",
    success: "text-status-normal bg-status-normal/10",
  };

  return (
    <Card 
      className={cn(
        "border elevation-sm card-hover overflow-hidden",
        variantStyles[variant],
        variant === "critical" && "critical-glow",
        className
      )}
    >
      <CardContent className="p-8">
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <p className="text-sm font-medium text-muted-foreground tracking-wide uppercase">
              {title}
            </p>
            <div className={cn(
              "h-10 w-10 rounded-lg flex items-center justify-center transition-transform duration-200 hover:scale-110",
              iconStyles[variant]
            )}>
              <Icon className="h-5 w-5" />
            </div>
          </div>
          <p className="text-4xl font-bold tracking-tight">{value}</p>
        </div>
      </CardContent>
    </Card>
  );
}
