import {
  AiOutlineBook,
  AiOutlineRobot,
  AiOutlineTranslation,
} from "react-icons/ai";

export default function HowItsWork() {
  return (
    <>
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-12">Nasıl Çalışır?</h2>
        <div className="grid md:grid-cols-3 gap-8">
          <div className="bg-[#111] p-6 rounded-2xl border border-[#222] hover:border-blue-600 transition-colors cursor-pointer">
            <div className="w-12 h-12 bg-blue-600/10 rounded-xl flex items-center justify-center mb-4 shadow-md hover:shadow-blue-400/20 hover:shadow-md hover:bg-blue-600/20 transition-all">
              <AiOutlineBook className="text-2xl text-blue-500" />
            </div>
            <h3 className="text-xl font-bold mb-2">Kelime Seçimi</h3>
            <p className="text-zinc-400">
              1000+ İngilizce kelime arasından pratik yapmak istediğiniz
              kelimeyi seçin.
            </p>
          </div>

          <div className="bg-[#111] p-6 rounded-2xl border border-[#222] hover:border-purple-600 transition-colors cursor-pointer">
            <div className="w-12 h-12 bg-purple-600/10 rounded-xl flex items-center justify-center mb-4 shadow-md hover:shadow-md hover:shadow-purple-400/20 hover:bg-purple-600/20 transition-all">
              <AiOutlineRobot className="text-2xl text-purple-500" />
            </div>
            <h3 className="text-xl font-bold mb-2">AI Cümle Üretimi</h3>
            <p className="text-zinc-400">
              Yapay zeka seçtiğiniz kelimeyi kullanarak Türkçe bir cümle
              oluşturur.
            </p>
          </div>

          <div className="bg-[#111] p-6 rounded-2xl border border-[#222] hover:border-green-600 transition-colors cursor-pointer">
            <div className="w-12 h-12 bg-green-600/10 rounded-xl flex items-center justify-center mb-4 shadow-md hover:shadow-md hover:shadow-green-400/20 hover:bg-green-600/20 transition-all">
              <AiOutlineTranslation className="text-2xl text-green-500" />
            </div>
            <h3 className="text-xl font-bold mb-2">Çeviri Pratiği</h3>
            <p className="text-zinc-400">
              Oluşturulan cümleyi İngilizce'ye çevirin ve AI'dan anında geri
              bildirim alın.
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
