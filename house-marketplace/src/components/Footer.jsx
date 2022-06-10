import { useNavigate } from 'react-router-dom'

function Footer() {
	const navigate = useNavigate()

	return (
		<div className='footer'>
			<div className='container'>
				<div className='footer-widgets'>
					<div>Fake House 0.1.4</div>
					<div>
						<ul className='footer-quiklink'>
							<li onClick={() => navigate('/category/rent')}>
								<p style={{ color: '#cfcfcf' }}>Rent</p>
							</li>
							<li onClick={() => navigate('/category/sale')}>
								<p style={{ color: '#cfcfcf' }}>Sale</p>
							</li>
							<li onClick={() => navigate('/offers')}>
								<p
									style={{
										color: '#cfcfcf',
									}}>
									Offers
								</p>
							</li>
							<li onClick={() => navigate('/profile')}>
								<p
									style={{
										color: '#cfcfcf',
									}}>
									Profile
								</p>
							</li>
						</ul>
					</div>
					<div>About Project</div>
				</div>
			</div>
		</div>
	)
}

export default Footer
