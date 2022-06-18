import { useState } from 'react'
import { collection, getDocs, query, where, orderBy, limit, startAfter } from 'firebase/firestore'
import { db } from '../firebase.config'
import { toast } from 'react-toastify'
import ListingItem from '../components/ListingItem'
import RenderIntersectionList from '../layouts/RenderIntersectionList'

function Offers() {
	const loadLimitation = 3
	const [lastFetchedListing, setLastFetchedListing] = useState(null)

	const onFetchMoreListings = async () => {
		try {
			// Get reference
			const listingsRef = collection(db, 'listings')

			// Create a query with Firebase 9
			const q = query(
				listingsRef,
				where('offer', '==', true),
				orderBy('timestamp', 'desc'),
				startAfter(lastFetchedListing),
				limit(loadLimitation)
			)

			// Execute query
			const querySnap = await getDocs(q)

			// Set More listing
			const lastVisible = querySnap.docs[querySnap.docs.length - 1]
			setLastFetchedListing(querySnap.docs.length > 0 ? lastVisible : null)

			let listings = []

			querySnap.forEach((doc) => {
				listings.push({
					id: doc.id,
					data: doc.data(),
				})
			})

			return listings
		} catch (error) {
			toast.error('Could not find listings')
		}
	}

	const fetchListings = async () => {
		try {
			// Get reference
			const listingsRef = collection(db, 'listings')

			// Create a query with Firebase 9
			const q = query(
				listingsRef,
				where('offer', '==', true),
				orderBy('timestamp', 'desc'),
				limit(loadLimitation)
			)

			// Execute query
			const querySnap = await getDocs(q)
			const lastVisible = querySnap.docs[querySnap.docs.length - 1]
			setLastFetchedListing(lastVisible)
			let listings = []

			querySnap.forEach((doc) => {
				listings.push({
					id: doc.id,
					data: doc.data(),
				})
			})

			return listings
		} catch (error) {
			toast.error('Could not find listings')
		}
	}

	return (
		<div className='category'>
			<header>
				<p className='pageHeader'>Offers</p>
			</header>

			<main>
				<ul className='categoryListings'>
					<RenderIntersectionList
						getInitialDate={fetchListings}
						onRequestDataIntersection={onFetchMoreListings}
						itemComponent={ListingItem}
						resourceName='listing'
						visibleOffset={-130}
					/>
				</ul>
			</main>

			<br />
			<br />

			{!lastFetchedListing && <p className='noMore'>No More</p>}
		</div>
	)
}

export default Offers
