import { VStack } from '@chakra-ui/react'
import useGenres from '../hooks/useGenres'

const GenreList = () => {
	const { genres } = useGenres()
	return (
		<VStack>
			{genres.map((genre) => (
				<div key={genre.id}>{genre.name}</div>
			))}
		</VStack>
	)
}

export default GenreList
