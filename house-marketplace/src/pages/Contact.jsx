import { useState, useEffect } from 'react'
import { useParams, useSearchParams } from 'react-router-dom'
import { getAuth } from 'firebase/auth'
import { doc, getDoc } from 'firebase/firestore'
import { db } from '../firebase.config'
import { toast } from 'react-toastify'

function Contact() {
	const [message, setMessage] = useState('')
	const [landlord, setLandlord] = useState(null)

	const auth = getAuth()
	const { landlordId } = useParams()
	const [searchParams] = useSearchParams()

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

	return (
		<div className='pageContainer'>
			<header>
				<p className='pageHeader'>Contact History</p>
			</header>

			{landlord !== null && (
				<main>
					<div className='contactLandlord'>
						<p className='landlordName'>Contact {landlord?.name}</p>
					</div>

					<form className='messageForm'>
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
								onChange={onChange}></textarea>
						</div>

						{/* mailto and params */}
						<a
							href={`mailto:${landlord.email}?Subject=${searchParams.get(
								'listingName'
							)}&body=From ${auth.currentUser.displayName}%0D%0A${message}%0D%0A`}
							className='primaryButton'>
							Send Message
						</a>
					</form>
				</main>
			)}
		</div>
	)
}

export default Contact
