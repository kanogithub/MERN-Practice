import { createContext, useReducer } from 'react'
import alertReducer from './AlertReducer'

const AlertContext = createContext()

export const AlertProvider = ({ children }) => {
	const initialState = { alert: null, floatAlert: null }
	const [state, dispatch] = useReducer(alertReducer, initialState)

	const setAlert = (msg, type) => {
		dispatch({
			type: 'SET_ALERT',
			payload: { msg, type },
		})

		setTimeout(() => dispatch({ type: 'REMOVE_ALERT' }), 3000)
	}

	const setFloatAlert = (msg, type) => {
		dispatch({
			type: 'SET_FLOATALERT',
			payload: { msg, type },
		})

		setTimeout(() => dispatch({ type: 'REMOVE_FLOATALERT' }), 3000)
	}

	return (
		<AlertContext.Provider
			value={{
				alert: state.alert,
				floatAlert: state.floatAlert,
				setAlert,
				setFloatAlert,
			}}>
			{children}
		</AlertContext.Provider>
	)
}

export default AlertContext
