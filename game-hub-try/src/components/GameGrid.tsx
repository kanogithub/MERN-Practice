import React, { useEffect, useState } from 'react'
import { Text } from '@chakra-ui/react'
import apiClient from '../services/api-client'
import { AxiosError } from 'axios'

interface Game {
	id: number
	name: string
}

interface GameResponseProps {
	count: number
	results: Game[]
}

const GameGrid = () => {
	const [games, setGames] = useState<Game[]>([])
	const [error, setError] = useState('')

	useEffect(() => {
		apiClient
			.get<GameResponseProps>('/games')
			.then((res) => {
				setGames(res.data.results)
			})
			.catch((err: AxiosError) => {
				setError(err.message)
			})
	}, [])

	return (
		<>
			{error && <Text>{error}</Text>}
			<ul>
				{games.map((game) => (
					<li key={game.id}>{game.name}</li>
				))}
			</ul>
		</>
	)
}

export default GameGrid
