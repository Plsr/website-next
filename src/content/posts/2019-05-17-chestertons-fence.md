---
title: On Chesterton's fence
date: '2019-05-17 19:10 +0200'
tags: programming meta
---

A while ago, I came across a [Hacker News thread](https://news.ycombinator.com/item?id=19254008) asking for advice on dealing with a large, legacy codebase. In the comments, [someone mentioned Chesterton's fence](https://news.ycombinator.com/item?id=19268448).  
Chesterton's fence is an interesting concept, that I tend to forget on the regular. So I am writing it down here, to help me remember.

Chesterton's fence is a principle that originates from G. K. Chesterton, who I had not heard of before, but who apparently wrote a lot of books. The [basic idea](https://en.wikipedia.org/wiki/Wikipedia:Chesterton%27s_fence) is quite simple:

> [...] let us say, for the sake of simplicity, a fence or gate erected across a road. The more modern type of reformer goes gaily up to it and says, "I don't see the use of this; let us clear it away." To which the more intelligent type of reformer will do well to answer: "If you don't see the use of it, I certainly won't let you clear it away. Go away and think. Then, when you can come back and tell me that you do see the use of it, I may allow you to destroy it.

When writing code, this happens to me a lot. I see something that is not as clean as it could be or that I have a better idea on how to solve. Maybe it is a weird function, maybe it is just a CSS rule I don't think is necessary. I try to change this, because look at me, how good I am in what I am doing, how much better I can make this code. But I often times do not understand why this thing is in place.

Most of the time, this results in a mildly embarrassing (but earned) "Yes, I know this is strange, but we need this because of X" in a code review[^1]. Sometimes, it results in me, wasting time changing something only to discover that it should never have been changed. It has not resulted in something important breaking on production. Yet.

To keep is this way, this is my reminder to only change things that I understand. Maybe it can work as a reminder for you as well, if you need it.

[^1]: Which is no problem when asking about why this is there. With an "This is not necessary, is it?", however, its a different story.
