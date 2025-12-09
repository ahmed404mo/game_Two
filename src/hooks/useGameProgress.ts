import { useState, useEffect } from 'react';

interface GameProgress {
  completedLevels: number[];
  totalBones: number;
}

const STORAGE_KEY = 'puppy-game-progress';

export const useGameProgress = () => {
  const [progress, setProgress] = useState<GameProgress>(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved ? JSON.parse(saved) : { completedLevels: [], totalBones: 0 };
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
  }, [progress]);

  const completeLevel = (levelId: number, bonesEarned: number) => {
    setProgress(prev => ({
      completedLevels: prev.completedLevels.includes(levelId) 
        ? prev.completedLevels 
        : [...prev.completedLevels, levelId],
      totalBones: prev.totalBones + bonesEarned
    }));
  };

  const isLevelUnlocked = (levelId: number) => {
    if (levelId === 1) return true;
    return progress.completedLevels.includes(levelId - 1);
  };

  const resetProgress = () => {
    setProgress({ completedLevels: [], totalBones: 0 });
  };

  return {
    progress,
    completeLevel,
    isLevelUnlocked,
    resetProgress
  };
};
