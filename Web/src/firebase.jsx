
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getFunctions } from 'firebase/functions';



const firebaseConfig = {
// apiKey: process.env.REACT_APP_FIREBASE_KEY,
apiKey: "AIzaSyDyCvXs6DdN_uKnNa3tTGKPynFFxU_H1_A",




  authDomain: "safetynet-d1d2b.firebaseapp.com",
  databaseURL: "https://safetynet-d1d2b-default-rtdb.firebaseio.com",
  projectId: "safetynet-d1d2b",
  storageBucket: "safetynet-d1d2b.appspot.com",
  messagingSenderId: "118203416189",
  appId: "1:118203416189:web:c9cfd706bfcd8a9555bb14",
  measurementId: "G-9EVM4X7MKN"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);

export const db = getFirestore(app);
export const auth = getAuth();
// export const storage = getStorage(app);
export const functions = getFunctions(app);


