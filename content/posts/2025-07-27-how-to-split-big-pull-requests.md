---
title: How to split big Pull Requests
date: "2025-07-27T07:35:00.000+02:00"
tags: programming
draft: false
metaDescription: Learn a simple, practical method to break large Git Pull
  Requests into smaller, easier-to-review chunks using git restore, boosting
  productivity and team collaboration.
---
Here's something I strongly believe: Small Pull Requests might take extra effort by the author to achieve, but they always pay off in productivity. I might elaborate more in the future, but that's the basic idea.

Creating small Pull Requests is not always easy and straightforward. It requires more thinking, planning ahead and empathy towards your coworkers than just bundling all your changes into one big chunk. It becomes easier as you get more familiar with a code base and the problem space because you can formulate a clearer structure for solving a problem in your head upfront rather than figuring things out as you go. 
But even with a lot of experience, you occasionally end up with a big Pull Request that would benefit from being split into smaller chunks. Let's explore how to do that.

Before we do anything, let's do some thinking: What parts of this can actually be reviewed and merged independently? How are the different parts of our solution connected to each other? If you realize that you cannot split anything at all, this might also be a good chance to think about your solution: Should the single parts be more separated? (The answer to this can also be 'No', but I think it always is worth asking the question)

To make this less abstract, let's look at an example I faced the other week. It is simplified in some aspects, but was an actual situation I found myself in that gave me the idea for writing this.

## The plan
I added a new page to one of our flows. This page needed some data and it was only accessed by a route handler in Next.js. After building everything I needed, I had:

- a `page.tsx` file with tests
- changes to an existing `data.dto.ts` file and its tests
- changes the `route.ts` file that would add the page to the actual user flow

```
❯ git status -u -s
 M app/my-route/route.ts 
 M app/my-route/route.test.ts 
 M data/data.dto.test.ts
 M data/data.dto.ts
?? app/my-route/new-page/page.test.tsx
?? app/my-route/new-page/page.tsx
```

Let's think about how those files are connected and their impact on our production application.

- The route changes depend on the page being present. The route changes also make the page available to users, essentially "releasing" the feature
- The page needs the changes to the DTO in order to work (it needs to fetch and display this data)
- The DTO has no dependencies to other changes

This leaves us with a clear plan: We can split this Pull Request into three smaller ones, stack them and release them to production one by one in order. I like to merge them directly into our main branch instead of each other to keep the diffs small.

Our new Pull Requests will contain:
1. `data.dto.ts` & `data.dot.test.ts`
2. `page.tsx` & `page.test.tsx`
3. `route.ts` & `route.test.ts`

With this plan formulated, let's look into the execution.

## Moving changes between branches
The branch with all changes displayed above is called `my-feature`. We now want to create three new branches and distribute the changes accordingly. This means we essentially want to copy changes from one branch to another. 

As always with Git, there are multiple ways to achieve that. If you were really disciplined with your commits, you may be able to just `cherry-pick` the SHAs from your source branch. I wasn't, unfortunately, so I needed to find another solution.

There are some more adventurous ways like `git reset` or `git format-patch`, which I don't like to use here. `git reset` risks unintentionally losing changes if not used carefully. Similarly, `git format-patch` feels heavy-handed for small tasks. We can get everything we need using `git checkout` just fine, but the command is a bit overloaded.

The alternative I like to use is [`git-restore`](https://git-scm.com/docs/git-restore)  which exists explicitly for this use case:
> Restore specified paths in the working tree with some contents from a restore source

Let's create a new branch that is branching off from our default branch (likely `main` or `master`):
```
git checkout main
git checkout -b my-feature-adapt-data-dto
```

From this branch, we'll use `git restore` to copy over the files from our feature PR:

```
git restore --source my-feature data/data.dto.ts data/data.dto.test.ts
```

which will leave us with a working state of 

```
~/dev/tmp/restore-demo my-feature-adapt-data-dto*
❯ git status -s
 M data/data.dto.test.ts
 M data/data.dto.ts
```

Now we can commit those changes and open a PR that is very small in scope. Easy.

We'll repeat that for the other blocks of changes that we identified, .while making sure each new branch builds on the previous one to maintain a logical order (`branch-1` → `branch-2` → `branch-3`). Otherwise the diff will become bigger than necessary again.

At the end of this, we will end up with three small Pull Requests that are easy to review because of their limited size and scope. It took some thinking from our side, but will cut down heavily on review time, making the overall feature delivery faster. Plus, our teammate will be thankful for making their job of reviewing easier.
