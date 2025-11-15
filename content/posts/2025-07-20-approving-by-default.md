---
title: Approving by default
date: '2025-07-20T08:20:00.000+02:00'
tags: programming
draft: false
---

A couple of weeks ago, I came across [a podcast episode by Ryan Peterman](https://www.youtube.com/watch?v=QUhC5BDZt-E) (which I didn't know until then, but highly recommend if you're interested in programming, organizations and career development) with Jake Bolam, who is an IC8 (Principal Engineer) at Meta. I enjoyed the entire episode a lot and would recommend listening to it, but one idea in particular stood out to me.

Jake mentioned that he always approves all Pull Requests he reviews. He goes through them, he notes his remarks, but he always approves them. That goes as far as approving something that might break production if merged unaddressed.

My initial thought was that this was crazy. We use GitHub at work and it gives you three buttons, "Approve", "Comment" and "Request Changes", probably for a reason. Why only use one of them, especially if you notice big flaws?

But as I often do with ideas that initially sound crazy to my, I gave it a shot, just to see if there is something to it. I've been approving every single Pull Request I reviewed for the past couple of weeks now. This post is about why I will continue doing it.

# The team

I think initially, this caused some confusion in my peers. Usually, we would approve only if there are nitpicks that we did not feel strongly about. As soon as there was something "bigger", we usually comment (which will not allow the author to merge the PR) or request changes (which does the same, but adds a lot of red text that screams at you). There is another argument to be had about the differences of using "Comment" and "Request Changes", but this is not the place for it.

When I started doing this, I did not tell anybody, I just started. There were now instances where I commented that something would not work in production or was clearly different from how we usually do things, but approved it anyways. Coming from our current workflow, this was somewhat unintuitive. However, I did not get any personal questions about it either, so it does not seem to be such an outlandish idea after all.

Sometimes, especially in the beginning, people would re-request a review after they chose to address some of the things I mentions, following our current approach. I feel like this has happened less and less over time, probably as people became more used to this approach.\
What is most interesting to me now is figuring out wether or not my peers will follow the same approach or not. This will likely be the best metric to figure out if it is useful or not.

# Trust

What I like about this approach is the amount of trust it communicates. What it says is "Hey, here's a thing I think, I trust you to make the best call here, I won't block this being merges artificially because I don't think I have to control your work."\
Of course there are instances where we discuss things or people want my opinion again after changing the solution, but I trust them to pull me in, if needed. It also makes the release process much faster, because everything is already approved, you can just merge when you're done.

For that to work, I have to be very clear in my communication. First, I have to make sure that the comment I'm about to add actually provides value. I have deleted a lot of comments half way in the past weeks, because I realized it was just my personal preference on a solution that would not change the outcome at all. Keeping the noise down is essential (I think that is true in general).\
When I comment something, it's important that my peer has no doubt about wether what I mentioned is just a "in case you didn't know, we sometimes solve it like this but I don't feel strongly about doing it that other way here" or a "if you solve it like this, it will break production".

This approach helps me to level up the quality of my reviews a lot. If the comments are written well, this can also remove a lot of discussions where you are just trying to figure out who feels more strongly about a thing. Be design, my approval already means I feel less strongly than you. So if that's not the case, I need to make sure that is clear in my comment.

# Ownership

What I like so much about this approach, in general, is that it removes this artificial safety layer. If you feel like you're working in a team that really needs to be able to block each others' Pull Requests because otherwise there will be too many issues pushed to production, this is a problem in your team, and you're not solving it by adding a process in a software you're using.

If you are commenting about topics that you think are really important, but your peers just ignore it and merge anyways, this is a great indicator that your values as a team don't align. This is a nice chance to talk about this friction and figure out a path forward that the team agrees on (please not that this may mean it will just not go your way. If this makes you feel nervous, this might also be a great indicator that you have something to work on about yourself).

I'm working exclusively with senior engineers at this point, and you might say that this would not work with mid-level or junior candidates. I think it would work even better. People grow and learn if you give them a lot of freedom and responsibility. A senior engineer telling a junior "Hey, I've spotted this thing in your code that will totally break the system, but since you now know about it, I trust you to fix it before you merge this" will make for a much more impactful learning in contrast to "Here's an issue, try to fix it and I will check in again and tell you when I think you did it right".

You might say that not everyone has that much agency or level of care. And that's fine, I get that. Depending on the team you're building, either this practice can be a nice indicator on wether or not someone fits in the team, or it does not work for your team at all. I prefer to work on teams where this works.
