import { useState } from "react";
import { ClipboardList, AlertCircle, CheckCircle, ChevronDown, ChevronUp } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { inquiryResponses, InquiryResponse } from "@/data/mockData";
import { cn } from "@/lib/utils";

const riskConfig = {
  low: {
    label: "Low Risk",
    className: "bg-status-normal/10 text-status-normal border-status-normal/20",
    iconClass: "text-status-normal",
  },
  medium: {
    label: "Medium Risk",
    className: "bg-status-warning/10 text-status-warning border-status-warning/20",
    iconClass: "text-status-warning",
  },
  high: {
    label: "High Risk",
    className: "bg-status-critical/10 text-status-critical border-status-critical/20",
    iconClass: "text-status-critical",
  },
};

function InquiryCard({ inquiry }: { inquiry: InquiryResponse }) {
  const [isOpen, setIsOpen] = useState(false);
  const config = riskConfig[inquiry.riskLevel];
  const abnormalCount = inquiry.questions.filter((q) => q.isAbnormal).length;

  return (
    <Collapsible open={isOpen} onOpenChange={setIsOpen}>
      <Card
        className={cn(
          "transition-all duration-200 card-hover",
          inquiry.riskLevel === "high" && "border-status-critical/30"
        )}
      >
        <CollapsibleTrigger asChild>
          <CardHeader className="cursor-pointer pb-3">
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-3">
                <div
                  className={cn(
                    "flex h-10 w-10 items-center justify-center rounded-lg",
                    inquiry.riskLevel === "high" && "bg-status-critical/20",
                    inquiry.riskLevel === "medium" && "bg-status-warning/20",
                    inquiry.riskLevel === "low" && "bg-status-normal/20"
                  )}
                >
                  <ClipboardList className={cn("h-5 w-5", config.iconClass)} />
                </div>
                <div>
                  <CardTitle className="text-base">{inquiry.patientName}</CardTitle>
                  <p className="text-xs text-muted-foreground">
                    {inquiry.date} • {inquiry.questions.length} questions
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <Badge variant="outline" className={cn("text-xs", config.className)}>
                  {config.label}
                </Badge>
                {abnormalCount > 0 && (
                  <Badge variant="destructive" className="text-xs">
                    {abnormalCount} abnormal
                  </Badge>
                )}
                <Button variant="ghost" size="icon" className="h-8 w-8">
                  {isOpen ? (
                    <ChevronUp className="h-4 w-4" />
                  ) : (
                    <ChevronDown className="h-4 w-4" />
                  )}
                </Button>
              </div>
            </div>
          </CardHeader>
        </CollapsibleTrigger>

        <CollapsibleContent>
          <CardContent className="pt-0">
            <div className="space-y-3 border-t pt-4">
              {inquiry.questions.map((q, index) => (
                <div
                  key={index}
                  className={cn(
                    "flex items-start gap-3 rounded-lg p-3",
                    q.isAbnormal ? "bg-status-critical/5" : "bg-muted/50"
                  )}
                >
                  {q.isAbnormal ? (
                    <AlertCircle className="h-4 w-4 mt-0.5 text-status-critical shrink-0" />
                  ) : (
                    <CheckCircle className="h-4 w-4 mt-0.5 text-status-normal shrink-0" />
                  )}
                  <div>
                    <p className="text-sm font-medium">{q.question}</p>
                    <p
                      className={cn(
                        "text-sm",
                        q.isAbnormal ? "text-status-critical" : "text-muted-foreground"
                      )}
                    >
                      {q.answer}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </CollapsibleContent>
      </Card>
    </Collapsible>
  );
}

export default function Inquiry() {
  // Sort by risk level: high first, then medium, then low
  const sortedInquiries = [...inquiryResponses].sort((a, b) => {
    const priority = { high: 0, medium: 1, low: 2 };
    return priority[a.riskLevel] - priority[b.riskLevel];
  });

  const highRiskCount = sortedInquiries.filter((i) => i.riskLevel === "high").length;

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">AI Health Inquiry</h1>
          <p className="text-muted-foreground">
            Daily patient health check responses analyzed by AI
          </p>
        </div>
        {highRiskCount > 0 && (
          <Badge variant="destructive" className="text-sm">
            {highRiskCount} high risk
          </Badge>
        )}
      </div>

      <div className="space-y-4">
        {sortedInquiries.map((inquiry) => (
          <InquiryCard key={inquiry.id} inquiry={inquiry} />
        ))}
      </div>
    </div>
  );
}
