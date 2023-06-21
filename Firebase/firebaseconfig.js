import { variables } from '@/Firebase/variables'
import { getAuth,GoogleAuthProvider } from 'firebase/auth';
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: variables.FIREBASE_API_KEY,
  authDomain: variables.FIREBASE_AUTH_DOMAIN,
  projectId: variables.FIREBASE_PROJECT_ID,
  storageBucket: variables.FIREBASE_STORAGE_BUCKET,
  messagingSenderId: variables.FIREBASE_MESSAFING_SENDER_ID,
  appId: variables.FIREBASE_APP_ID,
  measurementId: variables.FIREBASE_MEASUREMENT_ID
};


export const app = initializeApp(firebaseConfig);
export const auth=getAuth(app);
export const googleProvider = new GoogleAuthProvider();
export const db = getFirestore(app);
// const analytics = getAnalytics(app);