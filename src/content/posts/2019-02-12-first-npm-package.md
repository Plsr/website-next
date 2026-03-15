---
title: What I learned writing my first npm package
date: '2019-02-12'

tags: web-dev learning npm javascript
---

At [Railslove](https://railslove.com) we are writing more an more applications
that are JavaScript only, mostly React for web applications or React Native for
mobile apps. Pretty much all of those apps need to communicate with an API at
some point to obtain data.In a lot of these cases, we have been using the
[fetch API](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API) and we
noticed that we wrote the same wrappers around the API for each new project.
This was cumbersome and error prone, so it seemed convenient to just move that
code into a package so it could be reused throughout our various projects.

This is how [Snuffles](https://github.com/railslove/snuffles) was born. It did
not do much in the beginning, just the things we needed in our projects. Over
time, a lot of new features were introduced and Snuffles grew in functionality.
We are currently in the process of identifying what exactly we want from Snuffles and
rewriting the code accordingly.

Since I was in between projects at the time we identified it could be helpful to
have a package for all our fetch needs, I had the chance to be
developing the first release of Snuffles.  
I had used a lot of npm packages before of course, but I never actually wrote
one. This was a really interesting process for me and I learned a lot along the
way. This article goes into detail on some of the things that I learned and
problems I encountered.  
Also, a lot of the things mentioned here I only know because of
[Timo](https://timomeh.de/).

#### Create-React-Library

It turned out that writing the actual library code was not the biggest challenge
I was facing since the gist of the code was already present in some of our
projects and just needed to be adapted. The biggest challange was taking care of
all the things that had to happen in order for the package to be shippable.
For exmaple things like the rollup and transpiling the code using babel.  
This is usually something I don't want to configure by hand, as it can be pretty
cumbersome and at times also cost you a night or two. Luckily, there is
[create-react-library](https://www.npmjs.com/package/create-react-library).

Just like the awesome create-react-app, it gets you up and running for
development within minutes, with a decent default configuration, but for
libraries instead of apps.  
At first, the name seemed a little strange to me, since Snuffles is not a React
library per se, but could be used in any JavaScript project. However, it turns
out that the package is not tightly coupled with React. I removed some files and
folders that I did not see as necessary (like the `/examples` folder) but was
able to continue benefiting form all the configuration and start developing
right away.

#### Local development & linking

Since the code from Snuffles was similar to something we used in a recent project
I was working on, it was convenient to just remove the code from the project and
use it in the package, then use the package in the project to see if something
breaks. Of course, Snuffles has a test suite on its own, but having it
implemented in a real project from the beginning was a nice addition and allowed
covering things like testing different browsers that are not trivial to set up
in a test suite.

However, [linking packages locally can be a bit
tricky](https://github.com/yarnpkg/yarn/issues/1761#issuecomment-259706202) and
this was the case for me as well. Now, I don't recall what the exact problem
was, but I think it was related to having the project managed with `yarn` and
the package with `npm`. While I'm not certain about the causes, I'm very certain
about the solution I was using: [yalc](https://www.npmjs.com/package/yalc).

Yalc creates a local repository for you and allows you to publish your work in
progress packages to this repository, as well as including them from there in
your projects for testing. This made the workflow pretty seamless.

#### Publishing

To be honest, publishing scared me a little. Of course, publishing is always a
little scary because you put out your work in the world, just as publishing this
article will be a little scary, but that was not it. It was rather the process
of publishing. There are commands like `prepublish`, `prepare` and `postpack`
and of course at some point you also have to take care of the versioning. This
whole process felt overwhelming to me. But there is a package for that!  
[np](https://github.com/sindresorhus/np) makes publishing ridiculously easy. You
literally type one command, `np`, and then just follow the brief wizard. It does
all the rollup and packaging for you, asks you what kind of release this is
(minor, major, ...) and adapts the version for you. It even supports 2FA before
publishing.

All in all I had a lot of fun while writing this package and learned a lot along
the way. After using so many packages over the year, it feels good to be able to
finally have given something back to the community (even though Snuffles is not
heavily used; we are somewhere between 50 and 100 installs per week most weeks).
In the future, I definitely want to keep publishing smaller packages, even if it
is just for myself. It's (almost) never wrong to ship something!
