import { WordPractice } from "@/features/word-practice/components/WordPractice";

export default function PracticePage() {
  return (
    <div className="container mx-auto py-8">
      {/* <h1 className="text-3xl font-bold text-center mb-8">
        İngilizce Kelime Pratiği
      </h1> */}
      <WordPractice />
    </div>
  );
} 