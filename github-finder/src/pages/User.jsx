import { useEffect, useContext, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { FaCodepen, FaStore, FaUserFriends, FaUsers } from 'react-icons/fa'
import CountUp from 'react-countup'
import Spinner from '../components/layout/Spinner'
import RepoList from '../components/repos/RepoList'
import GithubContext from '../context/github/GithubContext'
import { getUser } from '../context/github/GithubActions'

const STATS_VERCEL_APP = process.env.REACT_APP_STATS_VERCEL
const vercelAppParams = new URLSearchParams({
	theme: 'nord',
	border_color: 'a3a4a9a0',
	title_color: '6FC0FF',
})

function User() {
	const { user, dispatch } = useContext(GithubContext)
	const [loading, setLoading] = useState(true)
	const { id } = useParams()

	useEffect(() => {
		// moving scroll to top
		window.scrollTo({
			top: 0,
			behavior: 'smooth',
		})

		// fetch User Data
		const getUsersData = async () => {
			const data = await getUser(id)

			dispatch({
				type: 'GET_USER',
				payload: data,
			})
		}

		getUsersData().then(() => setLoading(false))

		return () => dispatch({ type: 'CLEAR_USER' })
	}, [dispatch, id])

	const {
		login,
		avatar_url,
		location,
		name,
		type,
		blog,
		twitter_username,
		html_url,
		followers,
		following,
		public_gists,
		public_repos,
		hireable,
	} = user

	if (loading) return <Spinner />
	return (
		<>
			<div className='w-full mx-auto lg:w-w-10/12'>
				<div className='mb-4'>
					<Link to='/' className='btn btn-ghost'>
						Back To Search
					</Link>
				</div>

				<div className='grid grid-cols-1 xl:grid-cols-3 lg:grid-cols-3 mb-8 md:gap-8'>
					<div className='custom-card-image mb-6 md:mb-0'>
						<div className='rounded-lg shadow-xl card image-full h-full'>
							<div className='mt-4 p-6 card-actions lg:justify-center lg:items-center justify-end items-end'>
								<a
									href={html_url}
									target='_blank'
									rel='noreferrer'
									className='btn btn-outline'>
									Visit Github Profile
								</a>
							</div>
							<figure>
								<img src={avatar_url} alt='avatarPhoto' className='w-full' />
							</figure>
							<div className='card-body justify-start p-4 lg:justify-end lg:p-8'>
								<h2 className='card-title mb-0'>{name}</h2>
								<h4>{login}</h4>
							</div>
						</div>
					</div>

					<div className='col-span-2 grid content-between'>
						<div className='mb-6 p-6 rounded-lg shadow-md bg-base-100'>
							<h1 className='text-3xl card-title'>
								{name}
								<div className='ml-2 mr-1 badge badge-success'>{type}</div>
								{hireable && <div className='mx-1 badge badge-info'>Hireable</div>}
							</h1>
							<div className='divider'>Stats</div>
							<div className='git-stats flex flex-col lg:flex-row'>
								<figure className='my-1'>
									<img
										src={`${STATS_VERCEL_APP}/api?username=${id}&${vercelAppParams}`}
										alt='git-stats'
										className='w-full'
									/>
								</figure>
								<figure className='mt-1'>
									<img
										src={`${STATS_VERCEL_APP}/api/top-langs/?username=${id}&${vercelAppParams}`}
										alt='git-langs'
										className='w-full'
									/>
								</figure>
							</div>
						</div>

						<div className='w-full rounded-lg shadow-md bg-base-100 stats stats-vertical lg:stats-horizontal'>
							{location && (
								<div className='stat bg-base-100'>
									<div className='stat-title text-md'>Location</div>
									<div className='text-lg stat-value'>{location}</div>
								</div>
							)}
							{blog && (
								<div className='stat bg-base-100'>
									<div className='stat-title text-md'>Website</div>
									<div className='text-lg stat-value'>
										<a
											href={`http://${blog.replace(
												/https:\/\/|http:\/\//i,
												''
											)}`}
											target='_blank'
											rel='noreferrer'>
											{blog}
										</a>
									</div>
								</div>
							)}
							{twitter_username && (
								<div className='stat bg-base-100'>
									<div className='stat-title text-md'>Twitter</div>
									<div className='text-lg stat-value'>
										<a
											href={`https://twitter.com/${twitter_username}`}
											target='_blank'
											rel='noreferrer'>
											{twitter_username}
										</a>
									</div>
								</div>
							)}
						</div>
					</div>
				</div>

				<div className='w-full py-5 mb-6 rounded-lg shadow-md bg-base-100 stats stats-vertical lg:stats-horizontal'>
					<div className='stat bg-base-100'>
						<div className='stat-figure text-secondary'>
							<FaUsers className='text-3xl md:text-5xl' />
						</div>
						<div className='stat-title pr-5'>Followers</div>
						<div className='stat-value pr-5 text-3xl md:text-4xl'>
							<CountUp
								start={0}
								end={followers}
								duration={2.75}
								delay={0.3}
								useEasing={true}
							/>
						</div>
					</div>
					<div className='stat bg-base-100'>
						<div className='stat-figure text-secondary'>
							<FaUserFriends className='text-3xl md:text-5xl' />
						</div>
						<div className='stat-title pr-5'>Following</div>
						<div className='stat-value pr-5 text-3xl md:text-4xl'>
							<CountUp
								start={0}
								end={following}
								duration={2.75}
								delay={0.3}
								useEasing={true}
							/>
						</div>
					</div>
					<div className='stat bg-base-100'>
						<div className='stat-figure text-secondary'>
							<FaCodepen className='text-3xl md:text-5xl' />
						</div>
						<div className='stat-title pr-5'>Public Repos</div>
						<div className='stat-value pr-5 text-3xl md:text-4xl'>
							<CountUp
								start={0}
								end={public_repos}
								duration={2.75}
								delay={0.3}
								useEasing={true}
							/>
						</div>
					</div>
					<div className='stat bg-base-100'>
						<div className='stat-figure text-secondary'>
							<FaStore className='text-3xl md:text-5xl' />
						</div>
						<div className='stat-title pr-5'>Public Gists</div>
						<div className='stat-value pr-5 text-3xl md:text-4xl'>
							<CountUp
								start={0}
								end={public_gists}
								duration={2.75}
								delay={0.3}
								useEasing={true}
							/>
						</div>
					</div>
				</div>

				{<RepoList login={id} reposCount={public_repos} />}
			</div>
		</>
	)
}

export default User
