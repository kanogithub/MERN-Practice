import { useState, useRef, useEffect } from 'react'

const isServer = typeof window === 'undefined'

function RenderIfvisible({ defaultHeight = 300, visibleOffset = 1000, root = null, children }) {
	const [isVisible, setIsVisible] = useState(isServer)
	const placeholderHeight = useRef(defaultHeight)
	const intersectionRef = useRef()
	const isMounted = useRef(true)

	// Set visibility with intersection observer
	useEffect(() => {
		if (intersectionRef.current) {
			const observer = new IntersectionObserver(
				(entries) => {
					if (typeof window !== 'undefined' && window.requestIdleCallback) {
						window.requestIdleCallback(
							() => isMounted.current && setIsVisible(entries[0].isIntersecting),
							{
								timeout: 600,
							}
						)
					} else {
						isMounted.current && setIsVisible(entries[0].isIntersecting)
					}
				},
				{
					root,
					rootMargin: `${visibleOffset}px 0px ${visibleOffset}px 0px`,
				}
			)

			observer.observe(intersectionRef.current)

			return () => {
				// eslint-disable-next-line react-hooks/exhaustive-deps
				intersectionRef.current && observer.unobserve(intersectionRef.current)

				isMounted.current = false
			}
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [intersectionRef])

	// Set height after render
	useEffect(() => {
		if (intersectionRef.current && isVisible) {
			placeholderHeight.current = intersectionRef.current.offsetHeight
		}
	}, [isVisible, intersectionRef])

	return (
		<div ref={intersectionRef}>
			{isVisible ? <>{children}</> : <div style={{ height: placeholderHeight.current }} />}
		</div>
	)
}

export default RenderIfvisible
