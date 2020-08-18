import firebase from "firebase/app";
import "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyCZdxgoH2rxdibwR_D0QNYwuZIQjRg5K7U",
  authDomain: "moribus-7cce1.firebaseapp.com",
  databaseURL: "https://moribus-7cce1.firebaseio.com",
  projectId: "moribus-7cce1",
  storageBucket: "moribus-7cce1.appspot.com",
  messagingSenderId: "542180202990",
  appId: "1:542180202990:web:e50783ffc726602e3616ff",
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export default firebase;
