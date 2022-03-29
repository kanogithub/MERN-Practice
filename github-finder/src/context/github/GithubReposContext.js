import { createContext, useContext, useReducer } from 'react'
import githubReposReducer from './GithubReposReducer'

const GithubReposContext = createContext()

export const useGithubReposContext = () => useContext(GithubReposContext)

export const GithubReposProvider = ({ children }) => {
	const initialState = {
		repos: [],
		login: '',
		count: 0,
		pageSize: 5,
		page: 1,
		hasNext: false,
		loading: false,
	}

	const [state, dispatch] = useReducer(githubReposReducer, initialState)

	return (
		<GithubReposContext.Provider
			value={{
				...state,
				dispatch,
			}}>
			{children}
		</GithubReposContext.Provider>
	)
}

export default GithubReposContext
