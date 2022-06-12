function About({ nodeRef }) {
	return (
		<div className='fade' ref={nodeRef}>
			<h1 className='text-6xl mb-8 text-gray-50'>Github finder</h1>
			<h3 className='text-xl mb-2 text-gray-200'>RESTful API: Github API Practice</h3>
			<h3 className='text-xl mb-2 text-gray-200'>Custom API: Github Readme Stats</h3>
			<h3 className='text-xl mb-2 text-gray-200'>
				Stack: React.js, TailwindCSS, Daisyui Theme.
			</h3>
			<h3 className='text-xl mt-8 mb-2 text-gray-200'>Version: 1.5.9</h3>
			<p className='text-gray-300'>This is for individual practicing.</p>
			<p className='text-gray-300'>
				Mainly focus on fundamental hooks with some popular modern approach.
			</p>
			<p className='text-gray-300'>
				Welcome to leave recommandation &gt;&gt;&nbsp;
				<a
					className='text-md font-bold underline decoration-sky-300/50 hover:decoration-sky-300/70 hover:text-gray-100 hover:decoration-2'
					href='https://github.com/kanogithub'>
					Github
				</a>
				.
			</p>
			<h3 className='text-xl mt-8 mb-2 text-gray-50'>Additional features:</h3>
			<p className='text-gray-300'>New feature in 1.5.1, user favorite list.</p>
			<p className='text-gray-300'>Intersection Observer, Number CountUp, page transition.</p>
			<p className='text-gray-300'>Profile Hover Layout with RWD Button, </p>
			<p className='text-gray-300'>More Compatible RWD design, Sticky navbar.</p>
			<p className='text-gray-300'>Combined with anuraghazra/github-readme-stats.</p>
			<p className='text-gray-300'>Lazy loading about to improve performance.</p>
		</div>
	)
}

export default About
