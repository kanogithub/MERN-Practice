import { List, ListItem, Image, HStack, Text, Button, Link, Heading } from '@chakra-ui/react'
import GenreSkeleton from './GenreSkeleton'
import getCorppedImageUrl from '../utilities/image-url'
import useGenres, { Genre } from '../hooks/useGenres'

interface Props {
	selectedGenre: Genre | null
	onSelectGenre: (genre: Genre | null) => void
}

const GenreList = ({ selectedGenre, onSelectGenre }: Props) => {
	const { data, error, isLoading } = useGenres()
	const skeletons = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15]

	if (error) return null

	return (
		<>
			<Heading fontSize='2xl' marginBottom={3}>
				Genres
			</Heading>
			<List>
				{isLoading
					? skeletons.map((skeleton) => (
							<ListItem key={skeleton} paddingY={2}>
								<GenreSkeleton />
							</ListItem>
					  ))
					: data.map((genre) => (
							<ListItem key={genre.id} paddingY={2}>
								<HStack>
									<Image
										boxSize='32px'
										borderRadius={8}
										objectFit='cover'
										src={getCorppedImageUrl(genre.image_background)}
									/>
									<Text
										fontSize='lg'
										fontWeight={
											genre.id === selectedGenre?.id ? 'bold' : 'normal'
										}
										color={genre.id === selectedGenre?.id ? '#4863A0' : ''}
										_hover={{ cursor: 'pointer', textDecoration: 'underline' }}
										onClick={() =>
											onSelectGenre(
												genre.id === selectedGenre?.id ? null : genre
											)
										}>
										{genre.name}
									</Text>
								</HStack>
							</ListItem>
					  ))}
			</List>
		</>
	)
}

export default GenreList
