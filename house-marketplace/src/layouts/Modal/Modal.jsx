import React, { useRef, useEffect, useState } from 'react'
import styles from './Modal.module.css'

function Modal({ shouldOpen = false, onRequestClose, children }) {
	const modalOverlayRef = useRef()
	const modalBodyRef = useRef()
	const [toClose, setToClose] = useState(false)

	const onCloseModal = () => {
		modalOverlayRef.current.classList.remove(styles.overlayOpen)
		setToClose(true)
	}

	useEffect(() => {
		shouldOpen && modalOverlayRef.current.classList.add(styles.overlayOpen)
		if (modalBodyRef.current) {
			modalBodyRef.current.addEventListener('animationend', (e) => {
				if (e.animationName === styles.modalClose) {
					setToClose(false)
					onRequestClose()
				}
			})
		}
	}, [onRequestClose, shouldOpen])

	return (
		shouldOpen && (
			<div ref={modalOverlayRef} className={`${styles.modalOverlay}`} onClick={onCloseModal}>
				<div
					ref={modalBodyRef}
					className={`${styles.modalBody} ${
						toClose ? styles.bodyClose : styles.bodyOpen
					}`}
					onClick={(e) => e.stopPropagation()}>
					{React.Children.map(children, (child) => {
						return React.isValidElement(child)
							? React.cloneElement(child, { closeModal: onCloseModal })
							: child
					})}
				</div>
			</div>
		)
	)
}

export default Modal
