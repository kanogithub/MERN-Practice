import { ReactComponent as CheckSquare } from '../assets/svg/checkSquare.svg'

function ProfileDetailsSet({ formData, auth, changeDetails, onChange, onVerifyEmail }) {
	const { name, email } = formData
	const emailVerified = auth.currentUser.emailVerified

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
				<div className='profileEmail-section'>
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
						onClick={!emailVerified ? onVerifyEmail : null}>
						{emailVerified && <CheckSquare width='20px' height='20px' />}
						{emailVerified ? 'Verified' : 'Verify Email'}
					</span>
				</div>
			</form>
		</div>
	)
}

export default ProfileDetailsSet
