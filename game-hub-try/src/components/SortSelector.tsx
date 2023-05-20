import { Button, Menu, MenuButton, MenuItem, MenuList } from '@chakra-ui/react'
import { BsChevronDown } from 'react-icons/bs'

interface Props {
	selectedSort: SortItem | null
	onSortSelect: (sortItem: SortItem | null) => void
}

export type SortItem = 'name' | '-released' | '-added' | '-rating' | '-metacritic'

const SortSelector = ({ selectedSort, onSortSelect }: Props) => {
	const iconStyle = (open: boolean) => ({
		transitionDuration: '0.3s',
		transform: `rotate(${open ? '180' : '0'}deg)`,
	})

	const sortOrders: { value: SortItem | null; label: string }[] = [
		{ value: null, label: 'Relevance' },
		{ value: '-added', label: 'Date added' },
		{ value: 'name', label: 'Name' },
		{ value: '-released', label: 'Release date' },
		{ value: '-metacritic', label: 'Popularity' },
		{ value: '-rating', label: 'Average rating' },
	]

	return (
		<Menu>
			{({ isOpen }) => (
				<>
					<MenuButton as={Button} rightIcon={<BsChevronDown style={iconStyle(isOpen)} />}>
						Order by:{' '}
						{sortOrders.find((s) => s.value === selectedSort)?.label || 'Relevance'}
					</MenuButton>
					<MenuList>
						{sortOrders.map((sort) => (
							<MenuItem key={sort.label} onClick={() => onSortSelect(sort.value)}>
								{sort.label}
							</MenuItem>
						))}
					</MenuList>
				</>
			)}
		</Menu>
	)
}

export default SortSelector
