// In convention this function must handles state, action as arguments
const githubReducer = (state, { type, payload }) => {
	switch (type) {
		case 'GET_RESUSERS':
			let users = []
			const totalUser = Array.from(state.responeHistory)
			let index = 0

			while (index < totalUser.length && users.length < payload.number) {
				if (totalUser[index].includes(payload.query)) users.push(totalUser[index])
				index++
			}

			return {
				...state,
				responeUsers: users,
			}
		case 'GET_USERS':
			const history = new Set(state.responeHistory)
			payload.items.forEach((item) => history.add(item.login))

			return {
				...state,
				responeUsers: [],
				responeHistory: history,
				users: payload.items,
				count: payload.total_count,
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
				responeUsers: [],
				users: [],
				count: -1,
			}
		default:
			return state
	}
}

export default githubReducer
