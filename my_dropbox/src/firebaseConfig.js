// import firebase from "firebase/compat/app"
// import "firebase/compat/auth"
// import "firebase/compat/firestore"
// import "firebase/compat/storage"

// const app = firebase.initializeApp({
//   apiKey: "AIzaSyDW6uMd_jBOTc1jPw1KRRs4vJENLLRDYzE",
//   authDomain: "my-dropbox-9e251.firebaseapp.com",
//   projectId: "my-dropbox-9e251",
//   storageBucket: "my-dropbox-9e251.appspot.com",
//   messagingSenderId: "500723904892",
//   appId: "1:500723904892:web:d779ccdbd4b9022def34f9",
//   measurementId: "G-VP78H1CVKF",
// })

// const firestore = app.firestore()


// export const db = {
//   folders: firestore.collection("folders"),
//   files: firestore.collection("files"),
//   formatDoc: doc => {
//     return { id: doc.id, ...doc.data() }
//   },
//   getCurrentTimestamp: firebase.firestore.FieldValue.serverTimestamp,
// }
// export const storage = app.storage()
// export const auth = app.auth()
// export default app


import firebase from "firebase/compat/app"
import "firebase/compat/auth"
import "firebase/compat/firestore"
import "firebase/compat/storage"

const firebaseApp = firebase.initializeApp({
  apiKey: "AIzaSyDW6uMd_jBOTc1jPw1KRRs4vJENLLRDYzE",
    authDomain: "my-dropbox-9e251.firebaseapp.com",
    projectId: "my-dropbox-9e251",
    storageBucket: "my-dropbox-9e251.appspot.com",
    messagingSenderId: "500723904892",
    appId: "1:500723904892:web:d779ccdbd4b9022def34f9",
    measurementId: "G-VP78H1CVKF",
})

const firestore = firebaseApp.firestore()

export const db = {
  folders: firestore.collection("folders"),
  files: firestore.collection("files"),
  formatDoc: doc => ({ id: doc.id, ...doc.data() }),
  getCurrentTimestamp: firebase.firestore.FieldValue.serverTimestamp,
}

export const storage = firebaseApp.storage()
export const auth = firebaseApp.auth()

export default firebaseApp
