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
  },
})
