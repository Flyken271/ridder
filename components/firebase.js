// firebaseClient.ts

import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore'


    var firebaseConfig = {
        apiKey: "AIzaSyCV7exMa9ym17d4Mo0NDEztiSEKA-1Hjsw",
        authDomain: "lucid-7f393.firebaseapp.com",
        projectId: "lucid-7f393",
        storageBucket: "lucid-7f393.appspot.com",
        messagingSenderId: "145251018136",
        appId: "1:145251018136:web:5f74dedaf47de0acf0f7ed",
        measurementId: "G-MF6QYMCWGJ"
      };
      // Initialize Firebase
if(!firebase.apps.length){
    firebase.initializeApp(firebaseConfig)
}

export default firebase;