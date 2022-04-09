import { BrowserRouter as Router, Route } from 'react-router-dom'
import Navbar from './components/layout/Navbar'
import Footer from './components/layout/Footer'
import Alert from './components/layout/Alert'
import Home from './pages/Home'
import About from './pages/About'
import NotFound from './pages/NotFound'
import User from './pages/User'
import FavorList from './pages/FavorList'
import TransitionRoutes from './components/layout/TransitionRoutes'
import { GithubProvider } from './context/github/GithubContext'
import { AlertProvider } from './context/alert/AlertContext'
import { GithubReposProvider } from './context/github/GithubReposContext'

function App() {
	return (
		<GithubProvider>
			<AlertProvider>
				<GithubReposProvider>
					<Router>
						<div className='flex flex-col justify-between h-screen'>
							<Navbar />
							<main className='container mx-auto pb-12 px-48 3xl:px-6 flex-auto'>
								<Alert />
								<TransitionRoutes>
									<Route path='/' element={<Home />}></Route>
									<Route path='/about' element={<About />}></Route>
									<Route path='/notfound' element={<NotFound />}></Route>
									<Route path='/*' element={<NotFound />}></Route>
									<Route path='user/:id' element={<User />}></Route>
									<Route path='/favoriteList' element={<FavorList />}></Route>
								</TransitionRoutes>
							</main>
							<Footer />
						</div>
					</Router>
				</GithubReposProvider>
			</AlertProvider>
		</GithubProvider>
	)
}

export default App
