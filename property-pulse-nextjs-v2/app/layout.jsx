import '@/assets/styles/global.css'
import Footer from '@/components/Footer'
import Navbar from '@/components/Navbar'
import AuthProvider from '@/components/AuthProvider'
import { GlobalContextProvider } from '@/context/GlobalContext'
import { ToastContainer } from 'react-toastify'
import UnreadMessageCount from '@/components/UnreadMessageCount'
import 'react-toastify/dist/ReactToastify.css'
import 'photoswipe/dist/photoswipe.css'

export const metadata = {
	title: 'Property Pulse',
	keywords: 'rental, property, real estate',
	description: 'Find the perfect rental properties',
}

const MainLayout = ({ children }) => {
	return (
		<AuthProvider>
			<GlobalContextProvider>
				<html>
					<head>
						<script src="https://unpkg.com/react-scan/dist/auto.global.js" async />
					</head>
					<body>
						<Navbar>
							<UnreadMessageCount />
						</Navbar>
						<main>{children}</main>
						<Footer />
						<ToastContainer />
					</body>
				</html>
			</GlobalContextProvider>
		</AuthProvider>
	)
}

export default MainLayout
