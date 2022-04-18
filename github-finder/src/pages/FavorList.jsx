import UserItem from '../components/users/UserItem'

function FavorList({ nodeRef }) {
	const favorList = JSON.parse(localStorage.getItem('userFavoriteList')) ?? []
	return (
		<div className='fade' ref={nodeRef}>
			<h1 className='text-6xl mb-8 text-gray-50'>Favorite List</h1>
			<div className='grid grid-cols-1 gap-8 xl:grid-cols-4 lg:grid-cols-3 md:gridcols-2'>
				{favorList.length === 0 && (
					<p className='ml-1 text-lg'>You don't build a List yet.</p>
				)}
				{favorList.length > 0 &&
					favorList.map((user) => <UserItem key={user.id} user={user} />)}
			</div>
		</div>
	)
}

export default FavorList
