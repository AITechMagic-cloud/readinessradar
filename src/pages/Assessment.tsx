import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { questions } from "@/data/questions";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const Assessment = () => {
  const navigate = useNavigate();
  const [current, setCurrent] = useState(0);
  const [answers, setAnswers] = useState<Record<number, number>>({});

  const q = questions[current];
  const progress = ((current + (answers[q.id] !== undefined ? 1 : 0)) / questions.length) * 100;

  const selectAnswer = (score: number) => {
    setAnswers(prev => ({ ...prev, [q.id]: score }));
    setTimeout(() => {
      if (current < questions.length - 1) {
        setCurrent(c => c + 1);
      } else {
        localStorage.setItem("rr_answers", JSON.stringify({ ...answers, [q.id]: score }));
        navigate("/email-gate");
      }
    }, 300);
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <div className="px-6 py-5 max-w-3xl mx-auto w-full">
        <div className="flex items-center justify-between mb-4">
          <span className="font-display font-bold text-primary text-lg">ReadinessRadar</span>
          <span className="font-display text-sm text-muted-foreground">
            {current + 1} of {questions.length}
          </span>
        </div>
        <div className="w-full h-2 bg-secondary rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-accent rounded-full"
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.3 }}
          />
        </div>
      </div>

      {/* Question */}
      <div className="flex-1 flex items-center justify-center px-6 pb-12">
        <div className="max-w-2xl w-full">
          <AnimatePresence mode="wait">
            <motion.div
              key={q.id}
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -30 }}
              transition={{ duration: 0.25 }}
            >
              <span className="inline-block px-3 py-1 rounded-full bg-secondary text-muted-foreground font-display text-xs font-medium mb-4">
                {q.pillar}
              </span>
              <h2 className="font-display font-bold text-2xl sm:text-3xl text-primary mb-8 leading-tight">
                {q.text}
              </h2>
              <div className="space-y-3">
                {q.options.map((opt) => (
                  <button
                    key={opt.score}
                    onClick={() => selectAnswer(opt.score)}
                    className={`w-full text-left p-5 rounded-xl border-2 transition-all duration-200 ${
                      answers[q.id] === opt.score
                        ? "border-accent bg-accent/5 shadow-md"
                        : "border-border bg-card hover:border-accent/40 hover:shadow-sm"
                    }`}
                  >
                    <span className="font-body text-foreground leading-relaxed">{opt.label}</span>
                  </button>
                ))}
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Nav */}
          <div className="flex justify-between mt-8">
            <Button
              variant="ghost"
              onClick={() => setCurrent(c => Math.max(0, c - 1))}
              disabled={current === 0}
              className="font-display"
            >
              <ArrowLeft className="w-4 h-4 mr-1" /> Back
            </Button>
            {answers[q.id] !== undefined && current < questions.length - 1 && (
              <Button
                variant="ghost"
                onClick={() => setCurrent(c => c + 1)}
                className="font-display"
              >
                Next <ArrowRight className="w-4 h-4 ml-1" />
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Assessment;
