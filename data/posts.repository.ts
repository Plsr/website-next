import { allPosts } from 'content-collections'

export class PostsRepository {
  constructor() {
    throw new Error(
      'PostsRepository is a static class and cannot be instantiated.',
    )
  }

  static getAll() {
    return allPosts
  }

  static getPublished() {
    return allPosts.filter((post) => !post.draft)
  }
}
