import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {
  getAuth,
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { getFirestore, doc, setDoc } from "firebase/firestore";
import { toast } from "react-toastify";

const env = import.meta.env;

const firebaseConfig = {
  apiKey: env.VITE_FIREBASE_API_KEY,
  authDomain: env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: env.VITE_FIREBASE_APP_ID,
  measurementId: env.VITE_FIREBASE_MEASUREMENT_ID,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const db = getFirestore(app);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
export { doc, setDoc };

export const createAuthUserWithEmailAndPassword = async (
  fullName,
  email,
  password,
  confirmPassword,
  setLoading
) => {
  if (
    fullName != "" &&
    email != "" &&
    password != "" &&
    confirmPassword != ""
  ) {
    if (password == confirmPassword) {
      try {
        const userCredential = await createUserWithEmailAndPassword(
          auth,
          email,
          password
        );
        const user = userCredential.user;
        console.log(user);
        // createDoc(user);
        return true;
      } catch (error) {
        const errorCode = error.code;
        const errorMessage = error.message;
        toast.error(errorMessage);
        setLoading(false);
        return false;
      }
    } else {
      toast.error("Password and Confirm password don't match");
      setLoading(false);
      return false;
    }
  } else {
    toast.error("All fields are mandatory");
    setLoading(false);
    return false;
  }
};

export const signInAuthUserWithEmailAndPassword = async (email, password) => {
  if (email != "" && password != "") {
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;
      console.log("user logged in", user);
      return true;
    } catch (error) {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log(errorMessage);
      toast.error(errorMessage);
      return false;
    }
  } else {
    toast.error("All fields are mandatory");
    return false;
  }
};

//create user doc
function createDoc() {
  //make sure the userdoc with uid doesnot exists then only create userdoc otherwise dont create it.
}
