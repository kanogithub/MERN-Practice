function MessageItem(props) {
	const {
		isRead,
		senderRef,
		listingRef,
		listingName,
		message,
		senderName,
		timestamp,
		onRequestContact,
	} = props

	const date = timestamp ? new Date(timestamp.seconds * 1000).toLocaleTimeString() : null
	const time = timestamp ? new Date(timestamp.seconds * 1000).toLocaleDateString() : null

	return (
		<div
			className={`message-item ${isRead ? 'message-read' : 'message-unread'}`}
			onClick={() => onRequestContact(listingRef, senderRef)}>
			<div className='message-item-user'>
				<span className='user-name'>{senderName}</span>
				<span className='message-time'>{`${date} - ${time}`}</span>
			</div>
			<div className='message-item-title'>
				<b>{listingName}</b>
			</div>
			<div className='message-item-content'>{message}</div>
		</div>
	)
}

export default MessageItem
