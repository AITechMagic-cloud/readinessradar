import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { supabase } from "@/lib/supabase";
import { questions } from "@/data/questions";

const EmailGate = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({ firstName: "", email: "", company: "", companySize: "" });
  const [submitting, setSubmitting] = useState(false);

  const isValid = form.firstName && form.email && form.company && form.companySize;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isValid) return;
    setSubmitting(true);

    const answersRaw = localStorage.getItem("rr_answers");
    const answers = answersRaw ? JSON.parse(answersRaw) : {};
    const totalScore = Object.values<number>(answers).reduce((a, b) => a + b, 0);

    let bucket = "AI Dormant";
    if (totalScore >= 48) bucket = "AI Accelerating";
    else if (totalScore >= 34) bucket = "AI Awakening";

    const submission = { ...form, answers, totalScore, bucket };
    localStorage.setItem("rr_submission", JSON.stringify(submission));

    const dbBucket =
      totalScore >= 48 ? "accelerating" : totalScore >= 34 ? "awakening" : "dormant";

    const answersArray = questions.map((q) => ({
      question_id: q.id,
      score: Number(answers[q.id]) || 0,
    }));
    const s = (id: number) => Number(answers[id]) || 0;
    const pillar_scores = {
      data: s(1) + s(2) + s(3) + s(4),
      team: s(5) + s(6) + s(7),
      process: s(8) + s(9) + s(10),
      governance: s(11) + s(12) + s(13),
      leadership: s(14) + s(15) + s(16),
      maturity: s(17) + s(18) + s(19) + s(20),
    };

    try {
      const id = crypto.randomUUID();
      const { error } = await supabase
        .from("readiness_assessments")
        .insert([{
          id,
          first_name: form.firstName,
          email: form.email,
          company_name: form.company || null,
          company_size: form.companySize || null,
          answers: answersArray,
          total_score: totalScore,
          bucket: dbBucket,
          pillar_scores,
        }]);
      if (error) throw error;
      localStorage.setItem("rr_assessment_id", id);
      localStorage.setItem("rr_email", form.email);
    } catch (err) {
      console.error("Supabase insert failed:", err);
    }

    navigate("/results");
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-md w-full"
      >
        <div className="text-center mb-8">
          <span className="font-display font-bold text-lg text-primary">ReadinessRadar</span>
          <h1 className="font-display font-bold text-3xl text-primary mt-4 mb-2">Almost there!</h1>
          <p className="text-muted-foreground">Enter your details to see your personalized AI readiness results.</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="firstName" className="font-display text-sm font-medium">First Name</Label>
            <Input id="firstName" value={form.firstName} onChange={e => setForm(f => ({ ...f, firstName: e.target.value }))} placeholder="Jane" className="mt-1" />
          </div>
          <div>
            <Label htmlFor="email" className="font-display text-sm font-medium">Work Email</Label>
            <Input id="email" type="email" value={form.email} onChange={e => setForm(f => ({ ...f, email: e.target.value }))} placeholder="jane@company.com" className="mt-1" />
          </div>
          <div>
            <Label htmlFor="company" className="font-display text-sm font-medium">Company Name</Label>
            <Input id="company" value={form.company} onChange={e => setForm(f => ({ ...f, company: e.target.value }))} placeholder="Acme Corp" className="mt-1" />
          </div>
          <div>
            <Label className="font-display text-sm font-medium">Company Size</Label>
            <Select value={form.companySize} onValueChange={v => setForm(f => ({ ...f, companySize: v }))}>
              <SelectTrigger className="mt-1"><SelectValue placeholder="Select size" /></SelectTrigger>
              <SelectContent>
                <SelectItem value="1-50">1–50 employees</SelectItem>
                <SelectItem value="51-200">51–200 employees</SelectItem>
                <SelectItem value="201-500">201–500 employees</SelectItem>
                <SelectItem value="501-1000">501–1,000 employees</SelectItem>
                <SelectItem value="1000+">1,000+ employees</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <Button
            type="submit"
            disabled={!isValid || submitting}
            className="w-full bg-accent text-accent-foreground hover:bg-accent/90 font-display font-semibold text-base py-5 rounded-xl mt-2"
          >
            {submitting ? "Loading…" : "See My Results"}
          </Button>
        </form>
      </motion.div>
    </div>
  );
};

export default EmailGate;
