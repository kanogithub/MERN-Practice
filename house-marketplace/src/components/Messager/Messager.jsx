import { useState, useEffect } from 'react'
import { ReactComponent as Mail } from '../../assets/svg/mail.svg'
import MessageBox from './MessageBox'
import { collection, getDocs, query, where, orderBy } from 'firebase/firestore'
import { db } from '../../firebase.config'

function Messager({ userId }) {
	const [message, setMessage] = useState(0)
	const [shoudOpen, setShoudOpen] = useState(false)

	const onOpen = () => {
		setShoudOpen(true)
	}

	const onRequestClose = () => {
		setShoudOpen(false)
	}

	useEffect(() => {
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

		if (userId) fetchUnreadMessages()

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])

	return (
		<div className='menu-messager'>
			{message > 0 && <span className='menu-messager-number'>{message}</span>}
			<Mail
				width='24px'
				height='24px'
				fill={shoudOpen ? '#3AAA99' : '#f2f4f8'}
				onClick={onOpen}
			/>
			<MessageBox shoudOpen={shoudOpen} onRequestClose={onRequestClose} userId={userId} />
		</div>
	)
}

export default Messager
