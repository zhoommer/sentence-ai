import { initializeApp } from "firebase/app";
import { getAuth, connectAuthEmulator } from "firebase/auth";
import {
  getFirestore,
  enableMultiTabIndexedDbPersistence,
  connectFirestoreEmulator,
} from "firebase/firestore";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

// Firebase app'i başlat
const app = initializeApp(firebaseConfig);

// Auth ve Firestore servislerini başlat
const auth = getAuth();
const db = getFirestore(app);

// Geliştirme ortamında emülatörleri kullan
if (process.env.NEXT_PUBLIC_USE_FIREBASE_EMULATOR === "true") {
  try {
    // Auth emülatörünü bağla
    connectAuthEmulator(auth, "http://localhost:9099", {
      disableWarnings: true,
    });
    console.log("Firebase Auth emülatörü bağlandı: localhost:9099");

    // Firestore emülatörünü bağla
    connectFirestoreEmulator(db, "localhost", 8081);
    console.log("Firebase Firestore emülatörü bağlandı: localhost:8081");
  } catch (err) {
    console.error("Firebase emülatör bağlantı hatası:", err);
  }
} else {
  console.log(
    "Firebase emülatörleri devre dışı, production ortamına bağlanılıyor",
  );
}

// Çevrimdışı desteğini etkinleştir
if (process.env.NODE_ENV === "production") {
  try {
    enableMultiTabIndexedDbPersistence(db)
      .then(() => {
        console.log("Çevrimdışı depolama etkinleştirildi");
      })
      .catch((err: any) => {
        if (err.code === "failed-precondition") {
          console.warn(
            "Çoklu sekme açık olduğu için çevrimdışı depolama etkinleştirilemedi",
          );
        } else if (err.code === "unimplemented") {
          console.warn("Tarayıcınız çevrimdışı depolamayı desteklemiyor");
        } else {
          console.error("Çevrimdışı depolama hatası:", err);
        }
      });
  } catch (err) {
    console.error("Çevrimdışı depolama başlatma hatası:", err);
  }
}

export { auth, db };
