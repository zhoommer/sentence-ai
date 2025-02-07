// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCn2F0X4RzdcnnzSLO7DbH3XiTrFGNHwH8",
  authDomain: "sentece-ai.firebaseapp.com",
  projectId: "sentece-ai",
  storageBucket: "sentece-ai.firebasestorage.app",
  messagingSenderId: "565844003801",
  appId: "1:565844003801:web:78a999dcbe6702aebbe7c8",
  measurementId: "G-X1RDWFMSGC",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
