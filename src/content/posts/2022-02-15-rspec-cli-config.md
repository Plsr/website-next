---
title: RSpec command line config
date: '2022-02-15 23:07 +0100'
tags: web-dev rails
---

If you are using RSpec to test ruby code, you probably have a preference for how your output should look. I think a lot of people like the default output format that looks like this:

```
....F.....*.....
```

Obviously, this is wrong. I tend to put a lot of effort in my `describe context it` texts to make sense when read out after another, so I want to see it. I earned that. I don't want no `F...F*...F..F`, I want the beauty of my prose to touch my eyes and my soul.

Obviously, I want the `documentation` format that looks like this:

```
a method
  with a :param set
    does something that passes
    does something that fails (FAILED - 1)
    does something that is pending (PENDING: No reason given)
    does something that is skipped (PENDING: No reason given)
```

However, in your CI, you probably don't want half a book printed. Some people prefer color, while others do not like the funky reds and greens distrubing their monochrome terminal asthetics.

What I'm trying to say is: it's subjective. Also, it's tedious to always remember to run your rspec commands with `--format documentation --color`.

Luckily, you can [configurate this from files](https://relishapp.com/rspec/rspec-core/v/3-10/docs/configuration/read-command-line-configuration-options-from-files). In your home directory, you can have an `.rspec` file to make rspec right for you, globally. Mine looks like this:

```
--format documentation
--color
```

If you wanted, you could even add an `.rspec` file in the root of a project, to force your configuration on your teammates. So, you know, the prose can touch their souls as well (You'll probably have to force-push this to main on a saturday to get through with it).
