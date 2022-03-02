// In convention this function must handles state, action as arguments
const githubReducer = (state, { type, payload = {} }) => {
	const { items, total_count } = payload

	switch (type) {
		case 'GET_USERS':
			return {
				...state,
				users: items,
				count: total_count,
				loading: false,
			}
		case 'GET_USER':
			return {
				...state,
				user: payload,
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
