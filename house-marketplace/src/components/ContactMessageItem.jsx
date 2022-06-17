function ContactMessageItem(props = {}) {
	const { senderRef, message, senderName, timestamp, ownerId } = props

	const date = timestamp ? new Date(timestamp.seconds * 1000).toLocaleTimeString() : null
	const time = timestamp ? new Date(timestamp.seconds * 1000).toLocaleDateString() : null

	const isOwner = senderRef === ownerId

	return (
		<div className={`contactMessage-item ${isOwner ? 'owner' : 'sender'}`}>
			<div className='message-sender'>
				<span className='user-name'>{senderName}</span>
				<span className='message-time'>{`${date} - ${time}`}</span>
			</div>
			<div className='message-content'>{message}</div>
		</div>
	)
}

export default ContactMessageItem
