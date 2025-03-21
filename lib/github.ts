import { Octokit } from 'octokit'

const octokit = new Octokit({
  auth: process.env.GITHUB_ACCESS_TOKEN,
})

export const getWebsiteReleases = async (): Promise<ReleasesResponseData[]> => {
  const releases = await octokit.request(
    'GET /repos/{owner}/{repo}/releases{?per_page,page}',
    {
      owner: 'Plsr',
      repo: 'website-next',
    },
  )

  const releaseData = releases.data.filter((release: ReleasesResponseData) => {
    return release.draft === false && release.prerelease === false
  })

  return releaseData
}

export type ReleasesResponseData = {
  url: string
  assets_url: string
  upload_url: string
  html_url: string
  id: number
  author: Author
  node_id: string
  tag_name: string
  target_commitish: string
  name: string
  draft: boolean
  prerelease: boolean
  created_at: Date
  published_at: Date
  assets: unknown[]
  tarball_url: string
  zipball_url: string
  body: string
}

type Author = {
  login: string
  id: number
  node_id: string
  avatar_url: string
  gravatar_id: string
  url: string
  html_url: string
  followers_url: string
  following_url: string
  gists_url: string
  starred_url: string
  subscriptions_url: string
  organizations_url: string
  repos_url: string
  events_url: string
  received_events_url: string
  type: string
  site_admin: boolean
}
