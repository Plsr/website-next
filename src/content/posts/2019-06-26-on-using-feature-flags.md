---
title: On using Feature Flags
date: '2019-06-26 17:24 +0200'
tags: programming
---

Imagine working on on a redesign inside an existing product. Maybe it's just a small feature that needs an overhaul, or maybe it's a complete redesign of something that may takes months to finish.  
Knee deep into it, with many changes done and halfway through it, you and your team notice that gnarly bug in production that is costing the product lots of money. It needs to be fixed as soon as possible.  
This is where things get tricky. It's not an unsolvable problem, but chances are that the are rollbacks involved or the bug fix cannot be tested on your staging environment because the half-finished redesign is deployed there. Things get confusing for the team.  
Maybe this does not sound like a problem to you, but I get sweaty palms doing things like these. Now you have a lot of internal knowledge that has to be passed between team members: Which branch is deployed on production? Which one on staging? And what has to be done in order to deploy to either of the environments? How do we make sure that nothing is lost or gets corrupted in this process?

Enter: Feature Flags. To get a grasp of what they are, I suggest you read [this article](https://martinfowler.com/articles/feature-toggles.html) by Martin Fowler, which explains it in detail, but in a Nutshell: Feature flags are small code snippets that regulate who can see which feature under what circumstances. For example, only admins can see the new feature. Or only the user with the ID 5. Or just every 10th visitor.

We started working with Feature Flags in the late summer of 2017, while doing a complete redesign of an online shop that was getting a good amount of traffic and needed to stay maintainable while we were working on the redesign.
When I first used Feature Flags, I wasn't a big fan. There were a couple of reasons for it.

First, using Feature Flags was adding an additional layer of complexity to the project that I was feeling was not bringing us closer to our goal. The fact that I never worked with the concept and it took me a while to wrap my head around it may have had some influence on that perception. But it is a fact that this is extra code in your project you need to maintain and think about.

Second, I no longer had the feeling that our code was deployed from a single source of truth. Before, there was the master branch, and what was in the master branch was visible to the public, period. Now, there was techbically still only the master branch, but what it revealed to the public was out of the direct control of the code I wrote. It was dynamic, and that was making me a little nervous.

However, we have now been working with Feature Flags for about a year and I have gotten attached to the concept since. I only started to notice a lot of the benefits after using them for a while, so I now have a different view on the concept:

What I thought about the single source of truth was actually wrong. Coming back to the example above, there is no single source of truth anymore once you start to deploy different branches on different environments. Feature Flags allow you to always deploy master, no matter what. Couple that with a good CI and this feels really stable.

It is also awesome for testing, especially for testing with production data. You can set up your staging environment with a production database dump and get the environment to mimic production very closely, but with a Feature Flags, you could deploy to production, only make the feature available to yourself and test with real data.  
It's also great for letting customers test things. No need for remembering two credentials for two environments, just clear the customers account for the feature.

What I like most is that a change can be deployed immediately. Even if it is not available to all users right away (or to none at all), there is no need to worry about a "Big Bang" deploy from staging to production on day X and hoping that nothing breaks. You just change a flag from "some users" to "all users" and you are done.  
If things get nasty, you just disable the feature again and everything is fine. No need for someone sitting in front of a laptop on a Saturday, trying to roll back a broken feature with sweat on their forehead. Depending on how you set it up, you can just disable the feature from your mobile phone.

Right now, I'm at a point where I'd rather have no staging environment at all and just flip all the features. This is something past me from two years ago would have hit me in the face for. But what does that guy know, anyways?
