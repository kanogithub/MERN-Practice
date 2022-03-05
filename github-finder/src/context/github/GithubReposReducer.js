// In convention this function must handles state, action as arguments
const githubReposReducer = (state, { type, payload }) => {
	switch (type) {
		case 'GET_REPOS':
			return {
				...state,
				repos: payload.repos,
				hasNext: payload.hasNext,
				loading: false,
			}
		case 'SET_INIT':
			return {
				...state,
				login: payload.login,
				count: payload.count,
				page: payload.page,
			}
		case 'SET_NEXT':
			return {
				...state,
				page: payload,
			}
		case 'SET_PREV':
			return {
				...state,
				page: payload,
			}
		case 'SET_LOADING':
			return {
				...state,
				loading: true,
			}
		default:
			return state
	}
}

export default githubReposReducer