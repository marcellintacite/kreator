// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAI, getGenerativeModel, GoogleAIBackend, InferenceMode } from "firebase/ai";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAXe7FQb5YVNmGjotq74EK2rRTPUmvt628",
  authDomain: "gospelfamily-b59a7.firebaseapp.com",
  projectId: "gospelfamily-b59a7",
  storageBucket: "gospelfamily-b59a7.appspot.com",
  messagingSenderId: "435080268433",
  appId: "1:435080268433:web:2de91e35c24bb9dedf0d30",
  measurementId: "G-5DBGYQY8F6"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const ai = getAI(app, { backend: new GoogleAIBackend() });

// Create a `GenerativeModel` instance
// Set the mode, for example to use on-device model when possible
export const model = getGenerativeModel(ai, { mode: InferenceMode.PREFER_IN_CLOUD });

