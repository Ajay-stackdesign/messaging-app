// import firebase from 'firebase/compat/app';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

export const auth = firebase.initializeApp({
    apiKey: "AIzaSyBh3ZtcIx854Hksh8td-6Myf6sqgA6MEB8",
    authDomain: "chat-404a1.firebaseapp.com",
    projectId: "chat-404a1",
    storageBucket: "chat-404a1.appspot.com",
    messagingSenderId: "863072335699",
    appId: "1:863072335699:web:e0df30a3686fdc7a4bd3a6",
    measurementId: "G-KFGG9DQ38S"
}).auth();

