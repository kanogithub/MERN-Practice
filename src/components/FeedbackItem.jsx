import PropTypes from 'prop-types'
import Card from './shared/Card'
import { FaTimes } from 'react-icons/fa'
import { useContext } from 'react'
import { FeedbackContext } from '../context/FeedbackContext'

function FeedbackItem({ item: { id, rating, text } }) {
	const { deleteFeedback } = useContext(FeedbackContext)

	return (
		<Card>
			<div className='num-display'>{rating}</div>
			<button className='close' onClick={() => deleteFeedback(id)}>
				<FaTimes color='purple' />
			</button>
			<div className='text-display'>{text}</div>
		</Card>
	)
}

FeedbackItem.propTypes = {
	item: PropTypes.object.isRequired,
}

export default FeedbackItem
