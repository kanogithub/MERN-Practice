import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { getAuth, sendPasswordResetEmail } from 'firebase/auth'
import { toast } from 'react-toastify'
import { ReactComponent as ArrowRightIcon } from '../assets/svg/keyboardArrowRightIcon.svg'

function ForgotPassword() {
	const [email, setEmail] = useState('')
	const navigate = useNavigate()

	const onChange = (e) => setEmail(e.target.value)

	const onSubmit = async (e) => {
		e.preventDefault()

		try {
			const auth = getAuth()
			await sendPasswordResetEmail(auth, email)
			toast.success('Email was sent')

			navigate('/sign-in')
		} catch (error) {
			toast.error('Could not send reset email')
		}
	}

	return (
		<div className='pageContainer'>
			<header>
				<p className='pageHeader'>Forget Password</p>
			</header>

			<main>
				<form onSubmit={onSubmit}>
					<input
						type='email'
						placeholder='Email'
						id='email'
						value={email}
						onChange={onChange}
						className='emailInput'
					/>
					<Link className='forgotPasswordLink' to='/sign-in'>
						Sign In
					</Link>

					<div className='signInBar'>
						<div className='signInText'>Send Reset Link</div>
						<button className='signInButton'>
							<ArrowRightIcon fill='#ffffff' width='34px' height='34px' />
						</button>
					</div>
				</form>
			</main>
		</div>
	)
}

export default ForgotPassword
