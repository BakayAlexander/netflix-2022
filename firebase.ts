// Import the functions you need from the SDKs you need
import { initializeApp, getApp, getApps } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'
import { getAuth } from 'firebase/auth'

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBeWUHRIi5GcRtG-gdsCqDgKYXUYvl0u4I",
  authDomain: "netflix-2022-41bee.firebaseapp.com",
  projectId: "netflix-2022-41bee",
  storageBucket: "netflix-2022-41bee.appspot.com",
  messagingSenderId: "1031180065752",
  appId: "1:1031180065752:web:e5e101da7c29a5e5b530ad"
}

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp()
const db = getFirestore()
const auth = getAuth()

export default app
export { auth, db }