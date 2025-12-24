import { createReader } from '@keystatic/core/reader'
import { createModule } from 'capsel'
import keystaticConfig from 'keystatic.config'

const CMSModule = createModule('CMS')

class CMSRepo extends CMSModule.Repo {
  publishedPosts = this.memo(async () => {
    const reader = createReader(process.cwd(), keystaticConfig)
    const posts = await reader.collections.posts.all()

    return posts.filter((posts) => posts.entry.draft !== true)
  })
}

class CMSService extends CMSModule.Service {
  repo = this.inject(CMSRepo)

  async getRecentPosts(postsCount: number) {
    const posts = await this.repo.publishedPosts()

    const sortedPosts = posts.sort((a, b) => {
      const aDate = new Date(a.entry.date)
      const bDate = new Date(b.entry.date)
      return bDate.getTime() - aDate.getTime()
    })

    return sortedPosts.slice(0, postsCount)
  }
}

export class ShowLandingPagePostsAction extends CMSModule.Action {
  cms = this.inject(CMSService)

  async handle() {
    const posts = await this.cms.getRecentPosts(3)
    return posts.map((post) => ({ slug: post.slug, entry: post.entry }))
  }
}
