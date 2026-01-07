import { useNavigate } from "react-router-dom";
import { ShieldCheck, Activity, Brain, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Landing() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background flex flex-col relative overflow-hidden">
      {/* Background Gradients */}
      <div className="absolute top-0 -left-1/4 w-1/2 h-1/2 bg-primary/5 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-0 -right-1/4 w-1/2 h-1/2 bg-blue-500/5 blur-[120px] rounded-full pointer-events-none" />

      {/* Nav */}
      <nav className="relative z-10 w-full px-6 py-6 flex items-center justify-between max-w-7xl mx-auto">
        <div className="flex items-center gap-2 font-bold text-xl tracking-tight">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10">
            <Activity className="h-5 w-5 text-primary" />
          </div>
          HealVorteX
        </div>
        <Button variant="ghost" className="font-medium" onClick={() => navigate("/login")}>
          Doctor Login
        </Button>
      </nav>

      <main className="flex-1 flex flex-col items-center justify-center px-4 md:px-6 relative z-10 text-center pb-20">
        <div className="bg-muted/30 border rounded-full px-4 py-1.5 mb-8 animate-fade-in flex items-center gap-2 shadow-sm backdrop-blur-sm">
          <span className="flex h-2 w-2 rounded-full bg-primary animate-pulse" />
          <span className="text-sm font-medium text-muted-foreground">System Operational • v2.4.0</span>
        </div>

        <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight text-foreground max-w-3xl mb-6 leading-tight animate-fade-in">
          The Future of <span className="text-primary">Agentic Nursing</span> & Patient Care
        </h1>

        <p className="max-w-xl text-lg text-muted-foreground mb-10 leading-relaxed animate-fade-in delay-75">
          Advanced AI patient monitoring designed for early intervention. 
          Reduce response times and improve clinical outcomes with our intelligent dashboard.
        </p>

        <div className="flex flex-col sm:flex-row items-center gap-4 animate-fade-in delay-100">
          <Button 
            size="lg" 
            onClick={() => navigate("/login")}
            className="h-12 px-8 text-base shadow-lg hover:shadow-xl transition-all hover:-translate-y-0.5 min-w-[200px]"
          >
            Access Dashboard
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
          <Button 
            variant="outline" 
            size="lg" 
            className="h-12 px-8 text-base min-w-[200px] bg-background/50 backdrop-blur-sm"
          >
            Read Documentation
          </Button>
        </div>

        {/* Feature Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-20 max-w-5xl w-full text-left">
          {[
            {
              icon: Brain,
              title: "AI Risk Analysis",
              desc: "Predictive algorithms strictly monitor patient trends to detect deterioration early."
            },
            {
              icon: Activity,
              title: "Live Vitals",
              desc: "Real-time streaming of heart rate, temperature, and critical metrics with zero latency."
            },
            {
              icon: ShieldCheck,
              title: "Enterprise Security",
              desc: "Bank-grade encryption ensuring complete HIPAA compliance and data integrity."
            }
          ].map((feature, i) => (
            <div 
              key={i} 
              className="p-6 rounded-xl bg-card/50 border hover:bg-card/80 transition-colors backdrop-blur-sm"
            >
              <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center mb-4 text-primary">
                <feature.icon className="h-5 w-5" />
              </div>
              <h3 className="font-semibold text-lg mb-2">{feature.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{feature.desc}</p>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
