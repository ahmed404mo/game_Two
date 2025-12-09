import { motion, AnimatePresence } from "framer-motion";
import { Dog } from "./Dog";
import { RewardBone } from "./RewardBone";
import { Button } from "@/components/ui/button";
import { Sparkles } from "lucide-react";

interface RewardModalProps {
  show: boolean;
  bonesEarned: number;
  onContinue: () => void;
}

export const RewardModal = ({ show, bonesEarned, onContinue }: RewardModalProps) => {
  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-background/90 backdrop-blur-lg"
        >
          <motion.div
            initial={{ scale: 0.5, rotate: -10 }}
            animate={{ scale: 1, rotate: 0 }}
            exit={{ scale: 0.5, rotate: 10 }}
            transition={{ type: "spring", stiffness: 150 }}
            className="bg-gradient-accent p-12 rounded-3xl shadow-large max-w-md mx-4"
          >
            <div className="flex flex-col items-center gap-6">
              <motion.div
                animate={{
                  rotate: [0, -10, 10, -10, 10, 0],
                  scale: [1, 1.1, 1.1, 1.1, 1.1, 1]
                }}
                transition={{ duration: 1, repeat: Infinity, repeatDelay: 2 }}
              >
                <Sparkles size={64} className="text-accent-foreground" />
              </motion.div>
              
              <Dog emotion="excited" size="large" />
              
              <div className="text-center">
                <h2 className="text-4xl font-bold text-accent-foreground mb-2">
                  Amazing Work!
                </h2>
                <p className="text-2xl text-accent-foreground/90">
                  You earned a reward!
                </p>
              </div>
              
              <motion.div
                className="flex gap-4 items-center"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.3, type: "spring" }}
              >
                {[...Array(bonesEarned)].map((_, i) => (
                  <motion.div
                    key={i}
                    initial={{ y: -100, rotate: 0 }}
                    animate={{ y: 0, rotate: 360 }}
                    transition={{ delay: 0.4 + i * 0.15, type: "spring", bounce: 0.6 }}
                  >
                    <RewardBone size="large" />
                  </motion.div>
                ))}
              </motion.div>
              
              <p className="text-3xl font-bold text-accent-foreground">
                +{bonesEarned} Bone{bonesEarned !== 1 ? 's' : ''}!
              </p>
              
              <Button
                size="lg"
                onClick={onContinue}
                className="w-full h-16 text-2xl font-bold bg-white text-accent hover:bg-white/90 hover:scale-105 transition-all duration-300 shadow-medium"
              >
                Continue Playing
              </Button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
