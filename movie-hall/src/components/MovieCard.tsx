import { useMemo } from 'react'
import useMovieData from '../hooks/useMovieData'

interface Props {
	movieTitle: string
}

const MovieCard = ({ movieTitle }: Props) => {
	const { isLoading, error, movieData } = useMovieData(movieTitle)

	return isLoading ? (
		<div>Loading...</div>
	) : error ? (
		<div>{error}</div>
	) : (
		<div>
			<div>
				<img src={movieData?.title.image.url} />
			</div>
			<div>{movieData?.title.title}</div>
			<div>{movieData?.title.year}</div>
		</div>
	)
}

export default MovieCard
