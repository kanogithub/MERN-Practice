import { useState, useEffect } from 'react'
import { Box, FormControl, useColorMode } from '@chakra-ui/react'
import { Button, ButtonGroup } from '@chakra-ui/react'
import usePopularMovies from './hooks/usePopularMovies'
import MovieCard from './components/MovieCard'

function App() {
	// const { error: movieError, movies } = usePopularMovies()

	// Mock Data
	const movieError = null
	const movies = ['tt0944947', 'tt0944948', 'tt0944949', 'tt0944950', 'tt0944951']

	return movieError ? (
		<div>{movieError}</div>
	) : (
		movies.map((movie, index) => {
			if (index < 7) return <MovieCard movieTitle={movie} key={movie}></MovieCard>
		})
	)
}

export default App
