import { useState, useEffect } from 'react'
import { Box, FormControl, useColorMode } from '@chakra-ui/react'
import { Button, ButtonGroup } from '@chakra-ui/react'
import usePopularMovies from './hooks/usePopularMovies'
import MovieCard from './components/MovieCard'

function App() {
	const { error: movieError, movies } = usePopularMovies()

	return movieError ? (
		<div>{movieError}</div>
	) : (
		movies.map((movie, index) => {
			if (index < 7) return <MovieCard movieTitle={movie} key={movie}></MovieCard>
		})
	)
}

export default App
