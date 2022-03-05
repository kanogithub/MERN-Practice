import PropTypes from 'prop-types'
import { FaUserAlt } from 'react-icons/fa'
import { Link } from 'react-router-dom'
import { v4 as uuidv4 } from 'uuid'

function UserSearchFloat({ users = [], handleClick }) {
	return (
		<div className='float-layer'>
			{users.map((user) => (
				<label key={uuidv4()}>
					<Link className='w-full' to={`/user/${user}`}>
						<span className='flex w-full pr-40 items-center input-lg px-4 bg-gray-100 hover:bg-gray-300 text-black cursor-pointer'>
							<FaUserAlt className='mr-3' />
							{user}
						</span>
					</Link>
				</label>
			))}
		</div>
	)
}

UserSearchFloat.propTypes = {
	users: PropTypes.array,
}

export default UserSearchFloat
