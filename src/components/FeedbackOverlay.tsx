import { motion, AnimatePresence } from "framer-motion";
import { Dog } from "./Dog";
import { Bell } from "./Bell";
import { CheckCircle2, XCircle } from "lucide-react";

interface FeedbackOverlayProps {
  isCorrect: boolean | null;
  show: boolean;
}

export const FeedbackOverlay = ({ isCorrect, show }: FeedbackOverlayProps) => {
  return (
    <AnimatePresence>
      {show && isCorrect !== null && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-md"
        >
          <motion.div
            initial={{ scale: 0.5, y: 50 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.5, y: 50 }}
            transition={{ type: "spring", stiffness: 200, damping: 20 }}
            className="flex flex-col items-center gap-8"
          >
            {isCorrect ? (
              <>
                <Dog emotion="excited" size="large" />
                <Bell ringing={true} size={80} />
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.2, type: "spring" }}
                  className="flex items-center gap-4 bg-success text-success-foreground px-8 py-6 rounded-3xl shadow-large"
                >
                  <CheckCircle2 size={48} />
                  <div>
                    <p className="text-4xl font-bold">Great Job!</p>
                    <p className="text-xl">You got it right! 🎉</p>
                  </div>
                </motion.div>
              </>
            ) : (
              <>
                <Dog emotion="neutral" size="large" />
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring" }}
                  className="flex items-center gap-4 bg-accent text-accent-foreground px-8 py-6 rounded-3xl shadow-large"
                >
                  <XCircle size={48} />
                  <div>
                    <p className="text-4xl font-bold">Try Again!</p>
                    <p className="text-xl">You can do it! 💪</p>
                  </div>
                </motion.div>
              </>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
