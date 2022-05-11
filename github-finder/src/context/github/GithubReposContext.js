import { createContext, useContext, useReducer } from 'react'
import githubReposReducer from './GithubReposReducer'

const GithubReposContext = createContext()

export const useGithubReposContext = () => useContext(GithubReposContext)

export const GithubReposProvider = ({ children }) => {
	const pageSize = 5

	const initialState = {
		repos: [...new Array(pageSize).fill(null)],
		login: '',
		count: 0,
		pageSize,
		page: 1,
		hasNext: false,
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
