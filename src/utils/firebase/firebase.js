import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

import { getFirestore, doc, setDoc } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCR7fa1F49GUw5J0t200Tu4uAIoOcDUBaI",
  authDomain: "financely-tracker-1dff2.firebaseapp.com",
  projectId: "financely-tracker-1dff2",
  storageBucket: "financely-tracker-1dff2.appspot.com",
  messagingSenderId: "194120317626",
  appId: "1:194120317626:web:af4a4e39c4b6ef93cd2083",
  measurementId: "G-M5ZFMRF2G8",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const db = getFirestore(app);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
export { doc, setDoc };
