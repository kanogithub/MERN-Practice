import { useState, useEffect } from 'react'
import { getAuth } from 'firebase/auth'
import { doc, updateDoc } from 'firebase/firestore'
import { db } from '../firebase.config'

function ProfileContactSet({ byEmail }) {
	const [onEmail, setOnEmail] = useState(false)
	const auth = getAuth()

	const handleClick = async () => {
		try {
			// update for firestore
			await updateDoc(doc(db, 'users', auth.currentUser.uid), {
				byEmail: !onEmail,
			})
		} catch (error) {
			console.log(error)
		}

		setOnEmail((preValue) => !preValue)
	}

	useEffect(() => {
		setOnEmail(byEmail)
	}, [byEmail])

	return (
		<div className='profileCard'>
			<div className='profileContact'>Other Contact</div>
			<div
				className={`profileContact-item ${
					auth.currentUser.emailVerified ? '' : 'disabled'
				}`}>
				<span className='switch-title'>Email</span>
				<div className='switch-container'>
					<span
						className={`switch ${onEmail ? 'on' : 'off'}`}
						onClick={auth.currentUser.emailVerified ? handleClick : undefined}
						{...(!auth.currentUser.emailVerified && {
							'data-tips': 'Please Verify Email',
						})}>
						{onEmail ? 'On' : 'Off'}
					</span>
				</div>
			</div>
		</div>
	)
}

export default ProfileContactSet
