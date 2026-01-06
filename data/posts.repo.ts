import { Vla } from 'vla'

import { CMS } from './cms.resource'

export class PostsRepo extends Vla.Repo {
  cms = this.inject(CMS)

  async getPublished() {
    const posts = await this.cms.collections.posts.all()

    return posts.filter((posts) => posts.entry.draft !== true)
  }
}
