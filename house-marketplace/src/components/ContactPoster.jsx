import { useState, useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { getAuth } from 'firebase/auth'
import { doc, getDoc, addDoc, collection, serverTimestamp } from 'firebase/firestore'
import { db } from '../firebase.config'
import { toast } from 'react-toastify'
import { ReactComponent as Mail } from '../assets/svg/mail.svg'

function ContactPoster(props) {
	const { userRef: landlordId, name: listingName, listingId } = props

	const [message, setMessage] = useState('')
	const [sending, setSending] = useState(false)
	const [landlord, setLandlord] = useState(null)

	const auth = getAuth()
	const navigate = useNavigate()
	const location = useLocation()

	useEffect(() => {
		const getLandload = async () => {
			const docRef = doc(db, 'users', landlordId)
			const docSnap = await getDoc(docRef)

			if (docSnap.exists()) {
				setLandlord(docSnap.data())
			} else {
				toast.error('Could not get landlord data')
			}
		}

		getLandload()
	}, [landlordId])

	const onChange = (e) => {
		setMessage(e.target.value)
	}

	const onSubmit = async (e) => {
		e.preventDefault()

		if (auth.currentUser === null) {
			const confirm = window.confirm('Please Sign In to continue')
			confirm && navigate(`/sign-in?listing=${location.pathname}`)
		} else {
			if (message.length < 10) {
				toast.error('Message did not send - Needs 10 more words.')
				return
			}

			setSending(true)
			const messageRef = {
				listingName,
				listingRef: listingId,
				receiverName: landlord.name,
				receiverRef: landlordId,
				senderName: auth.currentUser.displayName,
				senderRef: auth.currentUser.uid,
				message,
				isRead: false,
				timestamp: serverTimestamp(),
			}

			try {
				await addDoc(collection(db, 'messages'), messageRef)
				setMessage('')
				toast.success('Message Sent.')
			} catch (error) {
				toast.error('Message did not send proprably')
				console.log(error)
			}

			setSending(false)
		}
	}

	return (
		<div className='contactSection'>
			<header>
				<p className='pageHeader'>Contact Landlord</p>
			</header>

			{landlord !== null && (
				<main>
					<div className='contactLandlord'>
						<p className='landlordName'>
							Contact {landlord?.name}{' '}
							{landlord?.byEmail && (
								<a
									href={`mailto:${landlord.email}?Subject=${listingName}&body=${message}`}
									className='contactPoster-mail'>
									<Mail width='24px' height='24px' />
								</a>
							)}
						</p>
					</div>

					<form className='messageForm' onSubmit={onSubmit}>
						<div className='messageDiv'>
							<label htmlFor='message' className='messageLabel'>
								Message
							</label>
							<textarea
								name='message'
								id='message'
								cols='30'
								rows='10'
								className='textarea'
								value={message}
								onChange={onChange}
								disabled={auth.currentUser ? false : true}></textarea>
						</div>

						<button className={`primaryButton btn-send ${sending ? 'sending' : ''}`}>
							Send Message
						</button>
					</form>
				</main>
			)}
		</div>
	)
}

export default ContactPoster
