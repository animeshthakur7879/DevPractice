import {getAuth, GoogleAuthProvider} from 'firebase/auth'

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBmp9BvPI9cHAyTddQ5H1nJ0a5iTMdndsA",
  authDomain: "devpractice-v2.firebaseapp.com",
  projectId: "devpractice-v2",
  storageBucket: "devpractice-v2.firebasestorage.app",
  messagingSenderId: "823546932911",
  appId: "1:823546932911:web:490aa8a3719b4f233cae5a"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth(app)

const provider = new GoogleAuthProvider()

export {auth , provider}