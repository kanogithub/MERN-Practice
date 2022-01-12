import { useState } from 'react'
import { v4 as uuidv4 } from 'uuid'
import Header from './components/Header'
import FeedbackList from './components/FeedbackList'
import FeedbackData from './data/FeedbackData'
import FeedbackStates from './components/FeedbackStates'
import FeedbackForm from './components/FeedbackForm'

function App() {
	const [feedback, setFeedback] = useState(FeedbackData)
	const deleteFeedback = (id) => {
		if (window.confirm('Are you sure you want to delete?')) {
			setFeedback(feedback.filter(fb => fb.id !== id))
		}
	}
	const addNewFeedback = (newfeedback) => {
		newfeedback.id = uuidv4()

		setFeedback([newfeedback, ...feedback])
	}

	return (
		<>
			<Header text={'Hello World'} bgColor={'blue'} />
			<div className="container">
				<FeedbackForm handleAdd={addNewFeedback} />
				<FeedbackStates feedback={feedback} />
				<FeedbackList feedback={feedback} handleDelete={deleteFeedback} />
			</div>
		</>
	)
}

export default App
