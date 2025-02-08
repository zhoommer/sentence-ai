import { Timestamp } from "firebase/firestore";

export interface UserStatistics {
  totalPractices: number;
  correctAnswers: number;
  wrongAnswers: number;
  lastPracticeDate: Timestamp;
  practiceStreak: number;
  learnedWords: string[];
  practiceHistory: PracticeRecord[];
}

export interface PracticeRecord {
  word: string;
  userLevel: string;
  isCorrect: boolean;
  turkishSentence: string;
  userTranslation: string;
  correctTranslation?: string;
  timestamp: Timestamp;
} 