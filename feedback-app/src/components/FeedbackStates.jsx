import { useContext } from 'react'
import { FeedbackContext } from '../context/FeedbackContext'

function FeedbackStates() {
	const { feedback } = useContext(FeedbackContext)
	const averge =
		Math.round(
			(feedback.reduce((total, fb) => {
				return (total += fb.rating)
			}, 0) /
				feedback.length) *
				10
		) / 10

	return (
		<div className='feedback-stats'>
			<h4>{feedback.length} Reviews</h4>
			<h4>Average Rating: {isNaN(averge) ? '0' : averge}</h4>
		</div>
	)
}

export default FeedbackStates
