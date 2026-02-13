// keystatic.config.ts
import { collection, config, fields } from '@keystatic/core'

export default config({
  storage: {
    kind: 'local',
  },
  collections: {
    posts: collection({
      label: 'Posts',
      slugField: 'title',
      path: 'content/posts/*',
      format: { contentField: 'content' },
      schema: {
        title: fields.slug({
          name: {
            label: 'Title',
          },
          slug: {
            label: 'Slug',
          },
        }),
        date: fields.text({ label: 'Date' }),
        tags: fields.text({
          label: 'Tags',
          description: 'Comma-separated tags',
          validation: { isRequired: false },
        }),
        draft: fields.checkbox({
          label: 'Draft',
          defaultValue: false,
        }),
        series: fields.text({
          label: 'Series',
          description: 'Post series name',
          validation: { isRequired: false },
        }),
        metaDescription: fields.text({
          label: 'Meta Description',
          multiline: true,
          validation: { isRequired: false },
        }),
        excerpt: fields.text({
          label: 'Excerpt',
          multiline: true,
          validation: { isRequired: false },
        }),
        content: fields.markdoc({ label: 'Content', extension: 'md' }),
      },
    }),
    readingNotes: collection({
      label: 'Reading Notes',
      slugField: 'title',
      path: 'content/library/articles/*',
      format: { contentField: 'content' },
      schema: {
        title: fields.slug({
          name: {
            label: 'Title',
          },
          slug: {
            label: 'Slug',
          },
        }),
        createdAt: fields.text({ label: 'Date' }),
        link: fields.text({ label: 'Link' }),
        tags: fields.text({
          label: 'Tags',
          description: 'Comma-separated tags',
          validation: { isRequired: false },
        }),
        content: fields.markdoc({ label: 'Content', extension: 'md' }),
      },
    }),
    books: collection({
      label: 'Books',
      slugField: 'title',
      path: 'content/library/books/*',
      format: { contentField: 'content' },
      schema: {
        title: fields.slug({
          name: { label: 'Title' },
          slug: { label: 'Slug' },
        }),
        author: fields.text({
          label: 'Author',
          validation: { isRequired: true },
        }),
        dateRead: fields.text({
          label: 'Date Read',
          description: 'Month and year, e.g. "January 2024"',
          validation: { isRequired: false },
        }),
        rating: fields.integer({
          label: 'Rating',
          description: '1-5 stars',
          validation: { isRequired: false, min: 1, max: 5 },
        }),
        status: fields.select({
          label: 'Status',
          options: [
            { label: 'Currently Reading', value: 'currently-reading' },
            { label: 'Read', value: 'read' },
            { label: 'Want to Read', value: 'want-to-read' },
            { label: 'Aborted', value: 'aborted' },
          ],
          defaultValue: 'read',
        }),
        audiobook: fields.checkbox({
          label: 'Audiobook',
          defaultValue: false,
        }),
        cover: fields.image({
          label: 'Cover Image',
          directory: 'public/book-covers',
          publicPath: '/book-covers/',
        }),
        content: fields.markdoc({ label: 'Notes', extension: 'md' }),
      },
    }),
  },
})
