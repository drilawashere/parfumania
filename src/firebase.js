import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'
import { getStorage } from 'firebase/storage'
import { getAuth } from 'firebase/auth' // Import Firebase Auth

const firebaseConfig = {
  apiKey: 'AIzaSyBkOdjeUHrN5X5uzRtSz2ZDVc2bSNG9pis',
  authDomain: 'parfumania-web.firebaseapp.com',
  projectId: 'parfumania-web',
  storageBucket: 'parfumania-web-admini',
  messagingSenderId: '693746064714',
  appId: '1:693746064714:web:eb41ce56cde0338dc1f5b3',
  measurementId: 'G-GC3HED56FF',
}

const app = initializeApp(firebaseConfig)
const db = getFirestore(app)
const storage = getStorage(app)
const auth = getAuth(app) // Initialize Firebase Auth

export { db, storage, auth }
