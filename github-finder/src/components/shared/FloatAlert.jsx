import { useContext, useRef, useEffect } from 'react'
import AlertContext from '../../context/alert/AlertContext'

function FloatAlert() {
	const { floatAlert } = useContext(AlertContext)
	const alertElem = useRef(null)

	useEffect(() => {
		const elem = alertElem.current
		if (elem) {
			elem.classList.remove('animate')
			void elem.offsetWidth
			elem.classList.add('animate')
		}
	})

	return (
		floatAlert && (
			<div
				className='alert fixed flex justify-center bg-transparent w-full left-0'
				style={{ marginTop: '-2rem' }}
				ref={alertElem}>
				<div className='text-center badge-info font-semibold rounded shadow-lg py-3 px-8'>
					{floatAlert.msg}
				</div>
			</div>
		)
	)
}

export default FloatAlert
