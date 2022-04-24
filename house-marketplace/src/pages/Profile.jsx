import { useEffect, useState } from 'react'
import { getAuth, updateProfile } from 'firebase/auth'
import { doc, updateDoc } from 'firebase/firestore'
import { db } from '../firebase.config'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'

function Profile() {
	const auth = getAuth()
	const [changeDetails, setChangeDetails] = useState(false)
	const [formData, setFormData] = useState({
		name: auth.currentUser.displayName,
		email: auth.currentUser.email,
	})

	const { name, email } = formData

	const navigate = useNavigate()

	const onLogout = () => {
		auth.signOut()
		navigate('/')
	}

	const onSubmit = async () => {
		try {
			if (auth.currentUser.displayName !== name) {
				// update for auth
				await updateProfile(auth.currentUser, {
					displayName: name,
				})

				// update for firestore
				const userRef = doc(db, 'users', auth.currentUser.uid)
				await updateDoc(userRef, {
					name,
				})

				toast.success('Profile has been updated')
			}
		} catch (error) {
			console.log(error)
			toast.error('Could not update profile details')
		}

		setChangeDetails(false)
	}

	const handleChangeDetails = () => {
		setChangeDetails(true)
	}

	const onChange = (e) =>
		setFormData((preValue) => ({ ...preValue, [e.target.id]: e.target.value }))

	return (
		<div className='profile'>
			<header className='profileHeader'>
				<p className='pageHeader'>My Profile</p>
				<button type='button' className='logOut' onClick={onLogout}>
					Logout
				</button>
			</header>

			<main>
				<div className='profileDetailsHeader'>
					<p className='profileDetailsText'>Personal Details</p>
					<p
						className='changePersonalDetails'
						onClick={changeDetails ? onSubmit : handleChangeDetails}>
						{changeDetails ? 'done' : 'change'}
					</p>
				</div>

				<div className='profileCard'>
					<form>
						<input
							type='text'
							id='name'
							value={name}
							className={!changeDetails ? 'profileName' : 'profileNameActive'}
							disabled={!changeDetails}
							onChange={onChange}
						/>
						<input
							type='email'
							id='email'
							value={email}
							className={!changeDetails ? 'profileEmail' : 'profileEmailActive'}
							disabled={!changeDetails}
							onChange={onChange}
						/>
					</form>
				</div>
			</main>
		</div>
	)
}

export default Profile
