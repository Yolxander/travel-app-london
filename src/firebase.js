 import firebase from "firebase/app";
 import "firebase/database";

 let config = {
     apiKey: "AIzaSyBfu7XeFq8ACv0iiJiClYcOvXjJT-CViuc",
     authDomain: "vue-crud-f82f3.firebaseapp.com",
     projectId: "vue-crud-f82f3",
     storageBucket: "vue-crud-f82f3.appspot.com",
     messagingSenderId: "514399567037",
     appId: "1:514399567037:web:3c2b3b75bab530b2b9cbd4"
 };

 firebase.initializeApp(config);

 export default firebase.database();