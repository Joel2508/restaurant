import firebase from 'firebase/app'
import 'firebase/firestore'


const  firebaseConfig = {
    apiKey: "AIzaSyAH3gAj2eDu6TTlZnQZrPsqS6BBVUmwn44",
    authDomain: "crud-d8448.firebaseapp.com",
    projectId: "crud-d8448",
    storageBucket: "crud-d8448.appspot.com",
    messagingSenderId: "871039027209",
    appId: "1:871039027209:web:c708ac739704425f1a50d8"
  }

  export const firebaseApp = firebase.initializeApp(firebaseConfig)