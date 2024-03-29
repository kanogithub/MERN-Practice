import { useLocation, useNavigate, useSearchParams } from 'react-router-dom'
import { getAuth, signInWithPopup, GoogleAuthProvider, FacebookAuthProvider } from 'firebase/auth'
import { doc, setDoc, getDoc, serverTimestamp } from 'firebase/firestore'
import { db } from '../firebase.config'
import { toast } from 'react-toastify'
import googleIcon from '../assets/svg/googleIcon.svg'
import facebookIcon from '../assets/svg/facebookIcon.svg'

function OAuth() {
	// eslint-disable-next-line no-unused-vars
	const [searchParams, setSearchParams] = useSearchParams()

	const navigate = useNavigate()
	const location = useLocation()

	const onSocialClick = async (socialProvider) => {
		const getProvider = {
			google: GoogleAuthProvider,
			facebook: FacebookAuthProvider,
		}

		try {
			const auth = getAuth()
			const provider = new getProvider[socialProvider]()
			const result = await signInWithPopup(auth, provider)
			const user = result.user

			// Check for user
			const docRef = doc(db, 'users', user.uid)
			const docSnap = await getDoc(docRef)

			// If does not exist, set new user
			if (!docSnap.exists()) {
				await setDoc(docRef, {
					name: user.displayName,
					email: user.email,
					timestamp: serverTimestamp(),
				})
			}

			const path = searchParams.get('listing') ? searchParams.get('listing') : '/'
			navigate(path, { replace: true })
		} catch (error) {
			console.log(error)
			toast.error('Could not authorize with Google')
		}
	}

	return (
		<div className='socialLogin'>
			<p>Sign {location.pathname === '/sign-up' ? 'Up' : 'In'} With</p>
			<div className='socialIconDivGroup'>
				<button className='socialIconDiv' onClick={() => onSocialClick('google')}>
					<img src={googleIcon} className='socialIconImg' alt='google' />
				</button>
				<button className='socialIconDiv' onClick={() => onSocialClick('facebook')}>
					<img src={facebookIcon} className='socialIconImg' alt='google' />
				</button>
			</div>
		</div>
	)
}

export default OAuth
