import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { collection, getDocs, query, where, orderBy, limit, startAfter } from 'firebase/firestore'
import { db } from '../firebase.config'
import { toast } from 'react-toastify'
import ListingItem from '../components/ListingItem'
import RenderIntersectionList from '../layouts/RenderIntersectionList'

function Category() {
	const loadLimitation = 3
	const [lastFetchedListing, setLastFetchedListing] = useState(null)
	const [forceUpdate, setForceUpdate] = useState(0)

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

			return listings
		} catch (error) {
			toast.error('Could not find listings')
		}
	}

	useEffect(() => {
		setForceUpdate((prevState) => prevState + 1)
	}, [params.categoryName, setForceUpdate])

	return (
		<div className='category'>
			<header>
				<p className='pageHeader'>
					{params.categoryName === 'rent' ? 'Places for rent' : 'Places for sale'}
				</p>
			</header>

			<main>
				<ul className='categoryListings' key={forceUpdate}>
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

export default Category
