import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import Split from './layouts/Split'
import Menu from './components/Menu'
import SideBar from './components/SideBar'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import PrivateRoute from './layouts/PrivateRoute'
import Explore from './pages/Explore'
import Category from './pages/Category'
import Offers from './pages/Offers'
import Profile from './pages/Profile'
import SignIn from './pages/SignIn'
import SignUp from './pages/SignUp'
import ForgotPassword from './pages/ForgotPassword'
import CreateListing from './pages/CreateListing'
import EditListing from './pages/EditListing'
import Listing from './pages/Listing'
import Contact from './pages/Contact'
import Message from './pages/Message'

import SwiperCore, { Navigation, Pagination, Scrollbar, A11y } from 'swiper'
SwiperCore.use([Navigation, Pagination, Scrollbar, A11y])

function App() {
	return (
		<>
			<Router>
				<Menu />
				<Split>
					<SideBar />
					<Routes>
						<Route path='/' element={<Explore />} />
						<Route path='/category/:categoryName' element={<Category />} />
						<Route path='/offers' element={<Offers />} />
						<Route path='/profile' element={<PrivateRoute />}>
							<Route path='/profile' element={<Profile />} />
						</Route>
						<Route path='/sign-in' element={<SignIn />} />
						<Route path='/sign-up' element={<SignUp />} />
						<Route path='/forgot-password' element={<ForgotPassword />} />
						<Route path='/create-listing' element={<CreateListing />} />
						<Route path='/edit-listing/:id' element={<EditListing />} />
						<Route path='/category/:categoryName/:listingId' element={<Listing />} />
						<Route path='/contact' element={<PrivateRoute />}>
							<Route path='/contact/:listingId/:senderId' element={<Contact />} />
						</Route>
						<Route path='/message' element={<PrivateRoute />}>
							<Route path='/message' element={<Message />} />
						</Route>
						<Route path='*' element={<Navigate to='/' />} />
					</Routes>
				</Split>
				<Navbar />
				<Footer />
			</Router>
			<ToastContainer />
		</>
	)
}

export default App
