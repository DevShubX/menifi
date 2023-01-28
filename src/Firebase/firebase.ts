
import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth"
import {getStorage} from 'firebase/storage';
import {getFirestore} from 'firebase/firestore'
import {getDatabase} from 'firebase/database'
// const firebaseConfig = {
//   apiKey: "AIzaSyDCRyoYGxph9c7ue-De_z7194QNkCfBsQs",
//   authDomain: "menifi-dev.firebaseapp.com",
//   projectId: "menifi-dev",
//   storageBucket: "menifi-dev.appspot.com",
//   messagingSenderId: "433062195554",
//   appId: "1:433062195554:web:590504633f6a537210fc3b",
//   databaseURL : "https://menifi-dev-default-rtdb.firebaseio.com",
// };
const firebaseConfig = {
  apiKey: "AIzaSyC9uQWX0nkuqeJjUffcTcwWK-50EgGSGVk",
  authDomain: "menifi-prod.firebaseapp.com",
  databaseURL: "https://menifi-prod-default-rtdb.firebaseio.com",
  projectId: "menifi-prod",
  storageBucket: "menifi-prod.appspot.com",
  messagingSenderId: "95747403257",
  appId: "1:95747403257:web:a5efbc09c3c4d476176128"

};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const storage = getStorage();
export const db = getFirestore();
export const database = getDatabase();