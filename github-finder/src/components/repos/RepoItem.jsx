import PropTypes from 'prop-types'
import { FaEye, FaInfo, FaLink, FaStar, FaUtensils } from 'react-icons/fa'
import { useInView } from 'react-intersection-observer'
import { useState } from 'react'

import './repoitem.css'

function RepoItem({ repo }) {
	const [show, setShow] = useState('')
	const { name, description, html_url, forks, open_issues, watchers_count, stargazers_count } =
		repo

	const [ref, inView] = useInView({
		rootMargin: '20px',
		threshold: 1,
	})

	if (inView && show === '') setShow(' show')

	return (
		<div className='mb-2 rounded-md card bg-gray-800 hover:bg-gray-900' ref={ref}>
			<div className='card-body p-5'>
				<h3 className='mb-2 text-xl font-semibold'>
					<a href={html_url}>
						<FaLink className='inline mr-1' />
						<span className='indicator'>
							<span
								className={`indicator-item badge badge-ghost badge-outline${show}`}>
								Link
							</span>
							{name}
						</span>
					</a>
				</h3>
				<p className='mb-3'>{description}</p>
				<div>
					<div className='mr-2 badge badge-info badge-lg'>
						<FaEye className='mr-2' />
						{watchers_count}
					</div>
					<div className='mr-2 badge badge-success badge-lg'>
						<FaStar className='mr-2' />
						{stargazers_count}
					</div>
					<div className='mr-2 badge badge-error badge-lg'>
						<FaInfo className='mr-2' />
						{open_issues}
					</div>
					<div className='mr-2 badge badge-warning badge-lg'>
						<FaUtensils className='mr-2' />
						{forks}
					</div>
				</div>
			</div>
		</div>
	)
}

RepoItem.propTypes = {
	repo: PropTypes.object.isRequired,
}

export default RepoItem
