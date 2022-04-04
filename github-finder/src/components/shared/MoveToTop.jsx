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

	const handleScroll = () => {
		const pageY = window.innerHeight
		const scrollY = window.scrollY
		const elem = moveButton.current

		scrollY > (pageY * 2) / 3 ? elem.classList.add('show') : elem.classList.remove('show')
	}

	useEffect(() => {
		window.addEventListener('scroll', handleScroll)
	}, [])

	return (
		<button
			ref={moveButton}
			className='btn btn-ghost text-lg opacity-25 hover:text-gray-200 hover:opacity-100 moveButton'
			onClick={moveToTop}>
			<FaLongArrowAltUp style={{ margin: 'auto' }} />
			<span>Move to Top</span>
		</button>
	)
}

export default MoveToTop
