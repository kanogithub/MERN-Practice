const alertReducer = (state, { type: actionType, payload }) => {
	switch (actionType) {
		case 'SET_ALERT':
			return payload

		case 'REMOVE_ALERT':
			return null

		default:
			return state
	}
}

export default alertReducer
