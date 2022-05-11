// In convention this function must handles state, action as arguments
const githubReposReducer = (state, { type, payload }) => {
	switch (type) {
		case 'GET_REPOS':
			return {
				...state,
				repos: [...state.repos.filter((repo) => repo), ...payload.repos],
				hasNext: payload.hasNext,
				loading: false,
			}
		case 'SET_INIT':
			return {
				...state,
				repos: [...new Array(state.pageSize).fill(null)],
				login: payload.login,
				count: payload.count,
				page: 1,
			}
		case 'SET_NEXT':
			return {
				...state,
				repos: [...state.repos, ...new Array(state.pageSize).fill(null)],
				page: payload,
			}
		default:
			return state
	}
}

export default githubReposReducer
