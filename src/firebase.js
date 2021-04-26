import firebase from 'firebase'
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyAQ5fnceSSZtC7DOmVBA9or60M7CpKEhgo",
    authDomain: "what-s-app-clone-c2e0a.firebaseapp.com",
    projectId: "what-s-app-clone-c2e0a",
    storageBucket: "what-s-app-clone-c2e0a.appspot.com",
    messagingSenderId: "932521754309",
    appId: "1:932521754309:web:068b2ae684e78eef55faac",
    measurementId: "G-JCCD2FFM73"
  };

const firebaseApp = firebase.initializeApp(firebaseConfig)
const db = firebaseApp.firestore()
const auth = firebase.auth()
const provider = new firebase.auth.GoogleAuthProvider()

export {auth,provider};
export default db