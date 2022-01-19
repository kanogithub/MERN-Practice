import { useState } from 'react'
import { v4 as uuidv4 } from 'uuid'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Header from './components/Header'
import FeedbackList from './components/FeedbackList'
import FeedbackStates from './components/FeedbackStates'
import FeedbackForm from './components/FeedbackForm'
import AboutPage from './components/pages/AboutPage'
import AboutIconLink from './components/AboutIconLink'

import Post from './components/Post'
import QueryParamsExample from './components/QMemo'

import FeedbackData from './data/FeedbackData'

function App() {
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
		<Router>
			<Header text={''} bgColor={'blue'} />
			<div className='container'>
				<Routes>
					<Route
						path='/'
						element={
							<>
								<FeedbackForm handleAdd={addNewFeedback} />
								<FeedbackStates feedback={feedback} />
								<FeedbackList feedback={feedback} handleDelete={deleteFeedback} />
							</>
						}></Route>

					<Route path='/about' element={<AboutPage />} />
					<Route path='/post/:id' element={<Post />} />
					<Route path='/qmemo' element={<QueryParamsExample />} />
					<Route path='/qmemo/account' element={<QueryParamsExample />} />
				</Routes>

				<AboutIconLink />
			</div>
		</Router>
	)
}

export default App
