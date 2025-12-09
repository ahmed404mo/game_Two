import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Star, Trophy, Target } from "lucide-react";
import { RewardBone } from "./RewardBone";
import { GameStats } from "@/types/game";

interface StatsDisplayProps {
  stats: GameStats;
}

export const StatsDisplay = ({ stats }: StatsDisplayProps) => {
  return (
    <Card className="p-6 bg-card/90 backdrop-blur-sm border-2 border-border shadow-medium">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <motion.div 
          className="flex flex-col items-center gap-2"
          whileHover={{ scale: 1.05 }}
        >
          <Trophy className="w-8 h-8 text-accent" />
          <div className="text-center">
            <p className="text-sm text-muted-foreground">Correct</p>
            <p className="text-2xl font-bold text-success">{stats.totalCorrect}</p>
          </div>
        </motion.div>
        
        <motion.div 
          className="flex flex-col items-center gap-2"
          whileHover={{ scale: 1.05 }}
        >
          <Target className="w-8 h-8 text-primary" />
          <div className="text-center">
            <p className="text-sm text-muted-foreground">Total</p>
            <p className="text-2xl font-bold text-foreground">{stats.totalAttempts}</p>
          </div>
        </motion.div>
        
        <motion.div 
          className="flex flex-col items-center gap-2"
          whileHover={{ scale: 1.05 }}
        >
          <Star className="w-8 h-8 text-accent fill-accent" />
          <div className="text-center">
            <p className="text-sm text-muted-foreground">Streak</p>
            <p className="text-2xl font-bold text-accent">{stats.currentStreak}</p>
          </div>
        </motion.div>
        
        <motion.div 
          className="flex flex-col items-center gap-2"
          whileHover={{ scale: 1.05 }}
        >
          <RewardBone size="small" />
          <div className="text-center">
            <p className="text-sm text-muted-foreground">Bones</p>
            <p className="text-2xl font-bold text-secondary">{stats.bonesCollected}</p>
          </div>
        </motion.div>
      </div>
    </Card>
  );
};
