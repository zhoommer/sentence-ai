export type Word = {
  word: string;
  level: string;
  category: string;
};

export type AIResponse = {
  isCorrect: boolean;
  feedback: string;
  corrections?: string;
};

export type UserLevel = 'beginner' | 'intermediate' | 'advanced'; 