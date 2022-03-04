import { FaEye, FaInfo, FaLink, FaStar, FaUtensils } from 'react-icons/fa'
import spinner from '../assets/spinner2.gif'

function RepoSkeleton() {
	return (
		<div className='mb-2 rounded-md card bg-gray-800 skeleton'>
			<div className='card-body p-5 skeleton-body animate-pulse'>
				<div className='skeleton-overlay flex justify-center items-center'>
					<img src={spinner} alt='spinner' className='h-3/4' />
				</div>
				<h3 className='my-2.5 text-xl font-semibold w-1/2 flex'>
					<FaLink className='inline mr-1' />
					<div className='badge badge-ghost flex-auto' />
				</h3>
				<p className='mb-3 badge badge-ghost w-1/2' />
				<div>
					<div className='mr-2 badge badge-ghost badge-lg '>
						<FaEye className='mr-2' />
						<span className='w-2'></span>
					</div>
					<div className='mr-2 badge badge-ghost badge-lg'>
						<FaStar className='mr-2' />
						<span className='w-2'></span>
					</div>
					<div className='mr-2 badge badge-ghost badge-lg'>
						<FaInfo className='mr-2' />
						<span className='w-2'></span>
					</div>
					<div className='mr-2 badge badge-ghost badge-lg'>
						<FaUtensils className='mr-2' />
						<span className='w-2'></span>
					</div>
				</div>
			</div>
		</div>
	)
}

export default RepoSkeleton
