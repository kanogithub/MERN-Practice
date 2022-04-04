import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

function UserItem({ user: { login, avatar_url } }) {
	return (
		<div className='card shadow-md compact side bg-base-100 card-profile'>
			<div className='flex-row items-center space-x-4 card-body'>
				<div>
					<div className='avatar'>
						<div className='rounded-full shadow w-14 h-14'>
							<img src={avatar_url} alt='avatar' />
						</div>
					</div>
				</div>
				<div>
					<h2
						className='card-title'
						style={{ marginTop: '-0.5rem', marginBottom: '0.2rem' }}>
						{login}
					</h2>
					<Link
						className='text-base-content text-opacity-40 profile-cta'
						to={`/user/${login}`}>
						Vist Profile.
					</Link>
				</div>
			</div>
		</div>
	)
}

UserItem.propTypes = {
	user: PropTypes.object.isRequired,
}

export default UserItem
