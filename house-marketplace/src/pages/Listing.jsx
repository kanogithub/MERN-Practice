import { useState, useEffect } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import { getDoc, doc } from 'firebase/firestore'
import { getAuth } from 'firebase/auth'
import { db } from '../firebase.config'
import Spinner from '../components/Spinner'
import shareIcon from '../assets/svg/shareIcon.svg'

function Listing() {
	const [listing, setListing] = useState(null)
	const [loading, setLoading] = useState(true)
	const [shareLinkCopied, setShareLinkCopied] = useState(null)

	const { categoryName, listingId } = useParams()
	const navigate = useNavigate()
	const auth = getAuth()

	useEffect(() => {
		// fetch single doc
		const fetchListing = async () => {
			const docRef = doc(db, 'listings', listingId)
			const docSnap = await getDoc(docRef)

			if (docSnap.exists()) {
				setListing(docSnap.data())
				setLoading(false)
			}
		}

		fetchListing()
	}, [listingId])

	if (loading) return <Spinner />

	return (
		<main>
			{/* Slider */}

			<div
				className='shareIconDiv'
				onClick={() => {
					// save to system clipboard
					navigator.clipboard.writeText(window.location.href)
					setShareLinkCopied(true)

					setTimeout(() => {
						setShareLinkCopied(false)
					}, 2000)
				}}>
				<img src={shareIcon} alt='shareIcon' />
			</div>

			{shareLinkCopied && <p className='linkCopied'>Link Copied!</p>}

			<div className='listingDetails'>
				<p className='listingName'>
					{listing.name} - $
					{listing.offer
						? listing.discountedPrice.toLocaleString()
						: listing.regularPrice.toLocaleString()}
				</p>
				<p className='listingLocation'>{listing.location}</p>
				<p className='listingType'>
					For <span className='type'>{listing.type}</span>
				</p>
				{listing.offer && (
					<p className='discountPrice'>
						{`$${listing.regularPrice - listing.discountedPrice} discount`}
					</p>
				)}
				<ul className='listingDetailsList'>
					<li>{listing.bedrooms > 1 ? `${listing.bedrooms} Bedrooms` : '1 Bedroom'}</li>
					<li>
						{listing.bathrooms > 1 ? `${listing.bathrooms} Bathrooms` : '1 Bathroom'}
					</li>
					<li>{listing.parking && 'Parking Spot'}</li>
					<li>{listing.furnished && 'Furnished'}</li>
				</ul>
				<p className='listingLocationTitle'>Location</p>
				{/* MAP */}

				{auth.currentUser?.uid !== listing.userRef && (
					<Link
						to={`/contact/${listing.userRef}?listingName=${listing.name}`}
						className='primaryButton'>
						Contact Landlord
					</Link>
				)}
			</div>
		</main>
	)
}

export default Listing
