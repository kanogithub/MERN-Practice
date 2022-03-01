import { createContext, useReducer } from 'react'
import githubReducer from './GithubReducer'

const GithubContext = createContext()

const GITHUB_URL = process.env.REACT_APP_GITHUB_URL
const GUTHUB_TOKEN = process.env.REACT_APP_GITHUB_TOKEN

export const GithubProvider = ({ children }) => {
	const initialState = {
		users: [],
		count: -1,
		loading: false,
	}

	const [state, dispatch] = useReducer(githubReducer, initialState)

	// get searhced users
	const searchUsers = async (query) => {
		setLoading()

		const params = new URLSearchParams({
			q: query,
		})
		// console.log(params['q'])
		let respone = await fetch(`${GITHUB_URL}/search/users?${params}`, {
			headers: {
				Authorization: `token ${GUTHUB_TOKEN}`,
			},
		})

		respone = respone.ok ? respone : await fetch(`${GITHUB_URL}/search/users?${params}`)
		const data = await respone.json()

		dispatch({
			type: 'GET_USERS',
			payload: data,
		})
	}

	const clearUsers = () => {
		dispatch({
			type: 'CLEAR_USERS',
		})
	}

	const setLoading = () => dispatch({ type: 'SET_LOADING' })

	return (
		<GithubContext.Provider
			value={{
				users: state.users,
				loading: state.loading,
				count: state.count,
				searchUsers,
				clearUsers,
			}}>
			{children}
		</GithubContext.Provider>
	)
}

export default GithubContext
