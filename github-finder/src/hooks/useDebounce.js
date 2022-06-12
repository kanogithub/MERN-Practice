import { useCallback } from 'react'

//@ts-check
/**
 * @param func {Function} the function used in debounce
 * @param time {Number} the delay time of debounce
 *
 * @return {Function} callback memoized function
 */
function useDebounce(func, time) {
	const debounce = (debouncedFunc, delay) => {
		let inDebounce

		return function () {
			const args = arguments
			clearTimeout(inDebounce)
			inDebounce = setTimeout(() => debouncedFunc.apply(this, args), delay)
		}
	}

	// eslint-disable-next-line react-hooks/exhaustive-deps
	return useCallback(debounce(func, time), [])
}

export default useDebounce
