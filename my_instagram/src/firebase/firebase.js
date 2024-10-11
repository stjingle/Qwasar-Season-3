import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
	apiKey: "AIzaSyCDurqXW83KiaNZDAbMWPYfUDcVJ1-XPK8",
	authDomain: "my-instag-13b1f.firebaseapp.com",
	projectId: "my-instag-13b1f",
	storageBucket: "my-instag-13b1f.appspot.com",
	messagingSenderId: "57804708448",
	appId: "1:57804708448:web:b8d4f9559dbd5a692e0105"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const firestore = getFirestore(app);
const storage = getStorage(app);

export { app, auth, firestore, storage };

