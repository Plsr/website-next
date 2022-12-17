---
layout: post
title: Kill your darlings
date: '2019-09-08 18:11 +0200'
tags: programming meta
---

Some time ago, William Faulkner said that "In writing, you must kill your darlings". You can make of the quote what you want, but I interpret it like this: There are times, in writing, when you have to kill a passage (or a character) you love, if it does not help to develop the story. Removing parts, even if you've grown attached to them, will make a better end product in that case.  
I think the same is true for the development of a software project.

Earlier this week, I had to implement a new feature in one of our projects: For some entities, there should be a map displayed, showing where the entity is located[^1].
My solution was to get the physical address of these entities from an external API, parsing them to geo coordinates and saving them to the database so we would be able to center the map on the correct point.
It involved a service object that used dependency injection, a task to update existing locations, a modification to our current API calls and a good amount of new tests to keep the coverage up. I think it was a solid pice of software and to be honest, I was a little proud of it.

All of this decision making happened when the rest of the project team was on holiday.
When they came back, I opened a Pull Request and waited for their feedback to come in. While the code seemed to be okay, in the midst of the review, the question every developer hates to hear came up: "Why do we need all of this, though?"  
So we started discussing my solution and in the process it became obvious that, indeed, we did not need large parts of what I had written. There was a much simpler approach to the problem (that I had not seen on my own). It provided a better experience for the end user, was a closer fit for the customers needs and the code for it was a lot less complex.

I could have started arguing - and to be honest, I was tempted - so that the code I had written would go to production[^2]. I liked what I had done after all and I had put a considerable amount of work into it up to this point. Going back to the problem would mean to to spend more time on the development of this feature, in addition to deleting huge parts of my work.  
But trying to hold on to my solution because of my ego would have been wrong: The new solution was better for all stakeholders, so it would improve the whole product in comparison to my approach.

There I was: I had to kill my darling. And I did so, because I knew it was the right thing. It did not feel good. At all. But after implementing the new solution, after seeing the simpler code, after using the feature myself and after showing it to the customer, it's clear that it was the right call. I'm glad I did it.

I think this is an important lesson. You should never take your work personal and get attached to it on an emotional level, as it is hard to stay objective in that situation. Always allow the mere existence of it to be questioned.  
If you think it is the objectively better solution, argue for it, hell, fight for it. But always ask yourself if you just like it because it is something you crafted. And if that is the case, be ready to let it go.

[^1]: I'm Sorry if I'm not really concrete here, but I haven't asked for permission to write about the project, so this what we'll have to work with.
[^2]: I'm sure that my team would not have let this happen. They're great and I'm positive they would have called me out on that.
