import { initializeApp } from "firebase/app";

import  { getFirestore } from '@firebase/firestore'
const firebaseConfig = {
    apiKey: "AIzaSyAsCxBwv1nHmEMXCHLu4Ds5fIESfE3Ynlw",
    authDomain: "todo-crud-3706d.firebaseapp.com",
    projectId: "todo-crud-3706d",
    storageBucket: "todo-crud-3706d.appspot.com",
    messagingSenderId: "897753375744",
    appId: "1:897753375744:web:670f64eb1689a1b330e4e5"
};

const app = initializeApp(firebaseConfig);

export const database = getFirestore(app)