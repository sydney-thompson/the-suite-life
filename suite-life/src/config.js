import Firebase from "firebase";
// For Firebase JS SDK v7.20.0 and later, measurementId is optional 
const firebaseConfig = {
    apiKey: "AIzaSyB3ExgzPoyG8VBKacy2roP21UbaZn_n7YU",
    authDomain: "the-suite-life-s21.firebaseapp.com",
    databaseURL: "https://the-suite-life-s21-default-rtdb.firebaseio.com",
    projectId: "the-suite-life-s21",
    storageBucket: "the-suite-life-s21.appspot.com",
    messagingSenderId: "907884719847",
    appId: "1:907884719847:web:368c02318fab1e43f2bc42",
    measurementId: "G-C2BEW5XM9H"
  };

// source: https://blog.logrocket.com/storing-retrieving-data-react-native-apps-firebase/
const app = Firebase.initializeApp(firebaseConfig);
export const db = app.database();