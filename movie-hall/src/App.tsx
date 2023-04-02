import { useState, useEffect } from 'react'
import { Box, FormControl, useColorMode } from '@chakra-ui/react'
import { Button, ButtonGroup } from '@chakra-ui/react'
import useMovieData from './hooks/useMovieData'
import useRating from './hooks/useRating'

function App() {
	const test = useMovieData('/title/tt0111161/')
	const test2 = useRating('/title/tt0111161/')

	console.log(test)
	console.log(test2)

	return (
		<FormControl>
			<Button onClick={(e) => e} colorScheme='blue'>
				Click
			</Button>
		</FormControl>
	)
}

export default App
