import { useState, useEffect, useRef } from 'react'
import { getAuth, RecaptchaVerifier, signInWithCredential, PhoneAuthProvider } from 'firebase/auth'
import { toast } from 'react-toastify'

function PhoneVerifier({ _phoneNumber, onSuccessVerifyPhone, closeModal }) {
	const [sentVerify, setSentVerify] = useState(false)
	const [verifyCode, setVerifyCode] = useState('')
	const phoneNumber = useRef(_phoneNumber)
	const auth = getAuth()
	const phoneAuthProvider = new PhoneAuthProvider(auth)
	auth.languageCode = 'en'

	const applyShaked = (elem) => {
		elem.classList.toggle('shaked')
		setTimeout(() => elem.classList.toggle('shaked'), 600)
	}

	const onSendVerify = async (e) => {
		e.preventDefault()

		const pattern = new RegExp(
			'^(((([+]61[1-9]{0,1}|([(]{0,1}0[)]{0,1}[1-9]{1}|[(]{0,1}0[1-9]{1}[)]{0,1})))([0-9]{8}|([\\s*]|[-]{1})[0-9]{3}([\\s*]|[-]{1})[0-9]{3}([\\s*]|[-]{1})[0-9]{3}|(([\\s*]|[-]{0,1})[0-9]{4}([\\s*]|[-]{0,1})[0-9]{4})))|((1([\\s*]|[-]{0,1})((300|800|900|902)|3[0-9]{2}))([\\s*]|[-]{0,1})([0-9]{3}([\\s*]|[-]{0,1})[0-9]{3}|[0-9]{6}))|((13[0-9]{1}([\\s*]|[-]){0,1}[0-9]{3}|13([\\s*]|[-]){1}[0-9]{2}([\\s*]|[-]){1}[0-9]{2})))$'
		)

		try {
			if (pattern.test(phoneNumber.current.value)) {
				setSentVerify(true)

				const verificationId = await phoneAuthProvider.verifyPhoneNumber(
					phoneNumber.current.value.replace(/^0/, '+61'),
					window.recaptchaVerifier
				)

				window.verificationId = verificationId
			} else {
				applyShaked(phoneNumber.current)
				toast.error('Please Enter Valid Number')
			}
		} catch (err) {
			console.error(err.message)
		}
	}

	const onVerifyResult = async (e) => {
		e.preventDefault()
		if (verifyCode === '' || verifyCode === null) return

		try {
			const authCredential = PhoneAuthProvider.credential(window.verificationId, verifyCode)
			await signInWithCredential(auth, authCredential)

			onSuccessVerifyPhone(phoneNumber.current.value.replace(/^0/, '+61'))
			closeModal()
		} catch (err) {
			toast.error(err)
			console.error(err.message)
		}
	}

	useEffect(() => {
		window.recaptchaVerifier = new RecaptchaVerifier('recaptcha-container', {}, auth)
		window.recaptchaVerifier.render()
	}, [auth])

	return (
		<div className='phoneVerificationBox'>
			<span>Enter Your Phone Number</span>
			<div>
				<form onSubmit={!sentVerify ? onSendVerify : undefined}>
					<input
						ref={phoneNumber}
						type='tel'
						placeholder='+61 000 000 000'
						disabled={sentVerify}
						style={{ transition: '0.2s' }}
					/>
					<input
						type='button'
						value={!sentVerify ? 'Send Code' : 'Sent'}
						onClick={!sentVerify ? onSendVerify : undefined}
					/>
				</form>
			</div>
			<div
				id='recaptcha-container'
				className={`${!sentVerify ? 'blocked' : ''}`}
				onClick={!sentVerify ? onSendVerify : undefined}></div>
			<span>Enter Received Code</span>
			<div>
				<form onSubmit={sentVerify ? onVerifyResult : undefined}>
					<input
						type='number'
						placeholder='Enter Received Code'
						disabled={!sentVerify}
						value={verifyCode}
						onChange={(e) => setVerifyCode(e.target.value)}
					/>
					<input
						type='button'
						onClick={sentVerify ? onVerifyResult : undefined}
						value='Confirm'
					/>
				</form>
			</div>
		</div>
	)
}

export default PhoneVerifier
