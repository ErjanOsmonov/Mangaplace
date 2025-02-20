import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBjQHo_Eq2H2UC7gEybwtWm74PVusv3fQA",
  authDomain: "manga-marketplace.firebaseapp.com",
  projectId: "manga-marketplace",
  storageBucket: "manga-marketplace.appspot.com",
  messagingSenderId: "52626779577",
  appId: "1:52626779577:web:feaab949b91ca2ff501a68",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
