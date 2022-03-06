import axios from 'axios'

const GITHUB_URL = process.env.REACT_APP_GITHUB_URL
const GUTHUB_TOKEN = process.env.REACT_APP_GITHUB_TOKEN

const github = axios.create({
	baseURL: GITHUB_URL,
	headers: { Authorization: `token ${GUTHUB_TOKEN}` },
})

// get searhced users
export const searchUsers = async (query) => {
	const params = new URLSearchParams({
		q: query,
	})
	let data

	try {
		const respone = await github.get(`${GITHUB_URL}/search/users?${params}`)
		data = respone.data
	} catch (err) {
		const respone = await fetch(`${GITHUB_URL}/search/users?${params}`)
		data = await respone.json()
	}

	return data
}

// get single user
export const getUser = async (login) => {
	let data

	try {
		const respone = await github.get(`${GITHUB_URL}/users/${login}`)
		data = respone.data
	} catch (err) {
		const respone = await fetch(`${GITHUB_URL}/users/${login}`)
		data = await respone.json()
	}

	return data
}
