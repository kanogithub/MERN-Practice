// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
	apiKey: 'AIzaSyCyVyP5dTa45e1uppjdU40ufpmLBc-_kzg',
	authDomain: 'house-marketplace-app-a116a.firebaseapp.com',
	projectId: 'house-marketplace-app-a116a',
	storageBucket: 'house-marketplace-app-a116a.appspot.com',
	messagingSenderId: '169875952081',
	appId: '1:169875952081:web:253b236cecb4a20fce50f0',
}

initializeApp(firebaseConfig)
export const db = getFirestore()
