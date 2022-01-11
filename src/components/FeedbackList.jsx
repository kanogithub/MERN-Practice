import PropTypes from 'prop-types'
import FeedbackItem from "./FeedbackItem"

function FeedbackList({ feedback, handleDelete }) {
    if (!feedback || feedback.length === 0) return 'No Feedback yet!'

    return (
        <div className='feedback-list'>
            {feedback.map(item => (
                <FeedbackItem key={item.id} item={item} handleDelete={handleDelete} />
            ))}
        </div>
    )
}

// eslint-disable-next-line no-unused-expressions
FeedbackList.propTypes = {
    feedback: PropTypes.array.isRequired,
}

export default FeedbackList
