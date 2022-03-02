import { useState, useContext } from 'react'
import GithubContext from '../../context/github/GithubContext'
import AlertContext from '../../context/alert/AlertContext'

function UserSearch() {
	const [text, setText] = useState('')
	const { users, searchUsers, clearUsers } = useContext(GithubContext)
	const { setAlert } = useContext(AlertContext)

	const handleChange = (e) => setText(e.target.value)

	const handleSubmit = (e) => {
		e.preventDefault()
		setText(text.trim())

		if (text === '') {
			setAlert('Please Enter Something', 'error')
		} else {
			searchUsers(text)
		}
	}

	const handleClear = (e) => {
		e.preventDefault()
		setText('')
		clearUsers()
	}

	return (
		<div className='grid grid-cols-1 xl:grid-col-2 lg:grid-col-2 md:grid-cols-2 mb-8 gap-8'>
			<div>
				<form>
					<div className='form-control'>
						<div className='relative'>
							<input
								type='text'
								className='w-full pr-40 bg-gray-200 input input-lg text-black'
								placeholder='Search'
								value={text}
								onChange={handleChange}
							/>
							<button
								className='absolute top-0 right-0 rounded-l-none w-36 btn btn-lg'
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
