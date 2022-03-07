import { useState, useContext, useCallback, useEffect } from 'react'
import GithubContext from '../../context/github/GithubContext'
import { searchUsers } from '../../context/github/GithubActions'
import AlertContext from '../../context/alert/AlertContext'
import UserSearchFloat from './UserSearchFloat'
import debounce from '../../js/Debounce'
import './UserSearch.css'

function UserSearch() {
	const [text, setText] = useState('')
	const { setAlert } = useContext(AlertContext)
	const { users, responeUsers, dispatch } = useContext(GithubContext)

	// eslint-disable-next-line react-hooks/exhaustive-deps
	const debounceResSearch = useCallback(
		debounce((text, number) => {
			// response search
			if (text.trim()) {
				dispatch({
					type: 'GET_SEARCHUSERS',
					payload: { query: text.trim(), number },
				})
			}
		}, 150),
		[]
	)

	const handleChange = (e) => {
		setText(e.target.value)
		debounceResSearch(e.target.value, 7)
	}

	const handleSubmit = async (e) => {
		e.preventDefault()
		setText(text.trim())

		if (text === '') {
			setAlert('Please Enter Something', 'error')
		} else {
			dispatch({ type: 'SET_LOADING' })

			const data = await searchUsers(text)

			dispatch({
				type: 'GET_USERS',
				payload: data,
			})
		}
	}

	const handleClear = (e) => {
		e.preventDefault()
		setText('')
		dispatch({ type: 'CLEAR_USERS' })
	}

	useEffect(() => {
		const floatLayer = document.querySelector('.custom-input-group')
		floatLayer.addEventListener('mouseleave', (e) => {
			e.target.querySelector('input').blur()
		})
	}, [])

	return (
		<div className='grid grid-cols-1 xl:grid-col-2 lg:grid-col-2 md:grid-cols-2 mb-8 gap-8'>
			<div>
				<form>
					<div className='form-control custom-input-group'>
						<div className='relative'>
							<div className='float-input'>
								<label>
									<input
										type='text'
										className='w-full pr-40 bg-gray-200 input-lg text-black'
										placeholder='Search User ID'
										value={text}
										onChange={handleChange}
									/>
								</label>
								{responeUsers.length > 0 && (
									<UserSearchFloat users={responeUsers} />
								)}
							</div>
							<button
								className={`absolute top-0 right-0 rounded-l-none w-36 btn btn-lg ${
									responeUsers.length > 0 && 'custom-rb-none'
								}`}
								onClick={handleSubmit}>
								Go
							</button>
						</div>
					</div>
				</form>
			</div>
			{users.length > 0 && (
				<div>
					<button className='btn btn-ghost btn-lg' onClick={handleClear}>
						Clear
					</button>
				</div>
			)}
		</div>
	)
}

export default UserSearch
