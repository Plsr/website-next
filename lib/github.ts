import { Octokit } from 'octokit'
import { Endpoints } from '@octokit/types'

type ReleasesResponse =
  Endpoints['GET /repos/{owner}/{repo}/releases']['response']['data'] & {
    draft: boolean
    prerelease: boolean
  }

const octokit = new Octokit({
  auth: process.env.GITHUB_ACCESS_TOKEN,
})

export const getWebsiteReleases = async () => {
  const releases = await octokit.request(
    'GET /repos/{owner}/{repo}/releases{?per_page,page}',
    {
      owner: 'Plsr',
      repo: 'website-next',
    }
  )

  const releaseData = releases.data.filter((release: ReleasesResponse) => {
    return release.draft === false && release.prerelease === false
  })

  return releaseData
}
