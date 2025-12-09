import { useNavigate, useSearchParams } from "react-router-dom";
import { motion } from "framer-motion";
import { Dog } from "@/components/Dog";
import { RewardBone } from "@/components/RewardBone";
import { Button } from "@/components/ui/button";
import { Trophy, Star, RotateCcw, Home } from "lucide-react";
import successCelebration from "@/assets/success-celebration.jpg";
import { useGameProgress } from "@/hooks/useGameProgress";
import { useEffect } from "react";

const Complete = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { completeLevel } = useGameProgress();
  
  const level = parseInt(searchParams.get("level") || "1");
  const correct = parseInt(searchParams.get("correct") || "0");
  const total = parseInt(searchParams.get("total") || "0");
  const bones = parseInt(searchParams.get("bones") || "0");
  
  const percentage = total > 0 ? Math.round((correct / total) * 100) : 0;
  const isExcellent = percentage >= 80;
  const isGood = percentage >= 60;

  useEffect(() => {
    // Save progress when level is completed
    completeLevel(level, bones);
  }, [level, bones, completeLevel]);

  return (
    <div 
      className="min-h-screen bg-background flex items-center justify-center p-4 relative overflow-hidden"
      style={{
        backgroundImage: `url(${successCelebration})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed'
      }}
    >
      <div className="absolute inset-0 bg-background/60 backdrop-blur-md" />
      
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="max-w-2xl w-full relative z-10"
      >
        <div className="bg-card/95 backdrop-blur-sm p-8 md:p-12 rounded-3xl shadow-large border-4 border-border">
          <div className="flex flex-col items-center gap-6">
            <motion.div
              animate={{
                rotate: [0, -10, 10, -10, 10, 0],
                scale: [1, 1.1, 1.1, 1.1, 1.1, 1]
              }}
              transition={{ duration: 1.5, repeat: Infinity, repeatDelay: 2 }}
            >
              <Trophy size={80} className="text-accent" />
            </motion.div>
            
            <Dog 
              emotion={isExcellent ? "excited" : "happy"} 
              size="large" 
            />
            
            <div className="text-center">
              <h1 className="text-5xl md:text-6xl font-bold text-foreground mb-4">
                {isExcellent ? "Excellent!" : isGood ? "Great Job!" : "Good Try!"}
              </h1>
              <p className="text-2xl text-muted-foreground">
                Level {level} Complete
              </p>
            </div>
            
            <div className="w-full bg-muted rounded-2xl p-8 space-y-4">
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-3">
                  <Star className="w-8 h-8 text-accent fill-accent" />
                  <span className="text-xl font-semibold">Score</span>
                </div>
                <span className="text-3xl font-bold text-success">
                  {correct} / {total}
                </span>
              </div>
              
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-3">
                  <Trophy className="w-8 h-8 text-primary" />
                  <span className="text-xl font-semibold">Accuracy</span>
                </div>
                <span className="text-3xl font-bold text-primary">
                  {percentage}%
                </span>
              </div>
              
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-3">
                  <RewardBone size="small" />
                  <span className="text-xl font-semibold">Bones Earned</span>
                </div>
                <span className="text-3xl font-bold text-secondary">
                  {bones}
                </span>
              </div>
            </div>
            
            <div className="w-full flex flex-col md:flex-row gap-4">
              <Button
                size="lg"
                onClick={() => navigate(`/game?level=${level}`)}
                className="flex-1 h-16 text-xl font-bold bg-gradient-primary hover:scale-105 transition-all duration-300"
              >
                <RotateCcw className="w-6 h-6 mr-2" />
                Play Again
              </Button>
              
              <Button
                size="lg"
                variant="outline"
                onClick={() => navigate("/")}
                className="flex-1 h-16 text-xl font-bold hover:scale-105 transition-all duration-300"
              >
                <Home className="w-6 h-6 mr-2" />
                Main Menu
              </Button>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Complete;
