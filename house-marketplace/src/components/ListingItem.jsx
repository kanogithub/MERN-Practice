import { Link } from 'react-router-dom'
import { ReactComponent as DeleteIcon } from '../assets/svg/deleteIcon.svg'
import { ReactComponent as EditIcon } from '../assets/svg/editIcon.svg'
import bedIcon from '../assets/svg/bedIcon.svg'
import bathtubIcon from '../assets/svg/bathtubIcon.svg'
import spinner from '../assets/spinner2.gif'

function ListingItem({ listing, id, onDelete, onEdit }) {
	const toDollarString = (number) => {
		return `$${number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}`
	}

	return (
		<>
			{(onDelete || onEdit) && (
				<li className='itemControl'>
					{onEdit && <EditIcon className='editIcon' onClick={onEdit} />}
					{onDelete && (
						<DeleteIcon
							className='removeIcon'
							fill='rgb(231, 76, 60)'
							onClick={onDelete}
						/>
					)}
				</li>
			)}
			<li className='categoryListing'>
				<Link to={`/category/${listing.type}/${id}`} className='categoryListingLink'>
					<img
						src={listing.imageUrls[0]}
						alt={listing.name}
						className='categoryListingImg spinner'
						style={{ backgroundImage: `url(${spinner})` }}
						loading='lazy'
					/>

					<div className='categoryListingDetails'>
						<p className='categoryListingLocation'>{listing.location}</p>
						<p className='categoryListingName'>{listing.name}</p>
						<p className='categoryListingPrice'>
							{listing.offer
								? toDollarString(listing.discountedPrice)
								: toDollarString(listing.regularPrice)}
							{listing.type === 'rent' && ' / Week'}
						</p>
						<div className='categoryListingInfoDiv'>
							<img src={bedIcon} alt='bed' />
							<p className='categoryListingInfoText'>
								{listing.bedrooms > 1
									? `${listing.bedrooms} Bedrooms`
									: '1 Bedroom'}
							</p>
							<img src={bathtubIcon} alt='bath' />
							<p className='categoryListingInfoText'>
								{listing.bathrooms > 1
									? `${listing.bathrooms} Bathrooms`
									: '1 Bathroom'}
							</p>
						</div>
					</div>
				</Link>
			</li>
		</>
	)
}

export default ListingItem
