import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Header from './components/Header'
import FeedbackList from './components/FeedbackList'
import FeedbackStates from './components/FeedbackStates'
import FeedbackForm from './components/FeedbackForm'
import AboutPage from './pages/AboutPage'
import AboutIconLink from './components/AboutIconLink'

import { FeedbackProvider } from './context/FeedbackContext'

import Post from './components/Post'
import QueryParamsExample from './components/QMemo'

function App() {
	console.log('somthing changed')
	return (
		<FeedbackProvider>
			<Router>
				<Header text={''} bgColor={'blue'} />
				<div className='container'>
					<Routes>
						<Route
							path='/'
							element={
								<>
									<FeedbackForm />
									<FeedbackStates />
									<FeedbackList />
								</>
							}></Route>

						<Route path='/about' element={<AboutPage />} />

						{/* This part just for testing */}
						<Route path='/post/:id' element={<Post />} />
						<Route path='/qmemo/*' element={<QueryParamsExample />} />
					</Routes>

					<AboutIconLink />
				</div>
			</Router>
		</FeedbackProvider>
	)
}

export default App
