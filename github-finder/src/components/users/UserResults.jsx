import { useEffect, useState } from 'react'
import Spinner from '../layout/Spinner'
import UserItem from './UserItem'

function UserResults() {
	const [users, setUsers] = useState([])
	const [loading, setLoading] = useState(true)

	useEffect(() => {
		fetchUsers()
	}, [])

	const fetchUsers = async () => {
		const respone = await fetch(`${process.env.REACT_APP_GITHUB_URL}/users`, {
			headers: {
				Authorization: `token ${process.env.REACT_APP_GITHUB_TOKEN}`,
			},
		})

		const data = await respone.json()

		setUsers(data)
		setLoading(false)
	}

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
