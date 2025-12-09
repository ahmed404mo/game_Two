import { motion, AnimatePresence } from "framer-motion";
import { Dog } from "./Dog";
import { Button } from "@/components/ui/button";
import { Trophy, Crown, Star, Gift, Sparkles } from "lucide-react";

interface PrizeModalProps {
  show: boolean;
  totalBones: number;
  onContinue: () => void;
}

const prizes = [
  { bones: 5, icon: Star, name: "Gold Star", color: "text-accent" },
  { bones: 10, icon: Trophy, name: "Trophy", color: "text-primary" },
  { bones: 15, icon: Crown, name: "Crown", color: "text-secondary" },
  { bones: 20, icon: Gift, name: "Special Gift", color: "text-success" },
];

export const PrizeModal = ({ show, totalBones, onContinue }: PrizeModalProps) => {
  const currentPrize = prizes.find(p => totalBones % p.bones === 0 && totalBones > 0) || prizes[0];
  const PrizeIcon = currentPrize.icon;

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
            initial={{ scale: 0.3, rotate: -20 }}
            animate={{ scale: 1, rotate: 0 }}
            exit={{ scale: 0.3, rotate: 20 }}
            transition={{ type: "spring", stiffness: 120, damping: 15 }}
            className="bg-gradient-to-br from-accent/90 to-secondary/90 p-12 rounded-3xl shadow-large max-w-md mx-4 relative overflow-hidden"
          >
            <motion.div
              className="absolute inset-0 opacity-30"
              animate={{
                background: [
                  "radial-gradient(circle at 20% 20%, hsl(var(--primary)) 0%, transparent 50%)",
                  "radial-gradient(circle at 80% 80%, hsl(var(--secondary)) 0%, transparent 50%)",
                  "radial-gradient(circle at 20% 20%, hsl(var(--primary)) 0%, transparent 50%)",
                ],
              }}
              transition={{ duration: 3, repeat: Infinity }}
            />
            
            <div className="flex flex-col items-center gap-6 relative z-10">
              <motion.div
                animate={{
                  rotate: [0, 360],
                  scale: [1, 1.2, 1],
                }}
                transition={{ duration: 2, repeat: Infinity, repeatDelay: 1 }}
              >
                <Sparkles size={72} className="text-white" />
              </motion.div>
              
              <Dog emotion="excited" size="large" />
              
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.3, type: "spring", stiffness: 200 }}
                className="relative"
              >
                <motion.div
                  animate={{
                    rotate: [0, -10, 10, -10, 10, 0],
                  }}
                  transition={{ duration: 1.5, repeat: Infinity, repeatDelay: 1 }}
                >
                  <PrizeIcon size={100} className={`${currentPrize.color} drop-shadow-lg`} />
                </motion.div>
                
                <motion.div
                  className="absolute -inset-4"
                  animate={{
                    scale: [1, 1.3, 1],
                    opacity: [0.5, 0, 0.5],
                  }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  <div className="w-full h-full rounded-full bg-white/30" />
                </motion.div>
              </motion.div>
              
              <div className="text-center">
                <h2 className="text-5xl font-bold text-white mb-2">
                  🎉 WOW! 🎉
                </h2>
                <p className="text-3xl font-bold text-white/95 mb-2">
                  You Unlocked:
                </p>
                <p className="text-4xl font-bold text-white">
                  {currentPrize.name}!
                </p>
              </div>
              
              <div className="bg-white/20 backdrop-blur-sm rounded-2xl px-8 py-4">
                <p className="text-2xl font-bold text-white text-center">
                  🦴 {totalBones} Total Bones Collected!
                </p>
              </div>
              
              <Button
                size="lg"
                onClick={onContinue}
                className="w-full h-16 text-2xl font-bold bg-white text-primary hover:bg-white/90 hover:scale-105 transition-all duration-300 shadow-large"
              >
                Keep Going! 🚀
              </Button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
