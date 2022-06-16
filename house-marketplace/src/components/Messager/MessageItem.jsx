import { Link } from 'react-router-dom'

function MessageItem(props) {
	const { isRead, senderRef, listingName, message, senderName, timestamp } = props

	const date = new Date(timestamp.seconds * 1000).toLocaleTimeString()
	const time = new Date(timestamp.seconds * 1000).toLocaleDateString()

	return (
		<div className={`message-item ${isRead ? '' : 'message-unread'}`}>
			<Link to={`contact/${senderRef}`}>
				<div className='message-item-user'>
					<span className='user-name'>{senderName}</span>
					<span className='message-time'>{`${date} - ${time}`}</span>
				</div>
				<div className='message-item-title'>
					<b>{listingName}</b>
				</div>
				<div className='message-item-content'>{message}</div>
			</Link>
		</div>
	)
}

export default MessageItem
