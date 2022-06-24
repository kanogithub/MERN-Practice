import { useState, useEffect } from 'react'
import { getAuth } from 'firebase/auth'
import { doc, updateDoc } from 'firebase/firestore'
import { db } from '../firebase.config'

function ProfileContactSet({ byEmail, byPhone, phoneNumber }) {
	const [onEmail, setOnEmail] = useState(false)
	const [onPhone, setOnPhone] = useState(false)
	const [loading, setLoading] = useState(true)
	const auth = getAuth()

	const phoneVerified = phoneNumber ? true : false

	const handleClick = async (e) => {
		let setColumn = null
		let setData = null
		if (e.target.id === 'email') {
			setOnEmail((preValue) => !preValue)
			setColumn = 'byEmail'
			setData = onEmail
		}
		if (e.target.id === 'phone') {
			setOnPhone((preValue) => !preValue)
			setColumn = 'byPhone'
			setData = onPhone
		}

		try {
			// update for firestore
			await updateDoc(doc(db, 'users', auth.currentUser.uid), {
				[setColumn]: !setData,
			})
		} catch (error) {
			console.log(error)
		}
	}

	useEffect(() => {
		setOnEmail(byEmail)
		setOnPhone(byPhone)
		setLoading(false)
	}, [byEmail, byPhone])

	return (
		<div className='profileCard'>
			<div className='profileContact'>Other Contact</div>
			<div className='profileContact-items'>
				<div
					className={`profileContact-item ${
						auth.currentUser.emailVerified ? '' : 'disabled'
					}`}>
					<span className='switch-title'>Email</span>
					<div className='switch-container'>
						{!loading && (
							<span
								id='email'
								className={`switch ${onEmail ? 'on' : 'off'}`}
								onClick={auth.currentUser.emailVerified ? handleClick : undefined}
								{...(!auth.currentUser.emailVerified && {
									'data-tips': 'Please Verify Email',
								})}>
								{onEmail ? 'On' : 'Off'}
							</span>
						)}
					</div>
				</div>
				<div className={`profileContact-item ${phoneVerified ? '' : 'disabled'}`}>
					<span className='switch-title'>Phone</span>
					<div className='switch-container'>
						{!loading && (
							<span
								id='phone'
								className={`switch ${onPhone ? 'on' : 'off'}`}
								onClick={phoneVerified ? handleClick : undefined}
								{...(!phoneVerified && {
									'data-tips': 'Please Verify Phone',
								})}>
								{onPhone ? 'On' : 'Off'}
							</span>
						)}
					</div>
				</div>
			</div>
		</div>
	)
}

export default ProfileContactSet
