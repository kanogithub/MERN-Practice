import { useState, useEffect, useContext } from 'react'
import { MdFavoriteBorder, MdFavorite } from 'react-icons/md'
import AlertContext from '../../context/alert/AlertContext'

function UserFavorite({ login, avatar_url }) {
	const [isFavorite, setFavorite] = useState(false)
	const { setFloatAlert } = useContext(AlertContext)

	const handleChange = () => {
		const data = JSON.parse(localStorage.getItem('userFavoriteList')) ?? []
		const newData = !isFavorite
			? data.concat([{ id: login, login, avatar_url }])
			: data.filter((user) => user.login !== login)

		localStorage.setItem('userFavoriteList', JSON.stringify(newData))

		setFloatAlert(
			`${login} has been ${!isFavorite ? 'ADDED To' : 'REMOVED From'} Favorite List.`,
			!isFavorite
		)

		setFavorite((preState) => !preState)
	}

	useEffect(() => {
		const favorList = JSON.parse(localStorage.getItem('userFavoriteList'))

		if (favorList !== null) favorList.some((user) => user.login === login) && setFavorite(true)
	}, [login])

	return isFavorite ? (
		<MdFavorite
			className='text-2xl md:text-3xl text-error my-auto mr-2'
			onClick={handleChange}
		/>
	) : (
		<MdFavoriteBorder className='text-2xl md:text-3xl m-auto mr-2' onClick={handleChange} />
	)
}

export default UserFavorite
