const alertReducer = (state, { type: actionType, payload }) => {
	switch (actionType) {
		case 'SET_ALERT':
			return {
				...state,
				alert: payload,
			}

		case 'SET_FLOATALERT':
			return {
				...state,
				floatAlert: payload,
			}

		case 'REMOVE_ALERT':
			return {
				...state,
				alert: null,
			}

		case 'REMOVE_FLOATALERT':
			return {
				...state,
				floatAlert: null,
			}

		default:
			return state
	}
}

export default alertReducer
