import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const posts = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/posts' }),
  schema: z.object({
    title: z.string(),
    date: z.string(),
    excerpt: z.string().optional(),
    tags: z.any().optional(),
    draft: z.boolean().optional(),
    link: z.string().url().optional(),
    metaDescription: z.string().optional(),
  }),
});

export const collections = { posts };
