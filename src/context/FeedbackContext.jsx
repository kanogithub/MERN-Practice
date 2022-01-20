import { createContext, useState } from 'react'
import { v4 as uuidv4 } from 'uuid'
import FeedbackData from '../data/FeedbackData'

export const FeedbackContext = createContext()

export const FeedbackProvider = ({ children }) => {
	const [feedback, setFeedback] = useState(FeedbackData)
	const [feedbackEdit, setFeedbackEdit] = useState({
		item: {},
		edit: false,
	})

	// delete feedback
	const deleteFeedback = (id) => {
		if (window.confirm('Are you sure you want to delete?')) {
			setFeedback(feedback.filter((fb) => fb.id !== id))
		}
	}
	// add feedback
	const addNewFeedback = (newfeedback) => {
		newfeedback.id = uuidv4()

		setFeedback([newfeedback, ...feedback])
	}
	// edit feedback
	const editFeedback = (item) => {
		setFeedbackEdit({
			item,
			edit: true,
		})
	}
	// update feedback
	const updateFeedback = (updatedItem) => {
		if (!feedbackEdit.edit) return

		setFeedback(
			feedback.map((it) => (it.id === feedbackEdit.item.id ? { ...it, ...updatedItem } : it))
		)
		setFeedbackEdit({ item: {}, edit: false })
	}

	return (
		<FeedbackContext.Provider
			value={{
				feedback,
				feedbackEdit,
				deleteFeedback,
				addNewFeedback,
				editFeedback,
				updateFeedback,
			}}>
			{children}
		</FeedbackContext.Provider>
	)
}
