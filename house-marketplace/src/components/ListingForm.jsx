import { useState, useRef } from 'react'

function ListingForm({ formData, onChange, onSubmit, onMutate }) {
	const [geolocationEnabled, setGeolocationEnabled] = useState(true)
	const {
		type,
		name,
		bathrooms,
		bedrooms,
		parking,
		furnished,
		address,
		offer,
		regularPrice,
		discountedPrice,
		images,
		latitude,
		longitude,
	} = formData

	return (
		<main>
			<form onSubmit={onSubmit}>
				<label className='formLabel'>Sell / Rent</label>
				<div className='formButtons'>
					<button
						type='button'
						className={type === 'sale' ? 'formButtonActive' : 'formButton'}
						id='type'
						value='sale'
						onClick={onMutate}>
						Sell
					</button>
					<button
						type='button'
						className={type === 'rent' ? 'formButtonActive' : 'formButton'}
						id='type'
						value='rent'
						onClick={onMutate}>
						Rent
					</button>
				</div>

				<label htmlFor='name' className='formLabel'>
					Name
				</label>
				<input
					type='text'
					id='name'
					value={name}
					onChange={onMutate}
					maxLength='32'
					minLength='10'
					required
					className='formInputName'
				/>

				<div className='formRooms flex'>
					<div>
						<label htmlFor='bedrooms' className='formLabel'>
							Bedrooms
						</label>
						<input
							type='number'
							className='formInputSmall'
							id='bedrooms'
							value={bedrooms}
							onChange={onMutate}
							min='1'
							max='50'
							required
						/>
					</div>
					<div>
						<label htmlFor='bathrooms' className='formLabel'>
							Bedrooms
						</label>
						<input
							type='number'
							className='formInputSmall'
							id='bathrooms'
							value={bathrooms}
							onChange={onMutate}
							min='1'
							max='50'
							required
						/>
					</div>
				</div>

				<label className='formLabel'>Parking spot</label>
				<div className='formButtons'>
					<button
						type='button'
						className={parking ? 'formButtonActive' : 'formButton'}
						id='parking'
						value={true}
						onClick={onMutate}>
						Yes
					</button>
					<button
						type='button'
						className={!parking ? 'formButtonActive' : 'formButton'}
						id='parking'
						value={false}
						onClick={onMutate}>
						No
					</button>
				</div>

				<label className='formLabel'>Furnished</label>
				<div className='formButtons'>
					<button
						type='button'
						className={furnished ? 'formButtonActive' : 'formButton'}
						id='furnished'
						value={true}
						onClick={onMutate}>
						Yes
					</button>
					<button
						type='button'
						className={!furnished ? 'formButtonActive' : 'formButton'}
						id='furnished'
						value={false}
						onClick={onMutate}>
						No
					</button>
				</div>

				<label htmlFor='address' className='formLabel'>
					Address
				</label>
				<textarea
					id='address'
					type='text'
					value={address}
					onChange={onMutate}
					required
					className='formInputAddress'></textarea>

				{!geolocationEnabled && (
					<div className='formLatLng flex'>
						<div>
							<label htmlFor='latitude' className='formLabel'>
								Latitude
							</label>
							<input
								type='number'
								id='latitude'
								value={latitude}
								onChange={onMutate}
								required
								className='formInputSmall'
							/>
						</div>
						<div>
							<label htmlFor='longitude' className='formLabel'>
								Longitude
							</label>
							<input
								type='number'
								id='longitude'
								value={longitude}
								onChange={onMutate}
								required
								className='formInputSmall'
							/>
						</div>
					</div>
				)}

				<label className='formLabel'>Offer</label>
				<div className='formButtons'>
					<button
						type='button'
						className={offer ? 'formButtonActive' : 'formButton'}
						id='offer'
						value={true}
						onClick={onMutate}>
						Yes
					</button>
					<button
						type='button'
						className={!offer ? 'formButtonActive' : 'formButton'}
						id='offer'
						value={false}
						onClick={onMutate}>
						No
					</button>
				</div>

				<label htmlFor='regularPrice' className='formLabel'>
					Regular Price
				</label>
				<div className='formRooms flex'>
					<div>
						<input
							type='number'
							className='formInputSmall'
							id='regularPrice'
							value={regularPrice}
							onChange={onMutate}
							min='50'
							max='750000000'
							required
						/>
					</div>
					<div>{type === 'rent' && <p className='formPriceText'>/ Month</p>}</div>
				</div>

				{offer && (
					<>
						<label htmlFor='discountedPrice' className='formLabel'>
							Discounted Price
						</label>
						<input
							type='number'
							className='formInputSmall'
							id='discountedPrice'
							value={discountedPrice}
							onChange={onMutate}
							min='50'
							max='750000000'
							required
						/>
					</>
				)}

				<label className='formLabel'>Images</label>
				<p className='imagesInfo'>The first image will be the cover (max 5).</p>
				<input
					type='file'
					id='images'
					onChange={onMutate}
					max='5'
					accept='.jpg,.png,.jpeg'
					multiple
					required
					className='formInputFile'
				/>

				<button className='primaryButton createListingButton' type='submit'>
					Create Listing
				</button>
			</form>
		</main>
	)
}

export default ListingForm
