---

title: Finding large folders in macOS
date: '2023-05-04T21:18:26.271Z'
excerpt: There's a cool way and a not so cool way. This is the cool way.
tags: cli
---

**tl;dr:** Use `du -sh */ | sort -hr` to find large folders or [set the "calculate all sizes" option](https://www.macrumors.com/how-to/view-folder-sizes-on-your-mac/) (it's not as cool as doing stuff in your shell).

The other day, I wanted to upgrade macOS and was greeted by a dialog telling me that I did not have enough storage to install the update. Upon checking my storage, I realised that macOS hat about 120GB of my 256GB SSD allocated to “System Storage”.  
The accepted solution to fixing this seems to be searching through `Library` folders until you find the beefy folders that take a lot of space (likely Docker or Xcode Emulators) and delete those you don’t need. Shouldn’t be too complicated.

Enter Finder: Finder refuses to tell you how big folders are in its list view. You have to inspect the folder individually (either by choosing another view or by pressing `cmd + s`). That’s a _somewhat_ tedious task to perform for a few hundred folders.

![A finder window, not showing the size of folders](https://ik.imagekit.io/chrisjarling/253784FE-5001-425A-8F24-EF43FC3DC68C.png?updatedAt=1683227409066)

Luckily, macOS is built on unix and unix is great.  
Unix comes with a program called [`du`](https://man7.org/linux/man-pages/man1/du.1.html). `du` estimates disk usage of files and sounds like just the functionality we need. Running `du -sh */` inside a folder will display a single entry per file (`-s`) and display the usage in a human readable way (`-h`).  
We can use that output and pipe it to [`sort`](https://man7.org/linux/man-pages/man1/sort.1.html) which… well, it sorts lines of text or binary files. Here, we want to use the `-h` flag as well so it can sort units like Megabyte and Gigabyte properly and also reverse the order (`-r`) so the larges files come first.

That leaves us with the final command `du -sh */ | sort -hr`.

```
~/Desktop
⟩ du -sh */ | sort -hr
78.2G	homework/
504K	do-not-touch/
428K	stuff/
```

Running this in all the Library folder macOS has will quickly lead us to the big folders.
