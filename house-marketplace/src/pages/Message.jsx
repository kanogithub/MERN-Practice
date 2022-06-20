import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { getAuth } from 'firebase/auth'
import {
	collection,
	getDocs,
	query,
	where,
	orderBy,
	limit,
	updateDoc,
	doc,
	startAfter,
} from 'firebase/firestore'
import { db } from '../firebase.config'
import MessageItem from '../components/Messager/MessageItem'
import RenderIntersectionList from '../layouts/RenderIntersectionList'
import Spinner from '../components/Spinner'

function Message() {
	const loadLimitation = 5
	const [lastFetchedListing, setLastFetchedListing] = useState(null)
	const [loading, setLoading] = useState(true)
	const [msgCate, setMsgCate] = useState('receive')
	const refList = { receive: 'receiverRef', send: 'senderRef' }

	const navigate = useNavigate()
	const auth = getAuth()

	const onFetchMessages = async () => {
		try {
			const q = query(
				collection(db, 'messages'),
				where(refList[msgCate], '==', auth.currentUser.uid),
				orderBy('timestamp', 'desc'),
				limit(loadLimitation)
			)

			// Execute query
			const querySnap = await getDocs(q)

			const messages = []
			querySnap.forEach((snap) => messages.push({ id: snap.id, data: { ...snap.data() } }))

			setLastFetchedListing(querySnap.docs[querySnap.docs.length - 1])
			setLoading(false)

			return messages
		} catch (error) {
			console.error(error.message)
		}
	}

	const onFetchMoreMessages = async () => {
		try {
			const q = query(
				collection(db, 'messages'),
				where(refList[msgCate], '==', auth.currentUser.uid),
				orderBy('timestamp', 'desc'),
				startAfter(lastFetchedListing),
				limit(loadLimitation)
			)

			// Execute query
			const querySnap = await getDocs(q)

			const messages = []
			querySnap.forEach((snap) => messages.push({ id: snap.id, data: { ...snap.data() } }))

			setLastFetchedListing(
				querySnap.docs.length > 0 ? querySnap.docs[querySnap.docs.length - 1] : null
			)

			return messages
		} catch (error) {
			console.error(error.message)
		}

		return []
	}

	const isActive = (cate) => (msgCate === cate ? 'msgCateActive' : '')
	const handleCateChange = (cate) => {
		setLoading(true)
		setMsgCate(cate)
	}

	const WrappedMessageItem = ({ messages }) => {
		const { senderRef, receiverRef, senderName, receiverName } = messages
		let _messages = null

		if (senderRef === auth.currentUser.uid) {
			const _receiverRef = senderRef
			const _senderRef = receiverRef
			const _senderName = `To: ${receiverName}`

			_messages = {
				...messages,
				senderRef: _senderRef,
				receiverRef: _receiverRef,
				senderName: _senderName,
			}
		} else {
			const _senderName = `From: ${senderName}`

			_messages = {
				...messages,
				senderName: _senderName,
			}
		}

		const onRequestContact = async (listingRef, senderRef) => {
			navigate(`/contact/${listingRef}/${senderRef}`)

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
			}
		}

		return (
			<MessageItem {...{ ..._messages, isRead: false }} onRequestContact={onRequestContact} />
		)
	}

	return (
		<>
			{loading && <Spinner />}
			<div className='category'>
				<header>
					<p className='pageHeader'>Messages</p>
				</header>

				<div className='msgCate'>
					<span
						className={`msgCateSelector ${isActive('receive')}`}
						onClick={() => handleCateChange('receive')}>
						Receives
					</span>
					<span
						className={`msgCateSelector ${isActive('send')}`}
						onClick={() => handleCateChange('send')}>
						Send
					</span>
				</div>

				<main key={msgCate}>
					<ul className={`msgListings ${msgCate}`}>
						<RenderIntersectionList
							getInitialDate={onFetchMessages}
							onRequestDataIntersection={onFetchMoreMessages}
							itemComponent={WrappedMessageItem}
							resourceName='messages'
							visibleOffset={-130}
						/>
					</ul>
				</main>

				<br />
				<br />

				{!lastFetchedListing && <p className='noMore'>No More</p>}
			</div>
		</>
	)
}

export default Message
