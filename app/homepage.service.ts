import { PostsRepo } from 'data/posts.repo'
import { Vla } from 'vla'

export class GetRecentPosts extends Vla.Action {
  postsRepo = this.inject(PostsRepo)

  async handle() {
    const posts = await this.postsRepo.getPublished()

    const sortedPosts = posts.sort((a, b) => {
      const aDate = new Date(a.entry.date)
      const bDate = new Date(b.entry.date)
      return bDate.getTime() - aDate.getTime()
    })

    return sortedPosts.slice(0, 3)
  }
}
