import UserItem from '../components/users/UserItem'

function FavorList() {
	const favorList = JSON.parse(localStorage.getItem('userFavoriteList')) ?? []
	return (
		<div className='fade'>
			<h1 class='text-6xl mb-8 text-gray-50'>Favorite List</h1>
			<div className='grid grid-cols-1 gap-8 xl:grid-cols-4 lg:grid-cols-3 md:gridcols-2'>
				{favorList.map((user) => (
					<UserItem key={user.id} user={user} />
				))}
			</div>
		</div>
	)
}

export default FavorList
