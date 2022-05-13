import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { collection, getDocs, query, orderBy, limit } from 'firebase/firestore'
import { db } from '../firebase.config'
import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css'
import 'swiper/css/pagination'
import Spinner from './Spinner'

function Slider() {
	const [loading, setLoading] = useState(true)
	const [listings, setListings] = useState(null)

	const navigate = useNavigate()

	useEffect(() => {
		const fetchListings = async () => {
			const listingRef = collection(db, 'listings')
			const _query = query(listingRef, orderBy('timestamp', 'desc'), limit(5))
			const querySnap = await getDocs(_query)

			let listings = []
			querySnap.forEach((doc) => {
				return listings.push({
					id: doc.id,
					data: doc.data(),
				})
			})

			setListings(listings)
			setLoading(false)
		}

		fetchListings()
	}, [])

	if (loading) return <Spinner />

	return (
		listings && (
			<>
				<p className='exploreHeading'>Recommended</p>

				<Swiper
					slidesPerView={1}
					pagination={{ clickable: true }}
					scrollbar={{ draggable: true }}>
					{listings.map(({ id, data }) => (
						<SwiperSlide
							key={id}
							onClick={() => navigate(`/category/${data.type}/${id}`)}>
							<div
								style={{
									background: `url(${data.imageUrls[0]}) center no-repeat`,
									backgroundSize: 'cover',
								}}
								className='swiperSlideDiv'>
								<p className='swiperSlideText'>{data.name}</p>
								<p className='swiperSlidePrice'>
									${data.discountedPrice ?? data.regularPrice}
									{data.type === 'rent' && '/ month'}
								</p>
							</div>
						</SwiperSlide>
					))}
				</Swiper>
			</>
		)
	)
}

export default Slider
