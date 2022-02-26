import { useEffect, useContext } from 'react'
import Spinner from '../layout/Spinner'
import UserItem from './UserItem'
import GithubContext from '../../context/github/GithubContext'

function UserResults() {
	const { loading, users } = useContext(GithubContext)

	if (loading) return <Spinner />
	else if (!Array.isArray(users)) return <h3>No results!</h3>
	else
		return (
			<div className='grid grid-cols-1 gap-8 xl:grid-cols-4 lg:grid-cols-3 md:gridcols-2'>
				{users.map((user) => (
					<UserItem key={user.id} user={user} />
				))}
			</div>
		)
}

export default UserResults
