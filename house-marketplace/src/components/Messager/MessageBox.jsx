function MessageBox({ shoudOpen, onRequestClose }) {
	return (
		shoudOpen && (
			<>
				<div className='menu-messager-overlay' onClick={onRequestClose}></div>
				<div className='menu-messager-box'></div>
			</>
		)
	)
}

export default MessageBox
