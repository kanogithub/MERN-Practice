import { createContext, useReducer, useEffect } from 'react'
import githubReposReducer from './GithubReposReducer'

const GithubReposContext = createContext()

const GITHUB_URL = process.env.REACT_APP_GITHUB_URL
const GUTHUB_TOKEN = process.env.REACT_APP_GITHUB_TOKEN

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

	const setLoading = () =>
		dispatch({
			type: 'SET_LOADING',
		})

	// get repos
	const getRepos = async (login = state.login, count = state.count, init) => {
		setLoading()

		if (init)
			dispatch({
				type: 'SET_INIT',
				payload: {
					login,
					count,
					page: 1,
				},
			})

		if (login !== '') {
			const params = new URLSearchParams({
				sort: 'pushed',
				per_page: state.pageSize,
				page: state.page,
			})

			let respone = await fetch(`${GITHUB_URL}/users/${login}/repos?${params}`, {
				headers: {
					Authorization: `token ${GUTHUB_TOKEN}`,
				},
			})

			respone = respone.ok
				? respone
				: await fetch(`${GITHUB_URL}/users/${login}/repos?${params}`)

			if (respone.status === 404) window.location('/notfound')
			else {
				const data = await respone.json()

				dispatch({
					type: 'GET_REPOS',
					payload: {
						repos: data,
						hasNext: count > state.page * state.pageSize,
					},
				})
			}
		}
	}

	const getNextRepos = () => {
		dispatch({
			type: 'SET_NEXT',
			payload: state.page + 1,
		})
	}

	const getPreviousRepos = () => {
		dispatch({
			type: 'SET_PREV',
			payload: state.page - 1,
		})
	}

	// eslint-disable-next-line react-hooks/exhaustive-deps
	useEffect(() => getRepos(), [state.page])

	return (
		<GithubReposContext.Provider
			value={{
				loading: state.loading,
				repos: state.repos,
				page: state.page,
				hasNext: state.hasNext,
				getRepos,
				getNextRepos,
				getPreviousRepos,
			}}>
			{children}
		</GithubReposContext.Provider>
	)
}

export default GithubReposContext
