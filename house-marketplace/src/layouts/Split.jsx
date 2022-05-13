import styled from 'styled-components'

function Split({ children }) {
	const [leftChild, rightChild] = children
	const Panel = styled.div``

	return (
		<div className='split-container'>
			<Panel className='split-left'>{leftChild}</Panel>
			<Panel className='split-right'>{rightChild}</Panel>
		</div>
	)
}

export default Split
