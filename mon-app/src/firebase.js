import firebase from "firebase/app"
import "firebase/firestore"



var firebaseConfig = {
    apiKey: "AIzaSyBYiDMv8XSawi5X1EnbyXbu3viIxk8H-pA",
    authDomain: "crud-react-fadaa.firebaseapp.com",
    projectId: "crud-react-fadaa",
    storageBucket: "crud-react-fadaa.appspot.com",
    messagingSenderId: "552751097051",
    appId: "1:552751097051:web:1cfcf31191bdf0ba04d8fe"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);


export { firebase };