import { createContext, useReducer } from 'react'
import githubReducer from './GithubReducer'

const GithubContext = createContext()

export const GithubProvider = ({ children }) => {
	const initialState = {
		responeUsers: [],
		responeHistory: new Set(),
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
