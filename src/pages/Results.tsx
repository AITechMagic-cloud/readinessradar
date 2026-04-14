import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { getTier, pillars, questions } from "@/data/questions";
import { RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, ResponsiveContainer } from "recharts";
import { Lock } from "lucide-react";
import { Button } from "@/components/ui/button";

const Results = () => {
  const navigate = useNavigate();
  const [submission, setSubmission] = useState<any>(null);

  useEffect(() => {
    const raw = localStorage.getItem("rr_submission");
    if (!raw) { navigate("/"); return; }
    setSubmission(JSON.parse(raw));
  }, [navigate]);

  if (!submission) return null;

  const { totalScore, bucket, firstName, answers } = submission;
  const tier = getTier(totalScore);

  const pillarScores = pillars.map(p => {
    const qs = questions.filter(q => q.pillar === p);
    const score = qs.reduce((sum, q) => sum + (answers[q.id] || 0), 0);
    const max = qs.length * 3;
    return { pillar: p, score, max, pct: Math.round((score / max) * 100) };
  });

  const radarData = pillarScores.map(ps => ({
    subject: ps.pillar,
    value: ps.pct,
    fullMark: 100,
  }));

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-3xl mx-auto px-6 py-12">
        {/* Header */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-12">
          <span className="font-display font-bold text-lg text-primary">ReadinessRadar</span>
          <h1 className="font-display font-bold text-3xl sm:text-4xl text-primary mt-6 mb-2">
            {firstName}, your AI readiness score
          </h1>
          <div className="inline-flex items-center gap-3 mt-4">
            <span className="font-display font-extrabold text-6xl" style={{ color: tier.color }}>
              {totalScore}
            </span>
            <span className="text-muted-foreground font-display text-lg">/ 60</span>
          </div>
          <div className="mt-3">
            <span
              className="inline-block px-4 py-1.5 rounded-full font-display font-semibold text-sm"
              style={{ backgroundColor: tier.color + "20", color: tier.color }}
            >
              {bucket}
            </span>
          </div>
        </motion.div>

        {/* Narrative */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-card border border-border rounded-2xl p-8 mb-8"
        >
          <h2 className="font-display font-bold text-xl text-primary mb-3">Your Assessment</h2>
          <p className="text-foreground leading-relaxed">{tier.narrative}</p>
        </motion.div>

        {/* Pillar breakdown */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-card border border-border rounded-2xl p-8 mb-8"
        >
          <h2 className="font-display font-bold text-xl text-primary mb-6">Pillar Breakdown</h2>
          <div className="space-y-4">
            {pillarScores.map(ps => (
              <div key={ps.pillar}>
                <div className="flex justify-between mb-1">
                  <span className="font-display font-medium text-sm text-foreground">{ps.pillar}</span>
                  <span className="font-display font-semibold text-sm text-muted-foreground">{ps.score}/{ps.max}</span>
                </div>
                <div className="w-full h-3 bg-secondary rounded-full overflow-hidden">
                  <motion.div
                    className="h-full rounded-full"
                    style={{ backgroundColor: tier.color }}
                    initial={{ width: 0 }}
                    animate={{ width: `${ps.pct}%` }}
                    transition={{ duration: 0.8, delay: 0.4 }}
                  />
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Radar chart — locked behind Pro */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-card border border-border rounded-2xl p-8 mb-8 relative"
        >
          <h2 className="font-display font-bold text-xl text-primary mb-4">Radar View</h2>
          <div className="relative">
            <div className="blur-sm pointer-events-none select-none">
              <ResponsiveContainer width="100%" height={300}>
                <RadarChart data={radarData}>
                  <PolarGrid stroke="hsl(var(--border))" />
                  <PolarAngleAxis dataKey="subject" tick={{ fontSize: 12, fontFamily: 'Outfit' }} />
                  <PolarRadiusAxis angle={90} domain={[0, 100]} tick={false} axisLine={false} />
                  <Radar name="Score" dataKey="value" stroke="#E8784A" fill="#E8784A" fillOpacity={0.3} />
                </RadarChart>
              </ResponsiveContainer>
            </div>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <Lock className="w-8 h-8 text-muted-foreground mb-3" />
              <p className="font-display font-semibold text-primary mb-1">Unlock Radar View</p>
              <p className="text-sm text-muted-foreground mb-4">Get per-pillar radar chart with Pro</p>
              <Button className="bg-accent text-accent-foreground hover:bg-accent/90 font-display font-semibold rounded-xl">
                Upgrade to Pro — $79/mo
              </Button>
            </div>
          </div>
        </motion.div>

        {/* CTA */}
        <div className="text-center">
          <Button variant="outline" onClick={() => navigate("/")} className="font-display">
            Back to Home
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Results;
