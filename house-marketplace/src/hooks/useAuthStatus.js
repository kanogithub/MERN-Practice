import { useState, useEffect, useRef } from 'react'
import { getAuth, onAuthStateChanged } from 'firebase/auth'

export function useAuthStatus() {
	const [loggedIn, setLoggedIn] = useState(false)
	const [checkingStatus, setCheckingStatus] = useState(true)
	const _isMounted = useRef(true)

	useEffect(() => {
		if (_isMounted)
			onAuthStateChanged(getAuth(), (user) => {
				if (user) {
					setLoggedIn(true)
				}
				setCheckingStatus(false)
			})

		return () => (_isMounted.current = false)
	}, [_isMounted])

	return { loggedIn, checkingStatus }
}
