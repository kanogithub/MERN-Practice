import { useState } from 'react'
import PropTypes from 'prop-types'
import Card from './shared/Card'
import { FaTimes } from 'react-icons/fa'

function FeedbackItem({ item: { id, rating, text }, onDelete }) {

    return (
        <Card>
            <div className="num-display">{rating}</div>
            <button className='close' onClick={() => onDelete(id)}>
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