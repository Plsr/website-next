---
title: VS Code Search Editors
date: '2023-03-06T23:36:26.271Z'
excerpt: On the usefuleness of search editors in VS Code
tags: programming tools
---

You probably know how to do project wide searches in VS Code: go to the magnifying glass in the sidebar or hit `cmd + shift + f` (you definitely want to use the keyboard shortcut for speed here) and search for whatever you need. VS Code will then go ahead and list all the places where what you searched for is referenced. Most of the time, this is enought. But it has its limitations.

Here’s a situation I find myself in some times: While working on something, I come across something I have not seen yet, let's say a hook. Because I’m quite emerged in my work, I look at its name, get a vague feeling about what it might to and then want to look up all the places where it is used. I’ll probably need to look this information up quite often during my current task, so I just keep the search results open.  
Some time passes by and I realise I’ll have to refactor a component. I better take a quick look if this is used in some places I did not expect.  
Some more time passes. I need the references of the hook again. Damn, what was it called again?

I recently learned about search editors in VS Code. They look a lot like what project wide searches look like in Sublime Text: They’re just an editor tab with all the search hits in them.

![Search editors in VS Code](https://ik.imagekit.io/chrisjarling/search-editors?ik-obj-version=yVcnVaOaymFt.u5Eh1ipfGHosS7yfqg7&ik-sdk-version=javascript-1.4.3&updatedAt=1678139773853)

The fact that they are just regular editor tabs is what makes them great. You can have multiple tabs open. This means you can have multiple search editors open. Which solves my problem from above. You can just keep the first one open and then create a second one, allowing you to jump between them. They even show up in in the file search. You can also save them to the codebase if you really don’t want to lose them or want to share them with teammates.

There’s a number of ways you can open them:

- From the command palette (`cmd + shift + p`) chose “New search editor”
- Form the sidebar search, after having performed a search, click “open in editor”
- Form the sidebar search, hit the open new search editor icon in the top row

There’s also some more info about them in the [VS Code docs](https://code.visualstudio.com/docs/editor/codebasics#_search-editor).

I don’t use search editors very often, but they do come in handy from time to time, so I’m really happy I found out about them.  
Maybe I should read the VS Code docs more. Who knows what other useful features they built into this thing?
