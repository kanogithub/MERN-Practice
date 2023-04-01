import { useState, useEffect } from 'react'
import { Box, useColorMode } from '@chakra-ui/react'
import { Button, ButtonGroup } from '@chakra-ui/react'
import useMovieData from './hooks/useMovieData'

function App() {
	const [data, setData] = useState<any>(null)
	const { toggleColorMode, colorMode } = useColorMode()

	const test = useMovieData('/title/tt0111161/')

	console.log(test)

	return <Button colorScheme='blue'>Click</Button>
}

export default App
