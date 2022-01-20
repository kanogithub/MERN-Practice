import { useState, useContext, useEffect } from 'react'
import { FeedbackContext } from '../context/FeedbackContext'
import Card from './shared/Card'
import Button from './shared/Button'
import RatingSelect from './RatingSelect'

function FeedbackForm() {
	const { addNewFeedback, updateFeedback, feedbackEdit } = useContext(FeedbackContext)
	const [text, setText] = useState('')
	const [rating, setRating] = useState(10)
	const [btnDisabled, setBtnDisabeld] = useState(true)
	const [message, setMessage] = useState('')

	const handleTextChange = (e) => {
		const txtContent = e.target.value
		setText(txtContent)

		if (txtContent.trim().length === 0) {
			setBtnDisabeld(true)
			setMessage(null)
		}
		if (txtContent.trim().length >= 10) {
			setBtnDisabeld(false)
			setMessage(null)
		}
		if (txtContent.trim().length > 0 && txtContent.trim().length < 10) {
			setBtnDisabeld(true)
			setMessage('Text must be at least 10 characters')
		}
	}
	const handleSubmit = (e) => {
		e.preventDefault()
		if (text.length < 10) return

		const { edit: isEdit } = feedbackEdit

		const newFeedback = {
			rating,
			text,
		}

		if (!isEdit) addNewFeedback(newFeedback)
		if (isEdit) updateFeedback(newFeedback)
		setText('')
	}

	useEffect(() => {
		const { text } = feedbackEdit.item
		if (feedbackEdit.edit) {
			setBtnDisabeld(false)
			setText(text)
		}
	}, [feedbackEdit])

	return (
		<Card>
			<form onSubmit={handleSubmit}>
				<h2>How would you rate your service with us?</h2>
				<RatingSelect select={(rating) => setRating(rating)}></RatingSelect>
				<div className='input-group'>
					<input
						type='text'
						placeholder='Write a review'
						onChange={handleTextChange}
						value={text}
					/>
					<Button type='submit' isDisabled={btnDisabled}>
						Send
					</Button>
				</div>

				{message && <div className='message'>{message}</div>}
			</form>
		</Card>
	)
}

export default FeedbackForm
