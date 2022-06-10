import { Link, useNavigate, useLocation } from 'react-router-dom'
import { ReactComponent as HomeIcon } from '../assets/svg/homeIcon.svg'
import { getAuth } from 'firebase/auth'
import { useAuthStatus } from '../hooks/useAuthStatus'
import Messager from './Messager/Messager'

function Menu() {
	const { loggedIn, setLoggedIn } = useAuthStatus()
	const auth = getAuth()
	const navigate = useNavigate()
	const location = useLocation()

	const onLogout = () => {
		auth.signOut()
		setLoggedIn(false)

		if (location.pathname === '/profile') navigate('/sign-in')
		else navigate('/')
	}

	const onLogin = () => {
		navigate('/sign-in')
	}

	return (
		<div className='menu'>
			<div className='container'>
				<div className='menu-wrapper'>
					<Link to='/'>
						<div className='logo'>
							<HomeIcon fill={'#fcfcfc'} width='28px' height='28px' />
							<h2>Fake Houses</h2>
						</div>
					</Link>
					<div>
						{loggedIn && <Messager userId={auth.currentUser?.uid} />}
						{loggedIn && (
							<Link to='/profile' className='menu-user'>
								<span>{auth.currentUser?.displayName}</span>
							</Link>
						)}
						<button
							type='button'
							className='logOut'
							onClick={loggedIn ? onLogout : onLogin}>
							{loggedIn ? 'Logout' : 'Sing In'}
						</button>
					</div>
				</div>
			</div>
		</div>
	)
}

export default Menu
