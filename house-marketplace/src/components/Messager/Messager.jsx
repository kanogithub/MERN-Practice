import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { ReactComponent as Mail } from '../../assets/svg/mail.svg'
import MessageBox from './MessageBox'
import { doc, updateDoc, collection, getDocs, query, where, orderBy } from 'firebase/firestore'
import { db } from '../../firebase.config'

function Messager({ userId }) {
	const [message, setMessage] = useState(0)
	const [shoudOpen, setShoudOpen] = useState(false)

	const navigate = useNavigate()

	const onOpen = () => {
		!shoudOpen && setShoudOpen(true)
	}

	const onRequestClose = () => {
		setShoudOpen(false)
	}

	const onRequestContact = async (listingRef, senderRef) => {
		setShoudOpen(false)
		navigate(`contact/${listingRef}/${senderRef}`)

		try {
			const messageRef = collection(db, 'messages')

			const q = query(
				messageRef,
				where('listingRef', '==', listingRef),
				where('senderRef', '==', senderRef),
				where('isRead', '==', false),
				orderBy('timestamp', 'desc')
			)

			// Execute query for updating
			const querySnap = await getDocs(q)
			const updatedMessages = []
			querySnap.forEach((snap) => updatedMessages.push(snap.id))
			const updateExecute = updatedMessages.map((messageId) =>
				updateDoc(doc(db, 'messages', messageId), { isRead: true })
			)

			await Promise.all(updateExecute)
		} catch (error) {
			console.error(error.message)
		} finally {
			fetchUnreadMessages()
		}
	}

	const fetchUnreadMessages = async () => {
		try {
			const messageRef = collection(db, 'messages')

			const q = query(
				messageRef,
				where('receiverRef', '==', userId),
				where('isRead', '==', false),
				orderBy('timestamp', 'desc')
			)

			// Execute query
			const querySnap = await getDocs(q)

			setMessage(querySnap.docs.length)
		} catch (error) {
			console.error(error.message)
		}
	}

	useEffect(() => {
		if (userId) fetchUnreadMessages()
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])

	return (
		<div className='menu-messager' onClick={onOpen} data-tips='Messages'>
			{message > 0 && <span className='menu-messager-number'>{message}</span>}
			<Mail width='24px' height='24px' fill={shoudOpen ? '#3AAA99' : '#f2f4f8'} />
			<MessageBox
				shoudOpen={shoudOpen}
				onRequestClose={onRequestClose}
				onRequestContact={onRequestContact}
				userId={userId}
			/>
		</div>
	)
}

export default Messager
