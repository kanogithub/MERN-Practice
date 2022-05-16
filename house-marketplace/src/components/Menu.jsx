import { Link, useNavigate, useLocation } from 'react-router-dom'
import { ReactComponent as HomeIcon } from '../assets/svg/homeIcon.svg'
import { getAuth } from 'firebase/auth'
import { useAuthStatus } from '../hooks/useAuthStatus'

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
						{loggedIn && (
							<span className='menu-user'>{auth.currentUser?.displayName}</span>
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
