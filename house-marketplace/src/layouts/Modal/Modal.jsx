import React, { useRef, useEffect } from 'react'
import styles from './Modal.module.css'

function Modal({ shouldOpen = false, onRequestClose, children }) {
	const modalOverlayRef = useRef()
	const modalBodyRef = useRef()

	const onCloseModal = () => {
		modalOverlayRef.current.classList.remove(styles.overlayOpen)
		modalBodyRef.current.classList.remove(styles.bodyOpen)
		modalBodyRef.current.classList.add(styles.bodyClose)
	}

	useEffect(() => {
		shouldOpen && modalOverlayRef.current.classList.add(styles.overlayOpen)
		modalBodyRef.current &&
			modalBodyRef.current.addEventListener('animationend', (e) => {
				if (e.animationName === styles.modalClose) onRequestClose()
			})
	}, [onRequestClose, shouldOpen])

	return (
		shouldOpen && (
			<div ref={modalOverlayRef} className={styles.modalOverlay} onClick={onCloseModal}>
				<div
					ref={modalBodyRef}
					className={`${styles.modalBody} ${styles.bodyOpen}`}
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
