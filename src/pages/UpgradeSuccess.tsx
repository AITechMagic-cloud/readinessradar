import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { CheckCircle2 } from "lucide-react";

const UpgradeSuccess = () => {
  const navigate = useNavigate();
  const [params] = useSearchParams();
  const sessionId = params.get("session_id");

  useEffect(() => {
    localStorage.setItem("rr_is_pro", "true");
    if (sessionId) console.log("Stripe session_id:", sessionId);
  }, [sessionId]);

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-lg w-full text-center"
      >
        <span className="font-display font-bold text-lg text-primary">ReadinessRadar</span>
        <div className="mt-8 mb-6 flex justify-center">
          <CheckCircle2 className="w-16 h-16 text-accent" />
        </div>
        <h1 className="font-display font-bold text-3xl sm:text-4xl text-primary mb-4">
          You're in.
        </h1>
        <p className="font-serif text-lg text-foreground leading-relaxed mb-8">
          Welcome to ReadinessRadar Pro — your radar view is now unlocked.
        </p>
        <Button
          onClick={() => navigate("/results")}
          className="bg-accent text-accent-foreground hover:bg-accent/90 font-display font-semibold text-base px-6 py-5 rounded-xl"
          size="lg"
        >
          View My Unlocked Results
        </Button>
      </motion.div>
    </div>
  );
};

export default UpgradeSuccess;