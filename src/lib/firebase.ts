
import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAlmSDc9mhz06DUYahHfkSwpHnCoQvfgFo",
  authDomain: "dairymix-id63c.firebaseapp.com",
  projectId: "dairymix-id63c",
  storageBucket: "dairymix-id63c.firebasestorage.app",
  messagingSenderId: "843685770616",
  appId: "1:843685770616:web:d209017d58fd66c717448d",
};

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const auth = getAuth(app);
const db = getFirestore(app);

export { app, auth, db };
