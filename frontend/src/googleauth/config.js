// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { GoogleAuthProvider, getAuth} from 'firebase/auth'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBqMImKjGUr8t8BrsAO55rZvoAIk70zIh4",
  authDomain: "moments-fe617.firebaseapp.com",
  projectId: "moments-fe617",
  storageBucket: "moments-fe617.appspot.com",
  messagingSenderId: "408787594176",
  appId: "1:408787594176:web:dde1548c85cb52fc70b625",
  measurementId: "G-2THCJ9J6DE"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app)
const provider=new GoogleAuthProvider();
export {auth,provider}