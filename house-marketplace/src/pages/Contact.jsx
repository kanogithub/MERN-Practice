import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import {
	doc,
	getDoc,
	collection,
	getDocs,
	query,
	where,
	orderBy,
	addDoc,
	serverTimestamp,
} from 'firebase/firestore'
import { db } from '../firebase.config'
import { getAuth } from 'firebase/auth'
import { toast } from 'react-toastify'
import bedIcon from '../assets/svg/bedIcon.svg'
import bathtubIcon from '../assets/svg/bathtubIcon.svg'
import LazyImg from '../components/LazyImg'
import ContactMessageItem from '../components/ContactMessageItem'

function Contact() {
	const [message, setMessage] = useState('')
	const [listing, setListing] = useState(null)
	const [messageList, setMessageList] = useState([])

	const auth = getAuth()
	const { listingId, senderId } = useParams()

	const toDollarString = (number) => {
		return `$${number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}`
	}

	useEffect(() => {
		const getListingData = async () => {
			const docSnap = await getDoc(doc(db, 'listings', listingId))

			if (docSnap.exists()) {
				setListing(docSnap.data())
			} else {
				toast.error('Could not get listing property data')
			}
		}

		const getMessageList = async () => {
			const queryRef = query(
				collection(db, 'messages'),
				where('listingRef', '==', listingId),
				where('senderRef', 'in', [senderId, auth.currentUser.uid]),
				orderBy('timestamp', 'asc')
			)
			const docSnap = await getDocs(queryRef)
			const messageList = []
			docSnap.forEach((snap) => messageList.push({ id: snap.id, ...snap.data() }))
			setMessageList(messageList)
		}

		try {
			getListingData()
			getMessageList()
		} catch (err) {
			console.error(err.message)
		}
	}, [listingId, senderId])

	const onChange = (e) => {
		setMessage(e.target.value)
	}

	const submitHandler = async (e) => {
		e.preventDefault()

		const messageRef = {
			listingName: listing.name,
			listingRef: listingId,
			receiverName: messageList[0].senderName,
			receiverRef: senderId,
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
	}

	return (
		<div className='pageContainer'>
			<header>
				<p className='pageHeader'>Contact History</p>
			</header>

			<main style={{ marginBottom: '15vh' }}>
				{/* realstate advertisement info */}
				{listing && (
					<div className='categoryListing contact'>
						<LazyImg
							src={listing.imageUrls[0]}
							alt={listing.name}
							className={'spinner'}
						/>

						<div className='categoryListingDetails'>
							<p className='categoryListingLocation'>{listing.location}</p>
							<p className='categoryListingName'>{listing.name}</p>
							<p className='categoryListingPrice'>
								{listing.offer
									? toDollarString(listing.discountedPrice)
									: toDollarString(listing.regularPrice)}
								{listing.type === 'rent' && ' / Week'}
							</p>
							<div className='categoryListingInfoDiv'>
								<img src={bedIcon} alt='bed' />
								<p className='categoryListingInfoText'>
									{listing.bedrooms > 1
										? `${listing.bedrooms} Bedrooms`
										: '1 Bedroom'}
								</p>
								<img src={bathtubIcon} alt='bath' />
								<p className='categoryListingInfoText'>
									{listing.bathrooms > 1
										? `${listing.bathrooms} Bathrooms`
										: '1 Bathroom'}
								</p>
							</div>
						</div>
					</div>
				)}

				{/* contact history */}
				<h2>Contact Messages</h2>
				<div className='contact-history'>
					{messageList &&
						messageList.map((message) => (
							<ContactMessageItem
								key={message.id}
								{...message}
								ownerId={auth.currentUser.uid}
							/>
						))}
				</div>

				{/* contact form */}
				<form className='messageForm contact' onSubmit={submitHandler}>
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

					<button className='primaryButton'>Send Message</button>
				</form>
			</main>
		</div>
	)
}

export default Contact
