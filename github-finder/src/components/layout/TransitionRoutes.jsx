import { Routes, useLocation } from 'react-router-dom'
import { TransitionGroup, CSSTransition } from 'react-transition-group'

function TransitionRoutes({ children, nodeRef }) {
	const location = useLocation()

	return (
		<TransitionGroup>
			<CSSTransition timeout={300} classNames='fade' key={location.key} nodeRef={nodeRef}>
				<Routes location={location}>{children}</Routes>
			</CSSTransition>
		</TransitionGroup>
	)
}

export default TransitionRoutes
