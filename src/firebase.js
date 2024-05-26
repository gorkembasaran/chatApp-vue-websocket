import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyCY6h70AQznSLGmy7pIE_12gg_T0Vbs5CM",
    authDomain: "chatapp-a4449.firebaseapp.com",
    databaseURL: "https://chatapp-a4449-default-rtdb.firebaseio.com",
    projectId: "chatapp-a4449",
    storageBucket: "chatapp-a4449.appspot.com",
    messagingSenderId: "890631065435",
    appId: "1:890631065435:web:86bdb8b508ec3c0a8fd47e",
    measurementId: "G-Q2BXX4MR3L"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };
