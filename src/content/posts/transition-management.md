---
title: Transitioning to the Management Track
date: '2024-12-25T16:03:26.271Z'
excerpt: As of November 2024, I transitioned to the management track for the first time in my career. This is what I learned so far
tags: eng-management
draft: false
---

As of November 2024, I have officially transitioned to Engineering Management.

I acted as a stand-in after our previous Engineering Manager moved on for a while. In the beginning of November, I've asked my manager if we could make it official: I'm no longer an IC, for now at least[^1].

This post serves two purposes:

1. To document this major change. It’s a personal marker for reflection, capturing how I feel now so I can revisit it in the future and see what’s changed.
2. To share what I learn on the way, much as I’ve done with programming. After six months in the role, I don’t claim to have profound wisdom, but I can write about what I learned in my transition, along with tips I’ve gathered from peers, my manager, and reading along the way.

We'll start with a little bit of a personal story here, so if you’re more interested in the practical lessons than my personal journey, feel free to skip ahead.

## The personal part

Looking back, I couldn’t have asked for a better start as an Engineering Manager, though I do miss being managed by my former EM, someone I deeply respect. Acting as a stand-in provided a nice safety net: It allowed me to experiment with the role without fully committing, knowing I could return to being an IC if things didn’t work out. That reduced the pressure I typically place on myself to excel right away.

I think the experience went well, but even if it hadn’t, the fallback was clear: “Thanks for keeping the ship afloat until we backfilled the role.” This freedom allowed me to focus on learning and absorbing the nuances of the job. However, I’ll admit there were limits to how fully I could embrace the role while keeping the door back to IC open. For instance, I hesitated to engage deeply in career counseling. Shifting the team dynamic in that way felt risky when there was a chance I’d soon return to being a peer.

When I officially stepped into the role, I was thrilled (and still am!). Working with people is vastly different from working with computers. Computers, as complex as they can be, are deterministic: they behave predictably if you understand their systems well enough[^2]. Humans, however, are anything but predictable.
You might leave a discussion feeling like everything is on track, only to wake up the next day and find the situation has completely shifted. Why? Maybe someone didn’t sleep well. Maybe they had a great conversation with someone who offered new perspectives. Or perhaps their mood simply changed. It could be anything. As a manager, your job is to uncover what’s changed and guide people back onto a positive trajectory. It’s an intimidating task, but it’s also one of the most fascinating parts of the role.

While it’s exciting, the job is also demanding in ways I hadn’t anticipated. As an IC, I often took programming problems home with me, but those were puzzles to solve, intellectually stimulating and self-contained. Taking people problems home is a different matter entirely. These problems affect real lives, so the stakes are higher.
For me, this was a difficult adjustment. As an introvert, I ended most days completely drained. Being an IC recharged my social batteries; being an EM depletes them. I’ve had to develop strategies to manage this and prevent it from impacting my personal life too much. It’s an ongoing area of focus for me.

After six months of experimenting and taking on increasing responsibilities, I decided to fully commit to the role. I’m incredibly grateful to work in an environment where this transition was supported at every step.

## What I learned

Stepping into this role, I was fortunate to receive guidance from experienced technical managers within Gigs, as well as from external resources like books and essays. There was _a lot_ of advice, and I did my best to absorb and document it all. In here, I want to focus on the ones that seems most interesting or surprising to me.

### You are now a multiplier, not an addition

The first piece of advice my manager gave me when I stepped into the role was this: **Your impact is no longer additive—it’s multiplicative.** This is also reflected in many books and essays on management, and it fundamentally reshapes how you think about your contributions to the team.

As an IC, you’re another pair of hands writing code. As a manager, you step back, observe, and look for opportunities to amplify the team’s effectiveness. You turn knobs and pull levers to enable the team: removing blockers, fostering collaboration, or simply helping someone see a clearer path forward. I don't think it's the title or unique skillset that allows you to do that. It’s the perspective you gain by having the _possibility_ to step away from the day-to-day grind of shipping code.

One concept I found particularly engaging is thinking of this role in terms of measurable impact. Imagine a team of five engineers, each contributing a productivity level of 1. When one becomes a manager, the team's direct productivity drops to 4. To offset this, the manager must multiply the team’s output by at least 25% (turning that 4 into 5) to break even. Anything beyond that is a win for the team and the organization.

If anybody knows how to reliably measure productivity by the way, please let me know.

### Everything is about people

This one was surprising to me. I expected a significant part of my role to involve people topics, like conducting 1-on-1s and ensuring the team could collaborate effectively without being blocked by personal issues. But I also work on non-people-related tasks, such as aligning projects with our PM, doing early technical explorations or working on team processes. Surely, not everything in this job revolves around people, right?

Nope. It does.

Every issue I’ve encountered so far ultimately traces back to people. And when you think about it, this makes sense: every decision, every challenge, and every success is the result of people working together. People bring different ideas, agendas, and perspectives to the table. Sometimes these align beautifully; other times, they clash. Resolving these conflicts becomes much easier if you've built strong relationships.

One piece of advice I received that stuck with me is this: **always err on the side of people.** Most people act with good intentions, even if their methods or priorities differ. The key is to understand where they’re coming from, identify the disconnects, and figure out how to move forward together. It’s not about who’s right. It’s about finding a shared "right" that aligns everyone toward the same path forward.

### You have to learn to say no

The job is exciting, and if you’re like me, you’ll want to do everything. You’ll want to do a great job and dive into every opportunity that sparks your interest. But the reality is, there’s simply not enough time, and you need to communicate that.

Saying no is never easy, but it’s important. To be honest, I'm mostly writing this one down as an active reminder to myself: This is advice I’m still learning to follow. My manager once described my new role in a way that resonated: **You’re now a team of one, with your own backlog.** And there are always more items in your backlog than hours in the day.

There's an interesting [quote by James Sexton on this when he was in the Lex Friedman podcast](https://www.youtube.com/watch?v=fUEjCXpOjPY&t=12118s):

> You know, the feeling at the end of the day when all your homework or all your work is done, and you just go, “Okay, it’s all done now, and I’m going to go home.” You’ll never have that feeling ever again ever. You’re just going to everyday go, “All right, it’s enough. It’s enough. I got to get out of here.”
>
> Because with every one of these cases, you could stay up 24 hours focusing just on it. So, you have to have the discipline to go, “No, that’s it. I’m done for now. I’ve done what I could do today, and now I’m going to sit and read for a half an hour. I’m going to watch this show for a half an hour. I’m going to have this meal,” because It’s never done. So, that’s challenging. That’s a hard part of this job [...].

This isn’t a bad thing, it’s just the nature of the work. The key is to accept that you can’t do it all while ensuring the important things don’t get left behind. It’s a balancing act I’m still figuring out, but acknowledging the limits of your time is the first step.

### Delayed feedback loops

Working on a product (should) come with short feedback loops. You ship something and know almost immediately if it’s broken. Within hours, stakeholders might identify areas for improvement. Within days (or at most weeks) you know whether the feature made an impact on the product and its users.

Management, on the other hand, operates on a much slower timeline. My feedback loops now span weeks, sometimes months. When I give someone feedback, they don’t instantly adapt their approach. It takes time. Maybe we need to talk a few times about the thing to get to the bottom of it. If the person acknowledges the issue as an issue and is willing to change their behavior, this process takes time as well. Progress is incremental, almost imperceptible. Then, perhaps two months later, you realize the thing you addressed isn’t happening anymore. But even then, you can’t be certain whether your input was the deciding factor.

A concrete example: a few months ago, I began documenting our technical debt. Starting this process took a few days of focused effort, and I now spend an hour here and there maintaining it. At the time, I believed the investment was worthwhile, but I couldn’t be sure. Now, months later, discussions about tech debt have expanded across the organization, and having a document has been immensely helpful. Just recently, a team member referenced it in a design document, so I assume that it is helpful.

### You will look into the abyss

As an engineer, you usually have at least one organizational layer above you that puts a lot of effort into structuring the information you need. This layer ensures you can focus on your work without being overwhelmed. Transitioning into management means stepping _into_ that layer. This means the information you have access to and have to deal with is far from structured: it’s messy, fragmented, and sometimes overwhelming.

Someone once referred to this as "the abyss," which I find to be a fitting description.
I'm not sure who it was, but when they told me about it, they called it "the abyss". It’s a vortex of stakeholders, ideas, roadmaps, and priorities, all in varying states of clarity. Before anything becomes actionable for your team, this must be shaped into something coherent that aligns with the organization’s goals. There are multiple people involved in this process, but chances are that as an Engineering Manager, you’re the first technical point of contact in this process.

While this sounds intimidating, it’s also one of my favorite parts of the job. Watching an abstract idea evolve into a clear plan, passing it to the team and hearing them say "yeah, that makes sense, we understand where we're going with this and why" is incredibly rewarding.

This also does not mean the the organization I work in is particularly chaotic (I think the contrary is the case). I think this happens in every organization, eventually, naturally.

### If you make a mistake, own it

There’s this myth that leaders must always know everything and never make mistakes. That’s nonsense. Every leader (every person, really) will eventually make a mistake. The real measure of a successful leader isn’t perfection. It’s ensuring you make more good decisions than bad ones over time.

When you do make a mistake, you must own it. Owning your mistakes fosters a culture of accountability. Of course, the ideal scenario would be to avoid mistakes altogether. But since that’s impossible, the next best thing is a team where mistakes are acknowledged and addressed, rather than downplayed or hidden. By taking ownership, you can often minimize the damage and even turn the experience into a learning opportunity.

This culture cannot be created solely by leaders who own their mistakes, but leaders often set the tone in an organization. As role models, their behavior carries extra weight. Leaders often have _some_ authority, which causes them to act in a more public way. How they handle mistakes sends a message.

The takeaway is simple: **act the way you want everyone else in the organization to act.** Own your mistakes openly, and you’ll create an environment where accountability and growth are valued.

### You will be the one making the hard decisions

Remember that time you had a coworker acting like a jerk, so you reported it to your manager? Then you went back to coding, and a few weeks later, you realized, “Oh, Bobby’s not doing that thing anymore. Nice!” Guess what: that’s your responsibility now.

It's now up to you to figure out if there’s something to the report or not. It’s your job to have the hard conversations with Bobby. And if his behavior doesn’t improve, it’s also your job to decide what happens next. Ultimately, you might be the one telling Bobby he no longer has a job because his actions are harming others[^3].

The safety net you had as an IC is much thinner now. Yes, you still have your own manager, and you can lean on them for guidance and support. But in a sense, as a manager, [you have no human rights](https://yosefk.com/blog/managers-have-no-human-rights.html). You’re no longer protected from the messiness of these decisions. You’re the one responsible for resolving them.

---

These have only been a few of the lessons that I picked up along the way so far, but it are the ones that I could already see evidence of being true in my journey. Moving from IC to people management has been a big shift, sometimes messy, sometimes rewarding, and always a little unpredictable. I'm looking forward to learning more about this and becoming a better manager.

[^1]: This does not mean that I intend to switch back any time soon. But there is the [engineer/manager pendulum](https://charity.wtf/2017/05/11/the-engineer-manager-pendulum/).

[^2]: They might not always _seem_ deterministic. If often see myself wondering "why is that behaving this way", but I think if you're able to understand enough of the system around it and keep zooming out, eventually you'll understand and if the exact same conditions can be replicated, the computer will behave the same again.

[^3]: I should make clear that this is not a real example of what happened in my current team, but something I witnessed as an IC prior in my career.
