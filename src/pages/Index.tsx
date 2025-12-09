import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Dog } from "@/components/Dog";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { PlayCircle, BookOpen, Trophy, Lock, Star, Award } from "lucide-react";
import { levels } from "@/data/levels";
import { useSoundEffects } from "@/hooks/useSoundEffects";
import { useGameProgress } from "@/hooks/useGameProgress";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";

const Index = () => {
  const navigate = useNavigate();
  const { playSound } = useSoundEffects();
  const { progress, isLevelUnlocked } = useGameProgress();
  const [showFinalPrize, setShowFinalPrize] = useState(false);
  
  const completionPercentage = (progress.completedLevels.length / levels.length) * 100;
  const allLevelsCompleted = progress.completedLevels.length === levels.length;
  
  useEffect(() => {
    if (allLevelsCompleted && progress.completedLevels.length > 0) {
      const timer = setTimeout(() => {
        setShowFinalPrize(true);
        playSound('reward');
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [allLevelsCompleted, progress.completedLevels.length, playSound]);

  const handleLevelSelect = (levelId: number) => {
    if (!isLevelUnlocked(levelId)) {
      playSound('error');
      return;
    }
    playSound('click');
    navigate(`/game?level=${levelId}`);
  };

  return (
    <div 
      className="min-h-screen p-4 md:p-8 relative overflow-hidden bg-gradient-to-br from-primary/20 via-accent/20 to-secondary/20"
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,_hsl(var(--primary)/0.15)_0%,_transparent_50%),radial-gradient(circle_at_70%_80%,_hsl(var(--secondary)/0.15)_0%,_transparent_50%),radial-gradient(circle_at_50%_50%,_hsl(var(--accent)/0.1)_0%,_transparent_70%)]" />
      <div className="absolute inset-0 bg-background/60 backdrop-blur-[2px]" />
      
      <div className="max-w-6xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <motion.h1 
            className="text-5xl md:text-7xl font-bold text-foreground mb-4 drop-shadow-lg"
            animate={{ scale: [1, 1.02, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            🐕 Puppy's Learning Adventure
          </motion.h1>
          <p className="text-2xl md:text-3xl text-foreground/90 mb-8 drop-shadow">
            Learn with Your Friendly Dog!
          </p>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="max-w-3xl mx-auto mb-8"
          >
            <div className="bg-card/95 backdrop-blur-sm p-8 rounded-3xl border-4 border-border shadow-large">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-2xl font-bold text-foreground">🐾 Learning Journey</h3>
                <Badge variant={allLevelsCompleted ? "default" : "secondary"} className="text-lg px-5 py-2">
                  {progress.completedLevels.length} / {levels.length}
                </Badge>
              </div>
              
              <div className="relative">
                {/* Path line */}
                <div className="absolute top-8 left-0 right-0 h-2 bg-muted rounded-full" />
                <div 
                  className="absolute top-8 left-0 h-2 bg-gradient-primary rounded-full transition-all duration-1000"
                  style={{ width: `${completionPercentage}%` }}
                />
                
                {/* Levels with bones */}
                <div className="relative flex justify-between items-center pt-4 pb-8">
                  {levels.map((level, index) => {
                    const isCompleted = progress.completedLevels.includes(level.id);
                    return (
                      <motion.div
                        key={level.id}
                        initial={{ scale: 0, y: -20 }}
                        animate={{ scale: 1, y: 0 }}
                        transition={{ delay: 0.4 + index * 0.1, type: "spring" }}
                        className="flex flex-col items-center z-10"
                      >
                        <motion.div 
                          className={`text-5xl mb-2 transition-all ${
                            isCompleted ? 'grayscale-0' : 'grayscale opacity-40'
                          }`}
                          animate={isCompleted ? { 
                            rotate: [0, -10, 10, -10, 0],
                            scale: [1, 1.1, 1]
                          } : {}}
                          transition={{ duration: 0.5, delay: 0.5 + index * 0.1 }}
                        >
                          🦴
                        </motion.div>
                        <span className={`text-sm font-bold ${
                          isCompleted ? 'text-primary' : 'text-muted-foreground'
                        }`}>
                          {level.id}
                        </span>
                      </motion.div>
                    );
                  })}
                </div>
                
                {/* Moving Dog */}
                <motion.div
                  className="absolute top-0 -translate-x-1/2 z-20"
                  initial={{ left: '0%' }}
                  animate={{ 
                    left: `${completionPercentage}%`,
                  }}
                  transition={{ 
                    duration: 1.5, 
                    type: "spring",
                    bounce: 0.3
                  }}
                >
                  <motion.div
                    animate={allLevelsCompleted ? { 
                      y: [0, -20, 0],
                      rotate: [0, 360]
                    } : {
                      y: [0, -5, 0]
                    }}
                    transition={{ 
                      duration: allLevelsCompleted ? 1 : 2,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                  >
                    <Dog 
                      emotion={allLevelsCompleted ? "excited" : "happy"} 
                      size="medium"
                    />
                  </motion.div>
                </motion.div>
              </div>
              
              {allLevelsCompleted && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8, y: 20 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  transition={{ delay: 1, type: "spring", bounce: 0.5 }}
                  className="mt-6 p-6 bg-gradient-primary rounded-2xl text-center relative overflow-hidden"
                >
                  <motion.div
                    className="absolute inset-0"
                    animate={{
                      background: [
                        "radial-gradient(circle at 20% 50%, rgba(255,255,255,0.2) 0%, transparent 50%)",
                        "radial-gradient(circle at 80% 50%, rgba(255,255,255,0.2) 0%, transparent 50%)",
                        "radial-gradient(circle at 20% 50%, rgba(255,255,255,0.2) 0%, transparent 50%)",
                      ]
                    }}
                    transition={{ duration: 2, repeat: Infinity }}
                  />
                  <motion.div
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 1, repeat: Infinity }}
                    className="relative"
                  >
                    <Trophy className="w-12 h-12 mx-auto mb-3 text-primary-foreground" />
                  </motion.div>
                  <p className="text-2xl font-bold text-primary-foreground mb-2 relative">
                    Congratulations! You completed all levels! 🎉
                  </p>
                  <p className="text-lg text-primary-foreground/90 relative">
                    The dog reached the end and collected all bones! 🦴✨
                  </p>
                </motion.div>
              )}
            </div>
          </motion.div>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6 mb-8">
          {levels.map((level, index) => {
            const isUnlocked = isLevelUnlocked(level.id);
            const isCompleted = progress.completedLevels.includes(level.id);
            
            return (
              <motion.div
                key={level.id}
                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 + index * 0.15, duration: 0.5 }}
              >
                <Card className={`p-8 backdrop-blur-sm border-4 shadow-large transition-all duration-300 ${
                  isUnlocked 
                    ? 'bg-card/95 border-border hover:shadow-xl hover:scale-[1.02]' 
                    : 'bg-card/50 border-muted opacity-70'
                }`}>
                  <div className="flex items-start gap-6">
                    <motion.div
                      whileHover={isUnlocked ? { rotate: 360 } : {}}
                      transition={{ duration: 0.6 }}
                      className="flex-shrink-0 relative"
                    >
                      {!isUnlocked && (
                        <div className="absolute inset-0 flex items-center justify-center z-10">
                          <Lock size={40} className="text-muted-foreground" />
                        </div>
                      )}
                      {level.id === 1 ? (
                        <BookOpen size={64} className={isUnlocked ? "text-primary" : "text-muted-foreground"} />
                      ) : (
                        <Trophy size={64} className={isUnlocked ? "text-secondary" : "text-muted-foreground"} />
                      )}
                    </motion.div>
                    
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-3">
                        <h2 className="text-3xl font-bold text-foreground">
                          Level {level.id}
                        </h2>
                        {isCompleted && (
                          <Badge className="bg-success text-success-foreground">
                            <Star className="w-4 h-4 mr-1 fill-current" />
                            Completed
                          </Badge>
                        )}
                        {!isUnlocked && (
                          <Badge variant="secondary">
                            <Lock className="w-4 h-4 mr-1" />
                            Locked
                          </Badge>
                        )}
                      </div>
                      <h3 className={`text-2xl font-semibold mb-4 ${isUnlocked ? 'text-primary' : 'text-muted-foreground'}`}>
                        {level.name}
                      </h3>
                      <p className="text-lg text-muted-foreground mb-6">
                        {isUnlocked ? (
                          <>
                            {level.questions.length} fun questions • 
                            Earn bones every {level.rewardThreshold} correct!
                          </>
                        ) : (
                          <>Complete Level {level.id - 1} to unlock!</>
                        )}
                      </p>
                      
                      <Button
                        size="lg"
                        onClick={() => handleLevelSelect(level.id)}
                        disabled={!isUnlocked}
                        className={`w-full h-14 text-xl font-bold transition-all duration-300 shadow-medium ${
                          isUnlocked 
                            ? 'bg-gradient-primary hover:scale-105' 
                            : 'opacity-50 cursor-not-allowed'
                        }`}
                      >
                        {isUnlocked ? (
                          <>
                            <PlayCircle className="w-6 h-6 mr-2" />
                            {isCompleted ? 'Play Again' : 'Start Level'}
                          </>
                        ) : (
                          <>
                            <Lock className="w-6 h-6 mr-2" />
                            Locked
                          </>
                        )}
                      </Button>
                    </div>
                  </div>
                </Card>
              </motion.div>
            );
          })}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="bg-card/95 backdrop-blur-sm p-8 rounded-3xl border-4 border-border shadow-large"
        >
          <h3 className="text-2xl font-bold text-center text-foreground mb-4">
            How to Play
          </h3>
          <div className="grid md:grid-cols-3 gap-6 text-center">
            <div>
              <div className="text-5xl mb-3">🎯</div>
              <h4 className="text-xl font-semibold mb-2">Choose Answers</h4>
              <p className="text-muted-foreground">
                Pick the correct color, shape, or letter!
              </p>
            </div>
            <div>
              <div className="text-5xl mb-3">🔔</div>
              <h4 className="text-xl font-semibold mb-2">Hear the Bell</h4>
              <p className="text-muted-foreground">
                When you're right, the puppy rings a bell!
              </p>
            </div>
            <div>
              <div className="text-5xl mb-3">🦴</div>
              <h4 className="text-xl font-semibold mb-2">Earn Bones</h4>
              <p className="text-muted-foreground">
                Get bones for doing great!
              </p>
            </div>
          </div>
          
          <div className="mt-8 bg-gradient-accent p-6 rounded-2xl border-2 border-accent">
            <h4 className="text-2xl font-bold text-center mb-3 text-accent-foreground">
              🎁 Special Prizes!
            </h4>
            <p className="text-lg text-center text-accent-foreground/90">
              Collect 5 bones = ⭐ Gold Star • 10 bones = 🏆 Trophy<br />
              15 bones = 👑 Crown • 20 bones = 🎁 Special Gift!
            </p>
          </div>
        </motion.div>
      </div>
      
      <Dialog open={showFinalPrize} onOpenChange={setShowFinalPrize}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle className="text-center text-3xl mb-4">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", bounce: 0.5 }}
              >
                🏆 Congratulations Champion! 🏆
              </motion.div>
            </DialogTitle>
          </DialogHeader>
          
          <div className="text-center space-y-4">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
              className="inline-block"
            >
              <Award className="w-24 h-24 text-primary mx-auto" />
            </motion.div>
            
            <div className="space-y-2">
              <p className="text-2xl font-bold text-foreground">
                You completed all levels!
              </p>
              <p className="text-lg text-muted-foreground">
                You collected {progress.totalBones} bones 🦴
              </p>
              <div className="pt-4 pb-2">
                <div className="text-6xl mb-3">🎁</div>
                <p className="text-xl font-bold text-primary">Your Grand Prize!</p>
                <p className="text-lg text-muted-foreground">You are a true champion! 🌟</p>
              </div>
            </div>
            
            <Button
              size="lg"
              onClick={() => setShowFinalPrize(false)}
              className="w-full bg-gradient-primary text-lg"
            >
              Awesome! 🎉
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Index;
