const GITHUB_URL = process.env.REACT_APP_GITHUB_URL
const GUTHUB_TOKEN = process.env.REACT_APP_GITHUB_TOKEN

// get repos
export const getRepos = async (login, pageSize, page) => {
	if (login !== '') {
		const params = new URLSearchParams({
			sort: 'pushed',
			per_page: pageSize,
			page: page,
		})

		let respone = await fetch(`${GITHUB_URL}/users/${login}/repos?${params}`, {
			headers: {
				Authorization: `token ${GUTHUB_TOKEN}`,
			},
		})

		respone = respone.ok ? respone : await fetch(`${GITHUB_URL}/users/${login}/repos?${params}`)

		if (respone.status === 404) window.location('/notfound')
		else {
			const data = await respone.json()

			return data
		}
	}
}
