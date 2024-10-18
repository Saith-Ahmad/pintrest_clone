// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCOie98SgfH0H-Mu3WmJ-cB_CVbTjuDEHc",
  authDomain: "pintrest-clone-ad27c.firebaseapp.com",
  projectId: "pintrest-clone-ad27c",
  storageBucket: "pintrest-clone-ad27c.appspot.com",
  messagingSenderId: "497225827054",
  appId: "1:497225827054:web:5b8f629cf2687148bce9ff",
  measurementId: "G-2Y3T0JS6JF"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export default app;