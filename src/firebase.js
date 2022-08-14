import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDErQgXXVV5MWVvgaskatFP8yjQHntKW48",
  authDomain: "realtime-chatapp-18360.firebaseapp.com",
  projectId: "realtime-chatapp-18360",
  storageBucket: "realtime-chatapp-18360.appspot.com",
  messagingSenderId: "868736755913",
  appId: "1:868736755913:web:629034957478fb825d0518",
};
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
export default app;
export { db };
