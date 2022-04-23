import { useNavigate, useLocation } from 'react-router-dom'
import { ReactComponent as OfferIcon } from '../assets/svg/localOfferIcon.svg'
import { ReactComponent as ExploreIcon } from '../assets/svg/exploreIcon.svg'
import { ReactComponent as PersonOutlineIcon } from '../assets/svg/personOutlineIcon.svg'

function Navbar() {
	const navigate = useNavigate()
	const location = useLocation()

	const pathMatchRoute = (route) => {
		if (route === location.pathname) {
			return true
		}
	}

	return (
		<footer className='navbar'>
			<nav className='navbarNav'>
				<ul className='navbarListItems'>
					<li className='navbarListItem' onClick={() => navigate('/')}>
						<ExploreIcon
							fill={pathMatchRoute('/') ? '#2c2c2c' : '#afafaf'}
							width='36px'
							height='36px'
						/>
						<p style={{ color: pathMatchRoute('/') ? '#2c2c2c' : '#afafaf' }}>
							Explore
						</p>
					</li>
					<li className='navbarListItem'>
						<OfferIcon
							fill={pathMatchRoute('/offers') ? '#2c2c2c' : '#afafaf'}
							width='36px'
							height='36px'
							onClick={() => navigate('/offers')}
						/>
						<p style={{ color: pathMatchRoute('/offers') ? '#2c2c2c' : '#afafaf' }}>
							Offer
						</p>
					</li>
					<li className='navbarListItem'>
						<PersonOutlineIcon
							fill={pathMatchRoute('/profile') ? '#2c2c2c' : '#afafaf'}
							width='36px'
							height='36px'
							onClick={() => navigate('/profile')}
						/>
						<p style={{ color: pathMatchRoute('/profile') ? '#2c2c2c' : '#afafaf' }}>
							Profile
						</p>
					</li>
				</ul>
			</nav>
		</footer>
	)
}

export default Navbar
