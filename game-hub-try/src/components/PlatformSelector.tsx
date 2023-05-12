import { Button, Menu, MenuButton, MenuItem, MenuList } from '@chakra-ui/react'
import { BsChevronDown } from 'react-icons/bs'
import usePlatforms, { Platform } from '../hooks/usePlatforms'

interface Props {
	selectedPlatform: Platform | null
	onPlatformSelect: (platform: Platform | null) => void
}

const PlatformSelector = ({ selectedPlatform, onPlatformSelect }: Props) => {
	const { data, error } = usePlatforms()
	const iconStyle = (open: boolean) => ({
		transitionDuration: '0.3s',
		transform: `rotate(${open ? '180' : '0'}deg)`,
	})

	if (error) return null
	return (
		<Menu>
			{({ isOpen }) => (
				<>
					<MenuButton as={Button} rightIcon={<BsChevronDown style={iconStyle(isOpen)} />}>
						{selectedPlatform?.name ?? 'All Platforms'}
					</MenuButton>
					<MenuList>
						<MenuItem key='all' onClick={() => onPlatformSelect(null)}>
							All Platforms
						</MenuItem>
						{data.map((platform) => (
							<MenuItem key={platform.id} onClick={() => onPlatformSelect(platform)}>
								{platform.name}
							</MenuItem>
						))}
					</MenuList>
				</>
			)}
		</Menu>
	)
}

export default PlatformSelector
