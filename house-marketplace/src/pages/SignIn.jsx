import { useState } from 'react'
import { Link, useNavigate, useSearchParams } from 'react-router-dom'
import { toast } from 'react-toastify'
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth'
import OAuth from '../components/OAuth'
import { ReactComponent as ArrowRightIcon } from '../assets/svg/keyboardArrowRightIcon.svg'
import visibilityIcon from '../assets/svg/visibilityIcon.svg'

function SignIn() {
	const [showPassword, setShowPassword] = useState(false)
	// eslint-disable-next-line no-unused-vars
	const [searchParams, setSearchParams] = useSearchParams()
	const [formData, setFormData] = useState({
		email: '',
		password: '',
	})

	const navigate = useNavigate()

	const { email, password } = formData
	const onChange = (e) =>
		setFormData((preValue) => ({ ...preValue, [e.target.id]: e.target.value }))

	const onSubmit = async (e) => {
		e.preventDefault()

		try {
			const auth = getAuth()
			const userCredential = await signInWithEmailAndPassword(auth, email, password)

			if (userCredential.user) {
				const path = searchParams.get('listing') ? searchParams.get('listing') : '/'
				navigate(path, { replace: true })
			}
		} catch (error) {
			if (error.code === 'auth/user-not-found') toast.error('Bad User Credential')
			if (error.code === 'auth/wrong-password') toast.error('Wrong Password')
			if (error.code === 'auth/invalid-email') toast.error('Bad User Credential')
		}
	}

	return (
		<>
			<div className='pageContainer'>
				<header>
					<p className='pageHeader'>Welcome Back!</p>
				</header>

				<form onSubmit={onSubmit}>
					<input
						type='email'
						className='emailInput'
						placeholder='Email'
						id='email'
						value={email}
						onChange={onChange}
					/>

					<div className='passwordInputDiv'>
						<input
							type={showPassword ? 'text' : 'password'}
							className='passwordInput'
							placeholder='Password'
							id='password'
							value={password}
							onChange={onChange}
						/>

						<img
							src={visibilityIcon}
							alt='show password'
							className='showPassword'
							onClick={() => setShowPassword((preV) => !preV)}
						/>
					</div>

					<Link to='/forgot-password' className='forgotPasswordLink'>
						Forgot Password
					</Link>

					<div className='signInBar'>
						<p className='signInText'>Sign In</p>
						<button className='signInButton'>
							<ArrowRightIcon fill='#ffffff' width='34px' height='34px' />
						</button>
					</div>
				</form>

				<OAuth />

				<Link to='/sign-up' className='registerLink'>
					<button className='sign-up-cta'>Sign Up Instead</button>
				</Link>
			</div>
		</>
	)
}

export default SignIn
