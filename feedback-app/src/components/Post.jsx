// For testing react-router-dom
import { useParams } from 'react-router-dom'

function Post() {
	const post = useParams()

	return (
		<div>
			<h1>POST</h1>
			<h2>{post.id}</h2>
		</div>
	)
}

export default Post
