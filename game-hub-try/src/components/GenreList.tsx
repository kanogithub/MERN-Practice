import { VStack } from '@chakra-ui/react'
import useGenres from '../hooks/useGenres'

const GenreList = () => {
	const { data } = useGenres()
	return (
		<VStack>
			{data.map((genre) => (
				<div key={genre.id}>{genre.name}</div>
			))}
		</VStack>
	)
}

export default GenreList
