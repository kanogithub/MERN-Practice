import { useLocation, Navigate } from 'react-router-dom'
import UserResults from '../components/users/UserResults'
import UserSearch from '../components/users/UserSearch'

function Home() {
	const { search } = useLocation()
	const querySearch = new URLSearchParams(search).get('user')

	if (querySearch) return <Navigate to={`/user/${querySearch}`} />

	return (
		<div className='fade'>
			<UserSearch />
			<UserResults />
		</div>
	)
}

export default Home
