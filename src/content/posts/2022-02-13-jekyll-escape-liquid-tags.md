---
title: Escpae liquid tags in jekyll code blocks
date: '2022-02-13 10:38 +0100'
tags: web-dev jekyll
---

In my [last post](https://christianpoplawski.de/blog/2022/simple-jekyll-tagging) I learned that jekyll processes all liquid tags on a page, no matter if they are in a `code` block or somewhere else on the page.

So if I write something like

```html
{% for index in (0..3) %} {{ index }} {% endfor %}
```

the actual output would be

```html
0 1 2 3
```

as the liquid tags get executed.

To stop this behaviour, the [jekyll documentation](https://jekyllrb.com/docs/liquid/tags/#code-snippet-highlighting) offers two solutions:

1. Wrap the code block in `{% raw %}` and `{% endraw %}` tags. The example above would become

````html
{% raw %} ```html {% for index in (0..3) %} {{ index }} {% endfor %} ``` {%
endraw %}
````

2. Add `render_with_liquid: false` to the posts front matter, to disable it for the whole document
