import { Link } from 'react-router-dom'
import { ReactComponent as HomeIcon } from '../assets/svg/homeIcon.svg'

function Menu() {
	return (
		<div className='menu'>
			<div className='container'>
				<Link to='/'>
					<div className='logo'>
						<HomeIcon fill={'#fcfcfc'} width='28px' height='28px' />
						<h2>Fake Houses</h2>
					</div>
				</Link>
			</div>
		</div>
	)
}

export default Menu
