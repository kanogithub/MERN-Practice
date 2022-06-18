import React, { useState, useRef, useEffect } from 'react'
import PropTypes from 'prop-types'
import RenderIfvisible from './RenderIfvisible'

function RenderIntersectionList({
	defaultHeight = 300,
	visibleOffset = -150,
	root = null,
	getInitialDate = () => {},
	onRequestDataIntersection,
	itemComponent: ItemComponent,
	resourceName,
	children,
}) {
	const [showList, setShowList] = useState([])
	const [hasMore, setHasMore] = useState(true)
	const [isInit, setIsInit] = useState(false)
	const placeholderHeight = useRef(defaultHeight)
	const intersectionRef = useRef()
	const isMounted = useRef(true)

	// set initial list if availible
	useEffect(() => {
		const setInitialDataList = async () => {
			const data = await getInitialDate()
			setShowList(data)
			setIsInit(true)
		}

		setInitialDataList()

		return () => (isMounted.current = false)
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [isMounted])

	// Set more list with intersection observer in viewport
	useEffect(() => {
		if (intersectionRef.current && isInit) {
			const observer = new IntersectionObserver(
				(entries) => {
					const setMoreData = async () => {
						const data = await onRequestDataIntersection()
						data.length === 0 && setHasMore(false)

						isMounted.current && setShowList((prevState) => [...prevState, ...data])
					}

					if (entries[0].isIntersecting)
						if (typeof window !== 'undefined' && window.requestIdleCallback) {
							window.requestIdleCallback(
								() => {
									onRequestDataIntersection && isMounted.current && setMoreData()
									intersectionRef.current &&
										observer.unobserve(intersectionRef.current)
								},
								{
									timeout: 600,
								}
							)
						} else {
							onRequestDataIntersection && isMounted.current && setMoreData()
							intersectionRef.current && observer.unobserve(intersectionRef.current)
						}
				},
				{
					root,
					rootMargin: `${visibleOffset}px 0px ${visibleOffset}px 0px`,
				}
			)

			observer.observe(intersectionRef.current)
			placeholderHeight.current = intersectionRef.current.offsetHeight
		}
	}, [intersectionRef, isInit, showList, onRequestDataIntersection, root, visibleOffset])

	return (
		<>
			{showList.length > 0 &&
				showList.map((listItem, index) => (
					<RenderIfvisible key={index}>
						<ItemComponent {...{ [resourceName]: listItem.data }} id={listItem.id} />
					</RenderIfvisible>
				))}

			{/* child for loading placeholder */}
			{hasMore && (
				<div ref={intersectionRef} style={{ height: placeholderHeight.current }}>
					{React.Children.map(children, (child) => {
						if (React.isValidElement(child)) return React.cloneElement(child)
					})}
				</div>
			)}
		</>
	)
}

RenderIntersectionList.propTypes = {
	itemComponent: PropTypes.elementType.isRequired,
	resourceName: PropTypes.string.isRequired,
	getInitialDate: PropTypes.func,
	onRequestMoreData: PropTypes.func,
}

export default RenderIntersectionList
