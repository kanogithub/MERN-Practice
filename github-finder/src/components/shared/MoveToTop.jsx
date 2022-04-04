import { useEffect, useRef } from 'react'
import { FaLongArrowAltUp } from 'react-icons/fa'

function MoveToTop() {
	const moveButton = useRef()

	const moveToTop = () => {
		window.scrollTo({
			top: 0,
			behavior: 'smooth',
		})
	}

	const debounce = (func, delay) => {
		let inDebounce
		return function () {
			const context = this
			const args = arguments
			clearTimeout(inDebounce)
			inDebounce = setTimeout(() => func.apply(context, args), delay)
		}
	}

	const closeMoveTopTimeout = debounce(() => moveButton.current.classList.remove('show'), 2500)

	const handleScroll = () => {
		const pageY = window.innerHeight
		const scrollY = window.scrollY
		const elem = moveButton.current
		scrollY > (pageY * 2) / 3 ? elem.classList.add('show') : elem.classList.remove('show')
		closeMoveTopTimeout()
	}

	useEffect(() => {
		window.addEventListener('scroll', handleScroll)

		return () => window.removeEventListener('scroll', handleScroll)
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])

	return (
		<button
			ref={moveButton}
			className='btn btn-ghost text-lg hover:text-gray-200 hover:opacity-100 moveButton'
			onClick={moveToTop}>
			<FaLongArrowAltUp style={{ margin: 'auto' }} />
			<span>Move to Top</span>
		</button>
	)
}

export default MoveToTop
