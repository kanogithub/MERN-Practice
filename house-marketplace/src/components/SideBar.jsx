import { useNavigate, useLocation } from 'react-router-dom'
import { ReactComponent as OfferIcon } from '../assets/svg/localOfferIcon.svg'
import { ReactComponent as ExploreIcon } from '../assets/svg/exploreIcon.svg'
import { ReactComponent as PersonOutlineIcon } from '../assets/svg/personOutlineIcon.svg'

function SideBar() {
	const navigate = useNavigate()
	const location = useLocation()

	const pathMatchRoute = (route) => {
		if (route === location.pathname) {
			return true
		}
	}

	return (
		<div>
			<nav className='navbarNav'>
				<ul className='navbarListItems'>
					<li
						className={`navbarListItem${pathMatchRoute('/') ? ' actived' : ''}`}
						onClick={() => navigate('/')}>
						<ExploreIcon
							fill={pathMatchRoute('/') ? '#2c2c2c' : '#cfcfcf'}
							width='36px'
							height='36px'
						/>
						<p style={{ color: pathMatchRoute('/') ? '#2c2c2c' : '#cfcfcf' }}>
							Explore
						</p>
					</li>
					<li
						className={`navbarListItem${pathMatchRoute('/offers') ? ' actived' : ''}`}
						onClick={() => navigate('/offers')}>
						<OfferIcon
							fill={pathMatchRoute('/offers') ? '#2c2c2c' : '#cfcfcf'}
							width='36px'
							height='36px'
						/>
						<p style={{ color: pathMatchRoute('/offers') ? '#2c2c2c' : '#cfcfcf' }}>
							Offer
						</p>
					</li>
					<li
						className={`navbarListItem${pathMatchRoute('/profile') ? ' actived' : ''}`}
						onClick={() => navigate('/profile')}>
						<PersonOutlineIcon
							fill={pathMatchRoute('/profile') ? '#2c2c2c' : '#cfcfcf'}
							width='36px'
							height='36px'
						/>
						<p style={{ color: pathMatchRoute('/profile') ? '#2c2c2c' : '#cfcfcf' }}>
							Profile
						</p>
					</li>
				</ul>
			</nav>
		</div>
	)
}

export default SideBar
