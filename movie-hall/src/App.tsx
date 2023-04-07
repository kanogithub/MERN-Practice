import { useState, useEffect } from 'react'
import { Box, FormControl, useColorMode } from '@chakra-ui/react'
import { Button, ButtonGroup } from '@chakra-ui/react'
import useMovieData from './hooks/useMovieData'
import MovieService from './services/movie-service'

function App() {
	const test = useMovieData('/title/tt0111161/')
	console.log(test)

	const test2 = new MovieService().GetUserReview('tt0111161')
	test2.request.then((res) => {
		console.log(res.data.reviews[0])
	})

	return (
		<FormControl>
			<Button onClick={(e) => e} colorScheme='blue'>
				Click
			</Button>
		</FormControl>
	)
}

export default App
