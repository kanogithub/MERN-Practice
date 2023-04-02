import { useState, useEffect } from 'react'
import { Box, FormControl, useColorMode } from '@chakra-ui/react'
import { Button, ButtonGroup } from '@chakra-ui/react'
import useMovieData from './hooks/useMovieData'

function App() {
	const test = useMovieData('/title/tt0111161/')
	console.log(test)

	return (
		<FormControl>
			<Button onClick={(e) => e} colorScheme='blue'>
				Click
			</Button>
		</FormControl>
	)
}

export default App
