"use client";

import { useState, useEffect } from "react";
import { AiOutlineSearch, AiOutlineCheck, AiOutlineClose, AiOutlineFilter } from "react-icons/ai";
import { FaSpinner } from "react-icons/fa";
import { createTurkishSentence, checkTranslation, getWordList } from "@/app/genkit";

type Word = {
  word: string;
  level: string;
  category: string;
};

export const WordPractice = () => {
  const [selectedWord, setSelectedWord] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [turkishSentence, setTurkishSentence] = useState("");
  const [userTranslation, setUserTranslation] = useState("");
  const [aiResponse, setAiResponse] = useState<{
    isCorrect: boolean;
    feedback: string;
    corrections?: string;
  } | null>(null);
  const [loading, setLoading] = useState(false);
  const [words, setWords] = useState<Word[]>([]);
  const [selectedLevel, setSelectedLevel] = useState<string>("all");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");

  // Kelime listesini yükle
  useEffect(() => {
    const loadWords = async () => {
      const wordList = await getWordList();
      setWords(wordList);
    };
    loadWords();
  }, []);

  // Filtreleme fonksiyonu
  const filteredWords = words.filter(word => {
    const matchesSearch = word.word.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesLevel = selectedLevel === "all" || word.level === selectedLevel;
    const matchesCategory = selectedCategory === "all" || word.category === selectedCategory;
    return matchesSearch && matchesLevel && matchesCategory;
  });

  // Benzersiz kategorileri al
  const categories = ["all", ...new Set(words.map(word => word.category))];
  const levels = ["all", ...new Set(words.map(word => word.level))];

  const handleGenerateSentence = async () => {
    setLoading(true);
    try {
      const sentence = await createTurkishSentence(selectedWord);
      setTurkishSentence(sentence);
      setUserTranslation("");
      setAiResponse(null);
    } catch (error) {
      console.error("Cümle oluşturulurken hata:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleCheckTranslation = async () => {
    setLoading(true);
    try {
      const response = await checkTranslation(turkishSentence, userTranslation, selectedWord);
      setAiResponse(response);
    } catch (error) {
      console.error("Çeviri kontrol edilirken hata:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      {/* Kelime Seçimi */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold mb-4">Kelime Seçin</h2>
        
        {/* Arama ve Filtreler */}
        <div className="space-y-4">
          {/* Arama */}
          <div className="relative">
            <AiOutlineSearch className="absolute left-3 top-3 text-zinc-400" size={20} />
            <input
              type="text"
              placeholder="Kelime ara..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10"
            />
          </div>

          {/* Filtreler */}
          <div className="flex gap-4">
            {/* Seviye Filtresi */}
            <div className="flex-1">
              <select
                value={selectedLevel}
                onChange={(e) => setSelectedLevel(e.target.value)}
                className="w-full bg-[#222] text-white rounded-lg px-4 py-2 border border-[#333]"
              >
                <option value="all">Tüm Seviyeler</option>
                {levels.filter(level => level !== "all").map((level) => (
                  <option key={level} value={level}>{level}</option>
                ))}
              </select>
            </div>

            {/* Kategori Filtresi */}
            <div className="flex-1">
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full bg-[#222] text-white rounded-lg px-4 py-2 border border-[#333]"
              >
                <option value="all">Tüm Kategoriler</option>
                {categories.filter(category => category !== "all").map((category) => (
                  <option key={category} value={category}>
                    {category.charAt(0).toUpperCase() + category.slice(1)}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Kelime Listesi */}
        <div className="mt-4 flex flex-wrap gap-2">
          {filteredWords.map((word) => (
            <button
              key={word.word}
              onClick={() => setSelectedWord(word.word)}
              className={`px-4 py-2 rounded-lg text-sm ${
                selectedWord === word.word
                  ? "bg-blue-600 text-white"
                  : "bg-[#222] hover:bg-[#333] text-white"
              }`}
            >
              {word.word}
            </button>
          ))}
        </div>
      </div>

      {/* Seçilen Kelime ve Cümle Oluşturma */}
      {selectedWord && (
        <div className="mb-8">
          <h3 className="text-xl font-bold mb-4">
            Seçilen Kelime: <span className="text-blue-500">{selectedWord}</span>
          </h3>
          <button
            onClick={handleGenerateSentence}
            disabled={loading}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl font-medium disabled:opacity-50"
          >
            {loading ? (
              <FaSpinner className="animate-spin mx-auto" />
            ) : (
              "Türkçe Cümle Oluştur"
            )}
          </button>
        </div>
      )}

      {/* Türkçe Cümle */}
      {turkishSentence && (
        <div className="mb-8">
          <h3 className="text-xl font-bold mb-4">Türkçe Cümle</h3>
          <div className="bg-[#222] p-4 rounded-xl">
            <p className="text-white">{turkishSentence}</p>
          </div>
        </div>
      )}

      {/* Kullanıcı Çevirisi */}
      {turkishSentence && (
        <div className="mb-8">
          <h3 className="text-xl font-bold mb-4">İngilizce Çeviriniz</h3>
          <textarea
            value={userTranslation}
            onChange={(e) => setUserTranslation(e.target.value)}
            placeholder="Cümlenin İngilizce çevirisini yazın..."
            className="w-full h-32 bg-[#222] text-white rounded-xl p-4 resize-none"
          />
          <button
            onClick={handleCheckTranslation}
            disabled={!userTranslation || loading}
            className="mt-4 w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-xl font-medium disabled:opacity-50"
          >
            {loading ? (
              <FaSpinner className="animate-spin mx-auto" />
            ) : (
              "Çeviriyi Kontrol Et"
            )}
          </button>
        </div>
      )}

      {/* AI Geri Bildirimi */}
      {aiResponse && (
        <div className={`p-4 rounded-xl ${
          aiResponse.isCorrect ? "bg-green-500/10" : "bg-red-500/10"
        }`}>
          <div className="flex items-center gap-2 mb-2">
            {aiResponse.isCorrect ? (
              <AiOutlineCheck className="text-green-500" size={20} />
            ) : (
              <AiOutlineClose className="text-red-500" size={20} />
            )}
            <h3 className="text-xl font-bold">
              {aiResponse.isCorrect ? "Doğru!" : "Tekrar Deneyin"}
            </h3>
          </div>
          <p className={`text-sm ${
            aiResponse.isCorrect ? "text-green-500" : "text-red-500"
          }`}>
            {aiResponse.feedback}
          </p>
          {aiResponse.corrections && (
            <p className="mt-2 text-sm text-zinc-400">
              Önerilen düzeltme: {aiResponse.corrections}
            </p>
          )}
        </div>
      )}
    </div>
  );
}; 