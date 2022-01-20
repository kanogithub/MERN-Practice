import PropTypes from 'prop-types'
import Card from './shared/Card'
import { FaTimes, FaEdit } from 'react-icons/fa'
import { useContext } from 'react'
import { FeedbackContext } from '../context/FeedbackContext'

function FeedbackItem({ item }) {
	const { deleteFeedback, editFeedback } = useContext(FeedbackContext)
	const { id, rating, text } = item

	return (
		<Card>
			<div className='num-display'>{rating}</div>
			<button className='edit' onClick={() => editFeedback(item)}>
				<FaEdit color='purple' />
			</button>
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
