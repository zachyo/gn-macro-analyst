// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getAuth, signInWithPopup, GoogleAuthProvider, signOut } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  // apiKey: "AIzaSyADQ5EGqy2S43fqeZn4Ulq6u56udSa0jhI",
  apiKey : process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: "gnmacroanalyst-gnappllc.firebaseapp.com",
  projectId: "gnmacroanalyst-gnappllc",
  storageBucket: "gnmacroanalyst-gnappllc.appspot.com",
  messagingSenderId: "150972514776",
  appId: "1:150972514776:web:26ca1c328f7810eb1eb2ad",
  measurementId: "G-ZCH92RW4VR",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);


// Initialize Firebase Auth provider
const provider = new GoogleAuthProvider();
provider.setCustomParameters({
  prompt: "select_account ",
});
export const auth = getAuth(app);
export const signInWithGooglePopup = () => signInWithPopup(auth, provider);
export const signOutOfGoogle = () => signOut(auth)
// Initialize Cloud Firestore and get a reference to the service
export const db = getFirestore(app);
  
const analytics = getAnalytics(app);
