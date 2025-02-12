import { AiFillCheckCircle } from "react-icons/ai";

export default async function Page() {
  return (
    <div className="container mx-auto py-8 px-6">
      <div className="text-center mb-12">
        <h1 className="text-3xl font-bold mb-4">Premium Üyeliğe Geç</h1>
        <p className="text-gray-600 mb-8">
          Mobil uygulamamızı indirerek premium özelliklerin keyfini çıkarın
        </p>

        <div className="flex justify-center space-x-6 mb-12">
          <a
            href="#"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-green-500 text-white px-6 py-3 rounded-lg flex items-center space-x-2 hover:bg-green-600 transition"
          >
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
              <path d="M3 17.25V21h18v-3.75M3 17.25h18M3 17.25c0-2.485 2.015-4.5 4.5-4.5h9c2.485 0 4.5 2.015 4.5 4.5m-16.5-9V6a3 3 0 013-3h12a3 3 0 013 3v2.25m-18 0h18M5.25 6h13.5a3 3 0 013 3v6a3 3 0 01-3 3H5.25a3 3 0 01-3-3V9a3 3 0 013-3z" />
            </svg>
            <span>Google Play'den İndir</span>
          </a>

          <a
            href="#"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-black text-white px-6 py-3 rounded-lg flex items-center space-x-2 hover:opacity-90 transition"
          >
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm3.75 12.65c-.47.22-.76.71-.76 1.23v1.38c0 .87-.7 1.57-1.57 1.57h-4.84c-.87 0-1.57-.7-1.57-1.57v-4.84c0-.87.7-1.57 1.57-1.57h1.38c.52 0 1.01-.29 1.23-.76.22-.47.12-1.02-.26-1.4l-2.12-2.12c-.39-.39-1.02-.39-1.41 0l-3.54 3.54c-.39.39-.39 1.02 0 1.41l3.54 3.54c.39.39 1.02.39 1.41 0l2.12-2.12c.38-.38.93-.48 1.4-.26.47.22.76.71.76 1.23v1.38c0 .52.42.95.95.95h1.6c.52 0 .95-.42.95-.95v-1.6c0-.52.42-.95.95-.95h.6c.52 0 .95-.42.95-.95v-.6c0-.52-.42-.95-.95-.95h-1.38c-.52 0-1.01-.29-1.23-.76-.22-.47-.12-1.02.26-1.4l2.12-2.12c.39-.39.39-1.02 0-1.41l-3.54-3.54c-.39-.39-1.02-.39-1.41 0l-2.12 2.12c-.38.38-.93.48-1.4.26z" />
            </svg>
            <span>App Store'dan İndir</span>
          </a>
        </div>

        <div className="bg-blue-500/20 p-6 rounded-lg max-w-2xl mx-auto">
          <h2 className="text-2xl font-semibold mb-4">
            Premium Üyelik Avantajları
          </h2>
          <ul className="space-y-2 text-left">
            <li className="flex items-center">
              <AiFillCheckCircle className="me-1 text-green-400" />
              Sınırsız içerik erişimi
            </li>
            <li className="flex items-center">
              <AiFillCheckCircle className="me-1 text-green-400" />
              Özel eğitim içerikleri
            </li>
            <li className="flex items-center">
              <AiFillCheckCircle className="me-1 text-green-400" />
              Gelişmiş analiz araçları
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
