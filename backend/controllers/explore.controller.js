export const explorePopularRepos = async (req, res) => {
	const { language } = req.params;

	try {
		// Make GitHub API request without authentication (unauthenticated)
		const response = await fetch(
			`https://api.github.com/search/repositories?q=language:${language}&sort=stars&order=desc&per_page=10`
		);

		// Check if the response is successful
		if (!response.ok) {
			return res.status(response.status).json({ error: "GitHub API request failed" });
		}

		const data = await response.json();

		// Return the repositories
		res.status(200).json({ repos: data.items });
	} catch (error) {
		// Catch any errors and send a response
		res.status(500).json({ error: error.message });
	}
};
