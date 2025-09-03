// // Import the functions you need from the SDKs you need
// import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
// // TODO: Add SDKs for Firebase products that you want to use
// // https://firebase.google.com/docs/web/setup#available-libraries

// // Your web app's Firebase configuration
// // For Firebase JS SDK v7.20.0 and later, measurementId is optional
// const firebaseConfig = {
//   apiKey: "AIzaSyBL8HgBeNZZXHWdr8XvhMPbOG8l8vDAJJs",
//   authDomain: "task-84f60.firebaseapp.com",
//   projectId: "task-84f60",
//   storageBucket: "task-84f60.firebasestorage.app",
//   messagingSenderId: "140803722085",
//   appId: "1:140803722085:web:b416a48142ef9b6fa02f8c",
//   measurementId: "G-2Y697X36EG"
// };

// // Initialize Firebase
// const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);/


import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';


const firebaseConfig = {
  apiKey: "AIzaSyBL8HgBeNZZXHWdr8XvhMPbOG8l8vDAJJs",
  authDomain: "task-84f60.firebaseapp.com",
  projectId: "task-84f60",
  storageBucket: "task-84f60.firebasestorage.app",
  messagingSenderId: "140803722085",
  appId: "1:140803722085:web:b416a48142ef9b6fa02f8c",
  measurementId: "G-2Y697X36EG"
};


const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);