import { PageTitleWithSubline } from 'components/page-title-with-subline'
import { PostsList } from 'components/posts-list'

export default async function PostsIndex() {
  return (
    <>
      <PageTitleWithSubline
        title="Drafts"
        subline={
          <PageTitleWithSubline.Subline>
            These are drafted posts in various states. Some may have some
            content while other are just headlines. I might finish these some
            day. Or not.
          </PageTitleWithSubline.Subline>
        }
      />
      <PostsList />
    </>
  )
}
