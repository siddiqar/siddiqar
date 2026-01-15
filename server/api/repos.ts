export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig()
  const username = config.public.user.name
  
  try {
    const response = await fetch(`https://api.github.com/users/${username}/repos?sort=updated&per_page=100`, {
      headers: {
        'Accept': 'application/vnd.github.v3+json',
        'User-Agent': 'Nuxt-Portfolio'
      }
    })
    
    if (!response.ok) {
      throw new Error(`GitHub API error: ${response.status}`)
    }
    
    const repos = await response.json()
    
    // Filter out forks and private repos, return only public repos
    const publicRepos = repos
      .filter((repo: any) => !repo.fork && !repo.private)
      .map((repo: any) => ({
        id: repo.id,
        name: repo.name,
        title: repo.name,
        description: repo.description || 'No description available',
        url: repo.html_url,
        homepage: repo.homepage,
        stars: repo.stargazers_count,
        forks: repo.forks_count,
        language: repo.language,
        topics: repo.topics || [],
        created_at: repo.created_at,
        updated_at: repo.updated_at,
        project_url: repo.homepage || repo.html_url,
        status: 'active'
      }))
      .sort((a: any, b: any) => new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime())
    
    return publicRepos
  } catch (error) {
    console.error('Error fetching GitHub repos:', error)
    return []
  }
})
