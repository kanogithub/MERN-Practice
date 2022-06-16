import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { db } from '../../firebase.config'
import { getDocs, collection, query, where, orderBy, limit } from 'firebase/firestore'
import MessageItem from './MessageItem'

function MessageBox({ shoudOpen, onRequestClose, userId }) {
	const [messages, setMessages] = useState([])

	useEffect(() => {
		try {
			const fetchMessages = async () => {
				const q = query(
					collection(db, 'messages'),
					where('receiverRef', '==', userId),
					orderBy('timestamp', 'desc'),
					limit(6)
				)

				const querySnap = await getDocs(q)

				const messages = []
				querySnap.forEach((snap) => {
					messages.push({ messageId: snap.id, ...snap.data() })
				})

				setMessages(messages)
			}

			shoudOpen && fetchMessages()
		} catch (err) {
			console.error(err.message)
		}
	}, [shoudOpen, userId])

	return (
		shoudOpen && (
			<>
				<div className='menu-messager-overlay' onClick={onRequestClose}></div>
				<div className='menu-messager-box' onClick={onRequestClose}>
					{messages.length > 0
						? messages.map((message) => (
								<MessageItem key={message.messageId} {...message} />
						  ))
						: 'Not message so far.'}
					<Link to='message' className='moreMessage-link'>
						More Messages...
					</Link>
				</div>
			</>
		)
	)
}

export default MessageBox
