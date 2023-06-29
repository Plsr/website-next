---

title: A Tale of two Bookmarking Services
date: '2018-03-25 17:49 +0200'
tags: ideas
---

I read quite a few things on the internet. More than reading though, I'm saving things I may want to read later. For a long time, my tool of choice for this has been [Instapaper](https://www.instapaper.com) (and it still is today). A little over a year ago, I notice I also want to save things that are not articles. Even though you can basically throw anything at Instapaper and it will at least save the URL, I didn't like to have a lot of random noise in my reading list. I then signed up for [Pinboard](https://pinboard.in) and it was perfect to save and organize bookmarks of any kind.

I set out to just save things that aren't articles with Pinboard, but soon wanted to organize everything, including articles, with tags and descriptions. For a while, I used Pinboard exclusively for everything. That worked just fine, but I missed the queue of offline-available articles in a readable and unified style Instapaper provided. Some Pinboard-Apps for iOS make use of Safaris Reader-View, but that doesn't help me at all when I'm stuck in the subway and have no possibility to load the content in the first place.

The logical next step was an IFTTT-Hook, that would save everything I threw at Pinboard to Instapaper as well. There's two problems with this approach, though:

1. I went full circle and now had non-articles added to Instapaper as well.
1. I needed to keep track of one item in two places. When I finished an article in Instapaper and archived it, I had to head over to Pinboard, mark it as read as well and write the summary or description.

Not optimal at all. This lead to me neglecting Pinbaord in favor of just keeping most things in Instapaper, which is a shame, since Pinboard is a very great service with an even better philosophy behind it.

Now, I've been thinking about this for quite a while now. Both services offer an API, so it must be possible to solve my problem. It should be possible to write a service that acts like a middleman between the two. There are few responsibilities such a service would need to take care of:

- When given a URL, save it to both, Instapaper and Pinboard as unread. Keep track of the id of the item in both services. It should be able to take a list of tags, so a first categorization on Pinboard can be done.
- Regularly check if the item has been read in either of the services and sync the state over to the other services (I assume most of the time the case would be that it is archived on Instapaper and then needs to be marked as read on Pinboard).
- It should be free and open source.
- (optional): It preserves a list of things that have been read and do not have a description on Pinbaord yet. It allows for adding that description while presenting the highlights done in Instapaper

Without looking into both APIs much deeper (especially the Terms of Usage), this looks like it should be possible. I might give building such a service a shot on a free weekend. Otherwise, if someone else wants to build it, I'd be more than happy.
