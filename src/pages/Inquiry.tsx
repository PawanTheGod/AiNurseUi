import { useState } from "react";
import { AlertCircle, CheckCircle, ChevronDown, ChevronUp } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { inquiryResponses, InquiryResponse } from "@/data/mockData";
import { cn } from "@/lib/utils";

const riskConfig = {
  low: {
    label: "Low Risk",
    className: "bg-status-normal",
    bgClass: "bg-status-normal/10",
  },
  medium: {
    label: "Medium Risk",
    className: "bg-status-warning",
    bgClass: "bg-status-warning/10",
  },
  high: {
    label: "High Risk",
    className: "bg-status-critical",
    bgClass: "bg-status-critical/10",
  },
};

function InquiryCard({ inquiry }: { inquiry: InquiryResponse }) {
  const [isOpen, setIsOpen] = useState(false);
  const config = riskConfig[inquiry.riskLevel];
  const abnormalCount = inquiry.questions.filter((q) => q.isAbnormal).length;

  return (
    <Collapsible open={isOpen} onOpenChange={setIsOpen}>
      <Card className={cn(
        "border elevation-sm transition-all duration-200",
        "bg-gradient-to-br from-card to-card/95",
        isOpen && "elevation-md"
      )}>
        <CollapsibleTrigger asChild>
          <button className="w-full text-left p-5 cursor-pointer">
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-3">
                <div className={cn(
                  "h-10 w-10 rounded-lg flex items-center justify-center shrink-0",
                  config.bgClass
                )}>
                  <span className={cn("status-indicator w-3 h-3", config.className)} />
                </div>
                <div>
                  <h4 className="font-semibold mb-0.5">{inquiry.patientName}</h4>
                  <p className="text-sm text-muted-foreground">
                    {inquiry.date} • {inquiry.questions.length} questions
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <Badge 
                  variant="secondary" 
                  className={cn(
                    "text-xs font-normal px-3 py-1 rounded-full border-0",
                    config.bgClass
                  )}
                >
                  <span className={cn("status-indicator mr-1.5", config.className)} />
                  {config.label}
                </Badge>
                {abnormalCount > 0 && (
                  <Badge variant="destructive" className="text-xs px-2 py-1">
                    {abnormalCount} abnormal
                  </Badge>
                )}
                <Button variant="ghost" size="icon" className="h-8 w-8 shrink-0">
                  {isOpen ? (
                    <ChevronUp className="h-4 w-4" />
                  ) : (
                    <ChevronDown className="h-4 w-4" />
                  )}
                </Button>
              </div>
            </div>
          </button>
        </CollapsibleTrigger>

        <CollapsibleContent>
          <CardContent className="pt-0 pb-5 px-5">
            <div className="space-y-2 border-t pt-4 border-border/40">
              {inquiry.questions.map((q, index) => (
                <div
                  key={index}
                  className={cn(
                    "flex items-start gap-3 p-4 rounded-lg border elevation-sm transition-all duration-200",
                    "bg-gradient-to-br from-card to-card/95",
                    q.isAbnormal && "bg-status-critical/5"
                  )}
                >
                  <div className={cn(
                    "h-8 w-8 rounded-lg flex items-center justify-center shrink-0",
                    q.isAbnormal ? "bg-status-critical/10" : "bg-status-normal/10"
                  )}>
                    {q.isAbnormal ? (
                      <AlertCircle className="h-4 w-4 text-status-critical" />
                    ) : (
                      <CheckCircle className="h-4 w-4 text-status-normal" />
                    )}
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium mb-1">{q.question}</p>
                    <p
                      className={cn(
                        "text-sm",
                        q.isAbnormal ? "text-status-critical font-medium" : "text-muted-foreground"
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
    <div className="space-y-8 animate-fade-in">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <h1 className="text-3xl font-semibold tracking-tight">AI Health Inquiry</h1>
          <p className="text-muted-foreground">
            Daily patient health check responses analyzed by AI
          </p>
        </div>
        {highRiskCount > 0 && (
          <Badge 
            variant="destructive" 
            className="text-sm px-4 py-2"
          >
            {highRiskCount} high risk
          </Badge>
        )}
      </div>

      {/* Inquiry List */}
      <div className="space-y-3">
        {sortedInquiries.map((inquiry) => (
          <InquiryCard key={inquiry.id} inquiry={inquiry} />
        ))}
      </div>
    </div>
  );
}
