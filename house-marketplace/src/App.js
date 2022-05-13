import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import Split from './layouts/Split'
import Menu from './components/Menu'
import SideBar from './components/SideBar'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import PrivateRoute from './components/PrivateRoute'
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
						<Route path='/contact/:landlordId' element={<Contact />}></Route>
					</Routes>
				</Split>
				<Navbar />
			</Router>
			<Footer />
			<ToastContainer />
		</>
	)
}

export default App
