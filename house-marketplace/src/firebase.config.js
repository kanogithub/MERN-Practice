import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'

// Your web app's Firebase configuration
const firebaseConfig = {
	apiKey: 'AIzaSyCyVyP5dTa45e1uppjdU40ufpmLBc-_kzg',
	authDomain: 'house-marketplace-app-a116a.firebaseapp.com',
	projectId: 'house-marketplace-app-a116a',
	storageBucket: 'house-marketplace-app-a116a.appspot.com',
	messagingSenderId: '169875952081',
	appId: '1:169875952081:web:253b236cecb4a20fce50f0',
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)
export const db = getFirestore()
