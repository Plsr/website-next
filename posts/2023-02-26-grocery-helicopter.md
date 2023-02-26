---
layout: post
title: Grocery shopping with helicopters
date: '2023-02-26T22:27:26.271Z'
excerpt: Web development has become a lot more complex over time. I think this is a good thing. Also I like helicopters and bikes.
tags: web-dev
---

I think it is safe to say that web development got a lot more complex since... I'm not sure. I haven't been doing this for much longer than 10 years, so this is the only timespan I can judge. It definitely got a lot more complex since then. But I imagine this statement would also have been true 10 years ago. So my working theory is: web development got more complex ever since it started to be a thing. I asked ChatGPT and it agrees.

This rise in complexity has advantages and disadvantages.

It is a lot harder to get started in web development today. At least if you want to build something with state-of-the-art complexity. This is in the nature of the thing, of course. More complex things are harder to build. Now the entry itself is still the same. You would still start learning HTML, CSS, and then some JavaScript. But the road got a lot longer. There's a lot more to learn after that: frameworks, tooling, multiple different devices to be supported, security, and performance to think about. All these things also change rapidly.

There is some amount of effort put into working around that, especially regarding configuration. I probably would have a hard time writing a `webpack` config from scratch today. I could figure it out because I used to write them in the past, but I can't do it from the top of my head. I have not done it in several years. Simply because I did not have to. Tools like `create-react-app` abstracted that complexity away from me. I run a command and I have a configured app that I can tweak if needed.  
I think it's a good thing we try to lower complexity where we can.

I think this raised complexity in development is worth the complexity we get to enjoy in web apps today, though. Here are some I like:

Serverless Computing (Firebase et al.): It's amazing how simple it is to add authentication or a database to an app. The base functionality can be implemented in as little as half an hour. For user authentication or a database. That's great! In a way, this lowers complexity in certain areas. But for it to have happened, web apps had to reach a certain level of complexity first, to even create the need for such a solution.

General features in websites: This point is kind of vague. But I like the complex features that we can use in websites today. There are a lot of examples worth mentioning here, but let's stick with one I noticed recently: embedded editors.  
I looked at [Matt Pocock's typescript course](https://www.totaltypescript.com/) the other day which uses [stackblitz](https://stackblitz.com/) for its exercises. It allows you to edit code inline and run test suites to see if what you did was correct. Embedded right there in the exercise. Without ever leaving the site.  
I regularly spin up a [codesandbox](codesandbox.io) Next.js example to try something out because it is way faster than doing so on my local machine.  
Pressing `.` while watching a repository on GitHub will open a VSCode instance in your web browser that allows to change the project. How awesome is that? The tools we use to build websites can now actually be run in websites. And you can create websites with them. 🤯

I'm not 100% sure which point I'm trying to make here. Maybe you can tell. If you need a point it probably would be this: I like the current state of the web and web development.

I feel like there is a lot of bashing of what comes with the complexity on the development side. Favorable targets seem to be JavaScript frameworks like React. There seems to be this idea that whatever a react app does could also have been a static HTML site with Ruby on Rails behind it. It sure could have been, but it probably would not have been the same experience then.  
I get the point that not everything has to be complex. Some pages just have to be static HTML and CSS to be enough. And that's fine. They should not be more. But I don't believe that the web itself would be better if everything would have stayed with static sites. Also, "JavaScript bad" is a cheap take.

I think of it as helicopters and bikes. They both transport you. But they serve vastly different use cases. Sure, you could go to the grocery store by helicopter, but it would probably be overkill. I'd prefer my bike (I say that now, not owning a helicopter. That point might no longer stand should this circumstance change). But if you need to cover long distances fast, the helicopter is the better choice.  
Helicopters are a lot more complex than bikes. As a technology, they are also a lot newer than bikes. Should we bash them because of that or just accept that they're there and kind of cool and not always the right means of transportation and because of that will not replace bikes soon?

I hope my rambling made some sense to you. I'll leave now. [_chop chop chop_](https://english.stackexchange.com/questions/319884/word-for-the-noise-made-by-a-helicopter)
