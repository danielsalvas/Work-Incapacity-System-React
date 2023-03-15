// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBtbpWtpKevAdReIFsyjq0LBJlJLlmf9WE",
  authDomain: "work-incapacity-system.firebaseapp.com",
  projectId: "work-incapacity-system",
  storageBucket: "work-incapacity-system.appspot.com",
  messagingSenderId: "846269422837",
  appId: "1:846269422837:web:1eec0fac5618efd075b9bc"
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

export default firebaseApp