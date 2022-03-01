const githubReducer = (state, { type, items, total_count }) => {
	switch (type) {
		case 'GET_USERS':
			return {
				...state,
				users: items,
				count: total_count,
				loading: false,
			}
		case 'SET_LOADING':
			return {
				...state,
				loading: true,
			}
		case 'CLEAR_USERS':
			return {
				...state,
				users: [],
				count: -1,
			}
		default:
			return state
	}
}

export default githubReducer
