import { ReactComponent as CheckSquare } from '../assets/svg/checkSquare.svg'

function ProfileDetailsSet({
	formData,
	auth,
	changeDetails,
	onChange,
	onVerifyEmail,
	onVerifyPhone,
}) {
	const { name, email, phoneNumber } = formData

	const emailVerified = auth.currentUser.emailVerified
	const phoneVerified = null

	return (
		<div className='profileCard'>
			<form>
				<input
					type='text'
					id='name'
					value={name}
					className={!changeDetails ? 'profileName' : 'profileNameActive'}
					disabled={!changeDetails}
					onChange={onChange}
				/>
				<div className='profile-section'>
					<input
						type='email'
						id='email'
						value={email}
						className={!changeDetails ? 'profileEmail' : 'profileEmailActive'}
						disabled={!changeDetails}
						onChange={onChange}
					/>
					<span
						className={`email-verification ${emailVerified ? 'verified' : 'verify'}`}
						onClick={!emailVerified ? onVerifyEmail : undefined}>
						{emailVerified && <CheckSquare width='20px' height='20px' />}
						{emailVerified ? 'Verified' : 'Verify Email'}
					</span>
				</div>
				<div className='profile-section'>
					<input
						type='tel'
						id='phone'
						className='profileEmail'
						disabled='true'
						placeholder={phoneNumber || '+61 000 000 000'}
					/>
					<span
						className={`email-verification ${phoneVerified ? 'verified' : 'verify'}`}
						onClick={!phoneVerified ? onVerifyPhone : undefined}>
						{phoneVerified && <CheckSquare width='20px' height='20px' />}
						{phoneVerified ? 'Verified' : 'Verify Phone'}
					</span>
				</div>
			</form>
		</div>
	)
}

export default ProfileDetailsSet
