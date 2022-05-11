import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { collection, getDocs, query, where, orderBy, limit, startAfter } from 'firebase/firestore'
import { db } from '../firebase.config'
import { toast } from 'react-toastify'
import ListingItem from '../components/ListingItem'
import Spinner from '../components/Spinner'

function Category() {
	const loadLimitation = 4
	const [listings, setListings] = useState(null)
	const [loading, setLoading] = useState(true)
	const [lastFetchedListing, setLastFetchedListing] = useState(null)

	const params = useParams()

	const onFetchMoreListings = async () => {
		try {
			// Get reference
			const listingsRef = collection(db, 'listings')

			// Create a query with Firebase 9
			const q = query(
				listingsRef,
				where('type', '==', params.categoryName),
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

			setListings((prev) => [...prev, ...listings])
			setLoading(false)

			// No More info
			querySnap.docs.length === 0 && toast.info('Could not find more listings')
		} catch (error) {
			toast.error('Could not find listings')
		}
	}

	useEffect(() => {
		const fetchListings = async () => {
			try {
				// Get reference
				const listingsRef = collection(db, 'listings')

				// Create a query with Firebase 9
				const q = query(
					listingsRef,
					where('type', '==', params.categoryName),
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

				setListings(listings)
				setLoading(false)
			} catch (error) {
				toast.error('Could not find listings')
			}
		}

		fetchListings()
	}, [params.categoryName])

	return (
		<div className='category'>
			<header>
				<p className='pageHeader'>
					{params.categoryName === 'rent' ? 'Places for rent' : 'Places for sale'}
				</p>
			</header>

			{loading ? (
				<Spinner />
			) : listings && listings.length > 0 ? (
				<>
					<main>
						<ul className='categoryListings'>
							{listings.map((listing) => (
								<ListingItem
									listing={listing.data}
									id={listing.id}
									key={listing.id}
								/>
							))}
						</ul>
					</main>
				</>
			) : (
				<p>No listings for {params.categoryName}</p>
			)}

			<br />
			<br />
			{lastFetchedListing && (
				<p className='loadMore' onClick={onFetchMoreListings}>
					Load More
				</p>
			)}
		</div>
	)
}

export default Category
