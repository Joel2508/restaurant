import firebase from 'firebase/app'
import 'firebase/firestore'


const firebaseConfig = {
  apiKey: "AIzaSyAuqPaZigFoLb80W4TMnxsSAFevJTFc1HA",
  authDomain: "restaurant-c1d02.firebaseapp.com",
  projectId: "restaurant-c1d02",
  storageBucket: "restaurant-c1d02.appspot.com",
  messagingSenderId: "1029353427413",
  appId: "1:1029353427413:web:5a644560d5d58af4b16d5c"
}

  export const firebaseApp = firebase.initializeApp(firebaseConfig)