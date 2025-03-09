---
title: Updates on this site
date: '2022-06-06 23:08 +0200'
tags: blog programming
---

I used the day to make some updates to the site that I wanted to do for a while now.

## No more webfonts

I removed all webfonts from the site. It now uses _Trebuchet MS_ for almost all texts (except for code
lines, which are set in _Courier New_).

I thought about this for a while now. Currently, I try to simplify my life in a lot of areas, both digital and analog.
Having no webfonts on this site sounded like a good idea in terms of simplicity. I still have this thought in the back
of my head though, that a website with a good design has to be fancy. But I think you can also look at design this way: Good
design provides the best outcome based on the restrictions it has. So for this site, the restriction is no webfonts. And
for that, I think the design works well.

This also has the nice effect that I now have a score of 100 on [Pagespeed insights](https://pagespeed.web.dev/).

<figure>
  <div class="image-split">
    <img src="https://dlulzqpyd0pcw.cloudfront.net/pagespeed_before.png" />
    <img src="https://dlulzqpyd0pcw.cloudfront.net/pagespeed_after.png" />
    </div>
  <figcaption>Pagespeed insights before and after removing webfonts</figcaption>
</figure>

So, except for [utteranc.es](https://utteranc.es/) that I installed as a test, this site uses no external resources.  
Well, that's not the whole truth.

## A thousands words is a lot of words

I (finally) set up a system to use images in here. I'm using an S3 Bucket for storage with a CloudFront distribution
on top. I'm curious how much I'll have to pay up at the end of the month. Also, I still do not like the experience of
the AWS console.
