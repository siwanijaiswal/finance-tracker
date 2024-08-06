import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {
  getAuth,
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { getFirestore, doc, getDoc, setDoc } from "firebase/firestore";
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
        await createUserDocumentFromAuth(user, fullName, setLoading);
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

export const signInAuthUserWithEmailAndPassword = async (
  email,
  password,
  setLoading
) => {
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
      setLoading(false);
      return false;
    }
  } else {
    toast.error("All fields are mandatory");
    setLoading(false);
    return false;
  }
};

export const createUserDocumentFromAuth = async (
  user,
  fullName,
  setLoading
) => {
  setLoading(true);
  if (!user) return;

  const userDocRef = doc(db, "users", user.uid);
  const userData = await getDoc(userDocRef);

  if (!userData.exists()) {
    const { displayName, email } = user;
    const createdAt = new Date();

    try {
      await setDoc(userDocRef, {
        fullName: user.displayName ? user.displayName : fullName,
        email: user.email,
        photoURL: user.photoURL ? user.photoURL : "",
        createdAt,
      });
      toast.success("Doc created");
      setLoading(false);
    } catch (error) {
      toast.error(error.message);
      setLoading(false);
    }
  }
  //if userdata exists then return userDocRef
  // return userDocRef;
  else {
    toast.error("doc already exists");
    setLoading(false);
  }
};
