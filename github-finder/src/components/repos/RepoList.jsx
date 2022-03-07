import { useContext, useEffect } from 'react'
import RepoItem from './RepoItem'
import RepoSkeleton from './RepoSkeleton'
import GithubReposContext from '../../context/github/GithubReposContext'

const moveToTop = () => {
	window.scrollTo({
		top: 0,
		behavior: 'smooth',
	})
}

function RepoList({ login, reposCount }) {
	const { repos, page, hasNext, loading, getRepos, getNextRepos } = useContext(GithubReposContext)

	useEffect(() => {
		getRepos(login, reposCount, true)
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])

	return (
		<div className='rounded-lg shadow-lg card bg-base-100'>
			<div className='card-body'>
				<h2 className='text-3xl my-4 font-bold card-title'>Latest Updated Respositories</h2>

				{repos.map((repo, index) => {
					if (loading) return <RepoSkeleton key={repo.id} />
					else return <RepoItem key={repo.id} repo={repo} />
				})}
			</div>
			<div>
				{page > 1 && (
					<button className='btn btn-ghost text-xl mb-7 mx-8 mt-0' onClick={moveToTop}>
						Move to Top
					</button>
				)}
				{hasNext && (
					<button className='btn btn-ghost text-xl mb-7 mx-8 mt-0' onClick={getNextRepos}>
						More...
					</button>
				)}
			</div>
		</div>
	)
}

export default RepoList
