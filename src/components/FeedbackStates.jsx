import PropTypes from 'prop-types'

function FeedbackStates({ feedback }) {
    const averge = Math.round(feedback.reduce((total, fb) => {
        return total += fb.rating
    }, 0) / feedback.length * 10) / 10

    return (
        <div className='feedback-stats'>
            <h4>{feedback.length} Reviews</h4>
            <h4>Average Rating: {isNaN(averge) ? '0' : averge}</h4>
        </div>
    )
}

FeedbackStates.propTypes = {
    feedback: PropTypes.array.isRequired
}

export default FeedbackStates

