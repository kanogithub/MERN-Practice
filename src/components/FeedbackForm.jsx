import { useState } from 'react'
import PropTypes from 'prop-types'
import Card from './shared/Card'
import Button from './shared/Button'
import RatingSelect from './RatingSelect'

function FeedbackForm({ handleAdd }) {
    const [text, setText] = useState('')
    const [rating, setRating] = useState(10)
    const [btnDisabled, setBtnDisabeld] = useState(true)
    const [message, setMessage] = useState('')
    const handleTextChange = (e) => {
        const txtContent = e.target.value.trim()
        setText(txtContent)

        if (txtContent.length === 0) {
            setBtnDisabeld(true)
            setMessage(null)
        }
        if (txtContent.length >= 10) {
            setBtnDisabeld(false)
            setMessage(null)
        }
        if (txtContent.length > 0 && txtContent.length < 10) {
            setBtnDisabeld(true)
            setMessage('Text must be at least 10 characters')
        }
    }
    const handleSubmit = (e) => {
        e.preventDefault()
        if (text.length < 10) return

        const newFeedback = {
            rating: rating,
            text: text,
        }

        handleAdd(newFeedback)
        setText('')
    }

    return (
        <Card>
            <form onSubmit={handleSubmit}>
                <h2>How would you rate your service with us?</h2>
                <RatingSelect select={(rating) => setRating(rating)}></RatingSelect>
                <div className='input-group'>
                    <input type="text" placeholder='Write a review' onChange={handleTextChange} />
                    <Button type='submit' isDisabled={btnDisabled}>Send</Button>
                </div>

                {message && <div className='message'>{message}</div>}
            </form>
        </Card>
    )
}

FeedbackForm.propTypes = {
    addFeedback: PropTypes.func
}

export default FeedbackForm
