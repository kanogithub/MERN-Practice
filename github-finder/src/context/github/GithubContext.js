import { createContext, useContext, useReducer } from 'react'
import githubReducer from './GithubReducer'

const GithubContext = createContext()

export const useGithubContext = () => useContext(GithubContext)

export const GithubProvider = ({ children }) => {
	const getUserHistory = () => {
		const users = localStorage.getItem('usersHistory')
		return new Set(JSON.parse(users))
	}
	const initialState = {
		responeUsers: [],
		responeHistory: getUserHistory(),
		users: [],
		user: {},
		count: -1,
		loading: false,
	}

	const [state, dispatch] = useReducer(githubReducer, initialState)

	return (
		<GithubContext.Provider
			value={{
				...state,
				dispatch,
			}}>
			{children}
		</GithubContext.Provider>
	)
}

export default GithubContext
