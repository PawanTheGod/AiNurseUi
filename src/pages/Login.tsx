import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Lock, Activity, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/lib/firebase";
import { useToast } from "@/hooks/use-toast";

export default function Login() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      await signInWithEmailAndPassword(auth, email, password);
      toast({
        title: "Login Successful",
        description: "Welcome back to HealVorteX",
      });
      navigate("/dashboard");
    } catch (error: any) {
      console.error("Login error:", error);
      toast({
        variant: "destructive",
        title: "Authentication Failed",
        description: error.message || "Invalid credentials. Please try again.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full flex animate-fade-in">
      {/* Left Panel - Brand & Trust */}
      <div className="hidden lg:flex w-1/2 bg-primary/5 relative overflow-hidden flex-col justify-between p-12 border-r">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-background to-background pointer-events-none" />
        
        {/* Brand */}
        <div className="relative z-10 flex items-center gap-2 text-primary font-bold text-xl">
          <Activity className="h-6 w-6" />
          <span>HealVorteX</span>
        </div>

        {/* Hero Text */}
        <div className="relative z-10 max-w-md space-y-4">
          <h2 className="text-3xl font-bold tracking-tight text-foreground">
            Next-Generation AI for Clinical Excellence.
          </h2>
          <p className="text-muted-foreground text-lg leading-relaxed">
            Secure, intelligent patient monitoring designed to empower healthcare teams with predictive insights.
          </p>
          <div className="flex items-center gap-4 pt-4 text-sm font-medium text-foreground/80">
            <div className="flex items-center gap-2">
              <ShieldCheck className="h-4 w-4 text-primary" />
              <span>HIPAA Compliant</span>
            </div>
            <div className="flex items-center gap-2">
              <Lock className="h-4 w-4 text-primary" />
              <span>End-to-End Encrypted</span>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="relative z-10 text-xs text-muted-foreground">
          © 2024 HealVorteX Medical Systems. All rights reserved.
        </div>
      </div>

      {/* Right Panel - Login Form */}
      <div className="flex-1 flex items-center justify-center p-8 bg-background">
        <div className="w-full max-w-[380px] space-y-8">
          <div className="space-y-2 text-center lg:text-left">
            <h1 className="text-2xl font-bold tracking-tight">Welcome back</h1>
            <p className="text-muted-foreground">
              Sign in to access your clinical dashboard
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-6">
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Work Email</Label>
                <Input 
                  id="email" 
                  type="email" 
                  placeholder="doctor@hospital.org" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required 
                  className="h-11 bg-muted/30 border-muted-foreground/20 focus-visible:ring-primary/20"
                />
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="password">Password</Label>
                  <a href="#" className="text-xs text-primary hover:underline font-medium">
                    Forgot password?
                  </a>
                </div>
                <Input 
                  id="password" 
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required 
                  className="h-11 bg-muted/30 border-muted-foreground/20 focus-visible:ring-primary/20"
                />
              </div>
            </div>

            <Button 
              className="w-full h-11 text-base shadow-sm hover:shadow transition-all" 
              type="submit" 
              disabled={isLoading}
            >
              {isLoading ? "Authenticating..." : "Sign In"}
            </Button>
          </form>

          <div className="pt-6 border-t text-center space-y-3">
            <p className="text-xs text-muted-foreground">
              By signing in, you agree to our <a href="#" className="underline hover:text-foreground">Terms of Service</a> and <a href="#" className="underline hover:text-foreground">Privacy Policy</a>.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
