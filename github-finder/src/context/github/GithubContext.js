import { createContext, useReducer } from 'react'
import githubReducer from './GithubReducer'

const GithubContext = createContext()

const GITHUB_URL = process.env.REACT_APP_GITHUB_URL
const GUTHUB_TOKEN = process.env.REACT_APP_GITHUB_TOKEN

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

	// response search
	const responseSearch = async (query, number) => {
		dispatch({
			type: 'GET_RESUSERS',
			payload: { query, number },
		})
	}

	// get searhced users
	const searchUsers = async (query) => {
		setLoading()

		const params = new URLSearchParams({
			q: query,
		})

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

	// get single user
	const getUser = async (login) => {
		setLoading()

		let respone = await fetch(`${GITHUB_URL}/users/${login}`, {
			headers: {
				Authorization: `token ${GUTHUB_TOKEN}`,
			},
		})

		respone = respone.ok ? respone : await fetch(`${GITHUB_URL}/users/${login}`)

		if (respone.status === 404) window.location('/notfound')
		else {
			const data = await respone.json()

			dispatch({
				type: 'GET_USER',
				payload: data,
			})
		}
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
				responeUsers: state.responeUsers,
				users: state.users,
				user: state.user,
				loading: state.loading,
				count: state.count,
				responseSearch,
				searchUsers,
				getUser,
				clearUsers,
			}}>
			{children}
		</GithubContext.Provider>
	)
}

export default GithubContext
