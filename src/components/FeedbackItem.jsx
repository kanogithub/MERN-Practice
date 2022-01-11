import { useState } from 'react'
import PropTypes from 'prop-types'
import Card from './shared/Card'
import { FaTimes } from 'react-icons/fa'

function FeedbackItem({ item: { id, rating: rate, text: txt }, handleDelete }) {
    const [rating, setRating] = useState(rate)
    const [text, setText] = useState(txt)

    return (
        <Card>
            <div className="num-display">{rating}</div>
            <button className='close' onClick={() => handleDelete(id)}>
                <FaTimes color='purple' />
            </button>
            <div className="text-display">{text}</div>
        </Card >
    )
}

FeedbackItem.propTypes = {
    item: PropTypes.object.isRequired,
}

export default FeedbackItem