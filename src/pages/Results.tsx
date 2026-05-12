import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { getTier, pillars, questions } from "@/data/questions";
import { RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, ResponsiveContainer } from "recharts";
import { Lock, Copy, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";
import { supabase } from "@/lib/supabase";

const Results = () => {
  const navigate = useNavigate();
  const [submission, setSubmission] = useState<any>(null);
  const [copied, setCopied] = useState(false);
  const [isPro, setIsPro] = useState(false);

  useEffect(() => {
    const raw = localStorage.getItem("rr_submission");
    if (!raw) { navigate("/"); return; }
    setSubmission(JSON.parse(raw));
    // Optimistic hint so paying users don't flash the locked state
    setIsPro(localStorage.getItem("rr_is_pro") === "true");

    // Source of truth: database is_pro, set only by Stripe webhook
    const assessmentId = localStorage.getItem("rr_assessment_id");
    if (!assessmentId) {
      setIsPro(false);
      return;
    }
    (async () => {
      try {
        const { data, error } = await supabase
          .from("readiness_assessments")
          .select("is_pro")
          .eq("id", assessmentId)
          .maybeSingle();
        if (error || !data) {
          setIsPro(false);
          return;
        }
        setIsPro(data.is_pro === true);
      } catch (err) {
        console.error("Failed to verify pro status:", err);
        setIsPro(false);
      }
    })();
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

  const handleCopyShare = async () => {
    try {
      await navigator.clipboard.writeText(tier.shareLine);
      setCopied(true);
      toast({ title: "Copied to clipboard" });
      setTimeout(() => setCopied(false), 2000);
    } catch {
      toast({ title: "Could not copy", variant: "destructive" });
    }
  };

  const handleUpgrade = () => {
    const STRIPE_PAYMENT_LINK = "https://buy.stripe.com/test_28EfZg0W33Bh3xw5gv8og00";
    const assessmentId = localStorage.getItem("rr_assessment_id");
    const email = localStorage.getItem("rr_email") || submission?.email || "";
    if (!assessmentId) {
      console.warn("rr_assessment_id missing — proceeding to Stripe without linking");
    }
    const params = new URLSearchParams();
    if (assessmentId) params.set("client_reference_id", assessmentId);
    if (email) params.set("prefilled_email", email);
    window.location.href = `${STRIPE_PAYMENT_LINK}?${params.toString()}`;
  };

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
          {/* Score bridge */}
          <p
            className="italic font-display text-lg leading-relaxed mb-8 pl-4 border-l-4"
            style={{ borderColor: tier.color, color: tier.color }}
          >
            {tier.scoreBridge}
          </p>

          {/* What your score tells us */}
          <h2 className="font-display font-bold text-xl text-primary mb-3">What your score tells us</h2>
          <p className="text-foreground leading-relaxed mb-8">{tier.narrative}</p>

          {/* What this typically means */}
          <h2 className="font-display font-bold text-xl text-primary mb-3">
            What this typically means for your organization
          </h2>
          <ul className="space-y-3 mb-8">
            {tier.bullets.map((b, i) => (
              <li key={i} className="flex gap-3 text-foreground leading-relaxed">
                <span
                  className="mt-2 w-1.5 h-1.5 rounded-full shrink-0"
                  style={{ backgroundColor: tier.color }}
                />
                <span>{b}</span>
              </li>
            ))}
          </ul>

          {/* Recommended next step */}
          <h2 className="font-display font-bold text-xl text-primary mb-3">Your recommended next step</h2>
          <p className="text-foreground leading-relaxed mb-6">{tier.nextStep}</p>
          <a href={tier.ctaLink}>
            <Button
              className="font-display font-semibold rounded-xl text-white hover:opacity-90"
              style={{ backgroundColor: tier.color }}
              size="lg"
            >
              {tier.ctaText}
            </Button>
          </a>

          {/* Share line */}
          <div
            className="mt-10 rounded-xl p-5 flex items-start gap-3"
            style={{ backgroundColor: tier.color + "12", borderLeft: `4px solid ${tier.color}` }}
          >
            <blockquote className="flex-1 font-serif italic text-foreground leading-relaxed">
              "{tier.shareLine}"
            </blockquote>
            <button
              onClick={handleCopyShare}
              className="shrink-0 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-background border border-border hover:bg-muted transition-colors text-xs font-display font-medium text-foreground"
              aria-label="Copy share line"
            >
              {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
              {copied ? "Copied" : "Copy"}
            </button>
          </div>
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
          {isPro ? (
            <ResponsiveContainer width="100%" height={300}>
              <RadarChart data={radarData}>
                <PolarGrid stroke="hsl(var(--border))" />
                <PolarAngleAxis dataKey="subject" tick={{ fontSize: 12, fontFamily: 'Outfit' }} />
                <PolarRadiusAxis angle={90} domain={[0, 100]} tick={false} axisLine={false} />
                <Radar name="Score" dataKey="value" stroke="#E8784A" fill="#E8784A" fillOpacity={0.3} />
              </RadarChart>
            </ResponsiveContainer>
          ) : (
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
                <Button onClick={handleUpgrade} className="bg-accent text-accent-foreground hover:bg-accent/90 font-display font-semibold rounded-xl">
                  Upgrade to Pro — $79/mo
                </Button>
              </div>
            </div>
          )}
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
