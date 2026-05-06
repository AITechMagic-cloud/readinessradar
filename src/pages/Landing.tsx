import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, Database, Users, Workflow, ShieldCheck, Compass, Sparkles, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";

const Landing = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background">
      {/* Nav */}
      <nav className="flex items-center justify-between px-6 py-5 max-w-6xl mx-auto">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-accent flex items-center justify-center">
            <Zap className="w-4 h-4 text-accent-foreground" />
          </div>
          <span className="font-display font-bold text-xl text-primary">ReadinessRadar</span>
        </div>
        <Button onClick={() => navigate("/assessment")} variant="default" size="sm">
          Start Assessment <ArrowRight className="w-4 h-4 ml-1" />
        </Button>
      </nav>

      {/* Hero */}
      <section className="max-w-4xl mx-auto px-6 pt-20 pb-24 text-center">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
          <span className="inline-block px-4 py-1.5 rounded-full bg-secondary text-muted-foreground font-display text-sm font-medium mb-6">
            Free AI Maturity Assessment
          </span>
          <h1 className="font-display font-extrabold text-4xl sm:text-5xl md:text-6xl leading-tight text-primary mb-6">
            How AI-ready is<br />your organization?
          </h1>
          <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto mb-10 leading-relaxed">
            Answer 20 strategic questions across 6 pillars. Get your AI maturity score, personalized insights, and a clear roadmap in under 10 minutes.
          </p>
          <Button onClick={() => navigate("/assessment")} size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90 font-display font-semibold text-lg px-8 py-6 rounded-xl shadow-lg shadow-accent/20">
            Take the Assessment <ArrowRight className="w-5 h-5 ml-2" />
          </Button>
        </motion.div>
      </section>

      {/* Pillars */}
      <section className="max-w-5xl mx-auto px-6 pb-24">
        <h2 className="font-display font-bold text-2xl text-primary text-center mb-12">6 pillars we evaluate</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
          {[
            { icon: Database, label: "Data & Infrastructure" },
            { icon: Users, label: "Team & Skills" },
            { icon: Workflow, label: "Process Readiness" },
            { icon: ShieldCheck, label: "Governance & Risk" },
            { icon: Compass, label: "Leadership & Strategy" },
            { icon: Sparkles, label: "Current AI Maturity" },
          ].map((p) => (
            <div key={p.label} className="flex flex-col items-center text-center gap-3 p-6 rounded-2xl bg-card border border-border">
              <div className="w-12 h-12 rounded-xl bg-secondary flex items-center justify-center">
                <p.icon className="w-5 h-5 text-primary" />
              </div>
              <span className="font-display font-semibold text-primary">{p.label}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border py-8 text-center text-sm text-muted-foreground font-display">
        © {new Date().getFullYear()} ReadinessRadar. All rights reserved.
      </footer>
    </div>
  );
};

export default Landing;
