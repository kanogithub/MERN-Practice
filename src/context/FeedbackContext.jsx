import { createContext, useState } from 'react'
import { v4 as uuidv4 } from 'uuid'
import FeedbackData from '../data/FeedbackData'

export const FeedbackContext = createContext()

export const FeedbackProvider = ({ children }) => {
	const [feedback, setFeedback] = useState(FeedbackData)
	const deleteFeedback = (id) => {
		if (window.confirm('Are you sure you want to delete?')) {
			setFeedback(feedback.filter((fb) => fb.id !== id))
		}
	}
	const addNewFeedback = (newfeedback) => {
		newfeedback.id = uuidv4()

		setFeedback([newfeedback, ...feedback])
	}

	return (
		<FeedbackContext.Provider
			value={{
				feedback,
				deleteFeedback,
				addNewFeedback,
			}}>
			{children}
		</FeedbackContext.Provider>
	)
}
