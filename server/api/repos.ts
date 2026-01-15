interface GitHubRepo {
  id: number
  name: string
  description: string | null
  html_url: string
  homepage: string | null
  stargazers_count: number
  forks_count: number
  language: string | null
  topics: string[]
  created_at: string
  updated_at: string
  fork: boolean
  private: boolean
}

interface Repo {
  id: number
  name: string
  title: string
  description: string
  url: string
  homepage: string | null
  stars: number
  forks: number
  language: string | null
  topics: string[]
  created_at: string
  updated_at: string
  project_url: string
  status: string
}

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
    
    const repos: GitHubRepo[] = await response.json()
    
    // Filter out forks and private repos, return only public repos
    const publicRepos: Repo[] = repos
      .filter((repo) => !repo.fork && !repo.private)
      .map((repo) => ({
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
      .sort((a, b) => new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime())
    
    return publicRepos
  } catch (error) {
    console.error('Error fetching GitHub repos:', error)
    return []
  }
})
