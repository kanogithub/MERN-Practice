function About() {
	return (
		<div>
			<h1 className='text-6xl mb-4 text-gray-50'>Github finder</h1>
			<h3 className='text-xl mb-2 text-gray-200'>RESTful API: Github API Practice</h3>
			<h3 className='text-xl mb-2 text-gray-200'>Custom API: Github Readme Stats</h3>
			<h3 className='text-xl mb-2 text-gray-200'>
				Stack: React.js, TailwindCSS, Daisyui Theme.
			</h3>
			<h3 className='text-xl mb-2 text-gray-200'>Version: 1.4.2</h3>
			<p className='text-gray-300'>This is for individual practicing.</p>
			<p className='text-gray-300'>
				Mainly focus on fundamental hooks with some popular modern approach.
			</p>
			<p className='text-gray-300'>
				Welcome to leave recommandation &gt;&gt;&nbsp;
				<a
					className='text-md underline decoration-dashed hover:text-gray-100'
					href='https://github.com/kanogithub'>
					Github
				</a>
				.
			</p>
			<h3 className='text-xl mt-4 mb-2 text-gray-50'>Additional features:</h3>
			<p className='text-gray-300'>Intersection Observer, Number CountUp, </p>
			<p className='text-gray-300'>Profile Hover Layout with RWD Button, </p>
			<p className='text-gray-300'>More Compatible RWD design, Sticky navbar.</p>
			<p className='text-gray-300'>Combined with anuraghazra/github-readme-stats.</p>
		</div>
	)
}

export default About
