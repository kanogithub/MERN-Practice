import { createContext, useState, useEffect } from 'react'
// import { v4 as uuidv4 } from 'uuid'

export const FeedbackContext = createContext()

export const FeedbackProvider = ({ children }) => {
	const [isLoading, setIsLoading] = useState(true)
	const [feedback, setFeedback] = useState([])
	const [feedbackEdit, setFeedbackEdit] = useState({
		item: {},
		edit: false,
	})

	useEffect(() => {
		fetchFeedbackData()
	}, [])

	// fetch feedback
	const fetchFeedbackData = async () => {
		const response = await fetch('/feedback?_sort=id&_order=desc')
		const data = await response.json()

		setFeedback(data)
		setIsLoading(false)
	}

	// delete feedback
	const deleteFeedback = async (id) => {
		if (window.confirm('Are you sure you want to delete?')) {
			await fetch(`/feedback/${id}`, {
				method: 'DELETE',
			})

			setFeedback(feedback.filter((fb) => fb.id !== id))
		}
	}
	// add feedback
	const addNewFeedback = async (newfeedback) => {
		const response = await fetch('/feedback', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(newfeedback),
		})

		const data = await response.json()
		setFeedback([data, ...feedback])
	}
	// edit feedback
	const editFeedback = (item) => {
		setFeedbackEdit({
			item,
			edit: true,
		})
	}
	// update feedback
	const updateFeedback = async (updatedItem) => {
		if (!feedbackEdit.edit) return

		const fbID = feedbackEdit.item.id
		const response = await fetch(`/feedback/${fbID}`, {
			method: 'PUT',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(updatedItem),
		})
		const data = await response.json()

		setFeedback(feedback.map((it) => (it.id === fbID ? { ...it, ...data } : it)))
		setFeedbackEdit({ item: {}, edit: false })
	}

	return (
		<FeedbackContext.Provider
			value={{
				feedback,
				feedbackEdit,
				isLoading,
				deleteFeedback,
				addNewFeedback,
				editFeedback,
				updateFeedback,
			}}>
			{children}
		</FeedbackContext.Provider>
	)
}
