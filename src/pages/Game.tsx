import { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { motion } from "framer-motion";
import { Dog } from "@/components/Dog";
import { QuestionCard } from "@/components/QuestionCard";
import { FeedbackOverlay } from "@/components/FeedbackOverlay";
import { StatsDisplay } from "@/components/StatsDisplay";
import { RewardModal } from "@/components/RewardModal";
import { PrizeModal } from "@/components/PrizeModal";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { levels } from "@/data/levels";
import { GameStats } from "@/types/game";
import { useSoundEffects } from "@/hooks/useSoundEffects";

const Game = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const levelId = parseInt(searchParams.get("level") || "1");
  const level = levels.find(l => l.id === levelId) || levels[0];
  
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [stats, setStats] = useState<GameStats>({
    totalCorrect: 0,
    totalAttempts: 0,
    bonesCollected: 0,
    currentStreak: 0
  });
  const [feedback, setFeedback] = useState<boolean | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [showReward, setShowReward] = useState(false);
  const [showPrize, setShowPrize] = useState(false);
  const [waitingForNext, setWaitingForNext] = useState(false);
  
  const { playSound } = useSoundEffects();
  const currentQuestion = level.questions[currentQuestionIndex];
  const isLastQuestion = currentQuestionIndex === level.questions.length - 1;

  const handleAnswer = (answer: string) => {
    if (waitingForNext) return;
    
    const isCorrect = answer === currentQuestion.correctAnswer;
    setFeedback(isCorrect);
    setShowFeedback(true);
    setWaitingForNext(true);
    
    setStats(prev => ({
      ...prev,
      totalAttempts: prev.totalAttempts + 1,
      totalCorrect: isCorrect ? prev.totalCorrect + 1 : prev.totalCorrect,
      currentStreak: isCorrect ? prev.currentStreak + 1 : 0
    }));
    
    if (isCorrect) {
      playSound('bell');
      setTimeout(() => playSound('success'), 400);
      
      // Check if player earned a reward
      if (stats.currentStreak + 1 >= level.rewardThreshold) {
        setTimeout(() => {
          setShowFeedback(false);
          setShowReward(true);
          playSound('reward');
          const newBonesCount = stats.bonesCollected + 1;
          setStats(prev => ({
            ...prev,
            bonesCollected: newBonesCount,
            currentStreak: 0
          }));
          
          // Check if player earned a special prize (every 5 bones)
          if (newBonesCount % 5 === 0) {
            setTimeout(() => {
              setShowReward(false);
              setShowPrize(true);
            }, 1000);
          }
        }, 1500);
      } else {
        setTimeout(() => {
          setShowFeedback(false);
          moveToNext();
        }, 1500);
      }
    } else {
      playSound('error');
      setTimeout(() => {
        setShowFeedback(false);
        setWaitingForNext(false);
      }, 1500);
    }
  };

  const moveToNext = () => {
    if (isLastQuestion) {
      navigate(`/complete?level=${levelId}&correct=${stats.totalCorrect}&total=${stats.totalAttempts}&bones=${stats.bonesCollected}`);
    } else {
      setCurrentQuestionIndex(prev => prev + 1);
      setWaitingForNext(false);
    }
  };

  const handleRewardContinue = () => {
    setShowReward(false);
    // Don't move to next if a prize modal will show
    if (stats.bonesCollected % 5 !== 0) {
      moveToNext();
    }
  };
  
  const handlePrizeContinue = () => {
    setShowPrize(false);
    moveToNext();
  };

  return (
    <div 
      className="min-h-screen p-4 md:p-8 relative overflow-hidden bg-gradient-to-br from-primary/10 via-background to-accent/10"
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,_hsl(var(--primary)/0.12)_0%,_transparent_50%),radial-gradient(circle_at_20%_80%,_hsl(var(--accent)/0.12)_0%,_transparent_50%)]" />
      
      <div className="max-w-5xl mx-auto relative z-10 space-y-6">
        <div className="flex items-center justify-between">
          <Button
            variant="outline"
            size="lg"
            onClick={() => navigate("/")}
            className="gap-2 bg-card/80 backdrop-blur-sm hover:bg-card"
          >
            <ArrowLeft className="w-5 h-5" />
            Back to Menu
          </Button>
          
          <motion.div
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="text-center"
          >
            <h1 className="text-2xl md:text-3xl font-bold text-foreground">
              {level.name}
            </h1>
            <p className="text-muted-foreground">
              Question {currentQuestionIndex + 1} of {level.questions.length}
            </p>
          </motion.div>
          
          <div className="w-[120px]" /> {/* Spacer for alignment */}
        </div>

        <StatsDisplay stats={stats} />

        <div className="flex justify-center mb-6">
          <Dog 
            emotion={feedback === true ? "happy" : "neutral"} 
            size="medium" 
          />
        </div>

        <QuestionCard
          question={currentQuestion}
          onAnswer={handleAnswer}
          disabled={waitingForNext}
        />

        <div className="text-center text-muted-foreground text-sm">
          <p>💡 Get {level.rewardThreshold} correct in a row for a reward!</p>
          <p>Current streak: {stats.currentStreak} 🔥</p>
        </div>
      </div>

      <FeedbackOverlay 
        isCorrect={feedback} 
        show={showFeedback} 
      />

      <RewardModal
        show={showReward}
        bonesEarned={1}
        onContinue={handleRewardContinue}
      />

      <PrizeModal
        show={showPrize}
        totalBones={stats.bonesCollected}
        onContinue={handlePrizeContinue}
      />
    </div>
  );
};

export default Game;
