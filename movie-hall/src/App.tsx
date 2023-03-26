import { useState, useEffect } from 'react'
import { Box, useColorMode } from '@chakra-ui/react'
import { Button, ButtonGroup } from '@chakra-ui/react'
import MovieService from './services/movie-service'

function App() {
	const [data, setData] = useState<any>(null)
	const { toggleColorMode, colorMode } = useColorMode()

	const test = new MovieService()

	useEffect(() => {
		test.GetMostPupularMovies().request.then((res) => console.log(res.data))
	}, [])

	return <Button colorScheme='blue'>Click</Button>
}

export default App
