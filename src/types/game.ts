export type QuestionType = 'color' | 'shape' | 'letter';

export interface Question {
  id: string;
  type: QuestionType;
  question: string;
  options: string[];
  correctAnswer: string;
  audioHint?: string;
}

export interface Level {
  id: number;
  name: string;
  questions: Question[];
  rewardThreshold: number;
}

export interface GameStats {
  totalCorrect: number;
  totalAttempts: number;
  bonesCollected: number;
  currentStreak: number;
}
