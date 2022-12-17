---
layout: post
title: Building a simple tag system for jekyll
date: '2022-02-12 22:38 +0100'
tags: web-dev jekyll
---

I wanted a simple tagging system for this site. It had to do two things:

1. Display one or muliple tags on posts
2. On click, navigate to a page that lists all the posts tagged with that tag

In the future, I might want to add an index page that holds a list of all the tags used on the site
as well, but for now these two points will be enough.

Looking into the topic, I found a good starting point [here](https://blog.lunarlogic.io/2019/managing-tags-in-jekyll-blog-easily/).
However, I did not like the fact that a hook would generate an empty markdown file for every tag used on this site in a folder.
I understand that this might come in handy if you wanted to have some custom markup for special tags. Since this is not
something I plan on doing, I tried something different.

The tagging system I built for this site works like this:

- I have a `tag` layout defined
- Upon building the site, go through all posts and fetch all the tags
- For each tag, create a new html site in the `_site` folder with the `tag` layout
- Done

This allows me to not have any markdown file lying around for the tags. For full disclosure, I have to admit that I
don't know how performant this will be for large sites. I simply did not write enought yet...

## In detail

My `tag` layout is pretty much the same as in the post linked above:

{% raw %}

```html
---
layout: default
---

<div>
  <h2>All posts tagged <span>#{{ page.tag-name }}</span></h2>

  <ul class="a-articles-list">
    {% for post in site.posts %} {% if post.tags contains page.tag-name %}
    <li>
      <h2><a href="{{post.url}}"> {{ post.title }} </a></h2>
      <span>Published on {{ post.date | date_to_long_string }}</span>
    </li>
    {% endif %} {% endfor %}
  </ul>
</div>
```

{% endraw %}

For the page generation, I used a local [generator plugin](https://jekyllrb.com/docs/plugins/generators/). I called it
`generate_tags.rb` and it lives in the `_plugins` folder. You can name it whatever you want as long as everything lives
in one file. Jekyll does not care. It loads the plugin and runs it.

In the generator, I have my custom `Jekyll::Page` defined:

```ruby
class TagPage < Jekyll::Page
  def initialize(site, tag)
    @site = site
    @dir = 'tags'
    @basename = tag
    @ext = '.html'
    @name = "#{@basename}#{@extension}"
    @data = {
      'tag-name' => tag,
      'layout' => 'tag'
    }
  end
end
```

This does two things (besides some boilerplate Jekyll needs):

1. Create a file named like the tag passed in, in the `tags` folder, with the `.html` extension
2. Define `tag-name` and `layout` in the data hash. Thats what we usually define via the frontmatter in `.md` files

For the generator itself, I have two short functions:

```ruby
def tags_on_posts(posts)
  posts.docs.map{ |p| p.data["tags"]}.flatten.uniq
end

def generate(site)
  tags_on_posts(site.posts).each do |tag|
    site.pages << TagPage.new(site, tag)
  end
end
```

`tags_on_posts` just loops through all posts and returns the unique tags used on the site.  
`generate` then loops through all of those, creates a new `TagPage` for each tag and adds them to the sites pages.

That's really all there is. Here's the complete code from my `generate_tags.rb`:

```ruby
module GenerateTags
  class TagPageGenerator < Jekyll::Generator
    safe true

    def tags_on_posts(posts)
      posts.docs.map{ |p| p.data["tags"]}.flatten.uniq
    end

    def generate(site)
      tags_on_posts(site.posts).each do |tag|
        site.pages << TagPage.new(site, tag)
      end
    end

    class TagPage < Jekyll::Page
      def initialize(site, tag)
        @site = site
        @dir = 'tags'
        @basename = tag
        @ext = '.html'
        @name = "#{@basename}#{@extension}"
        @data = {
          'tag-name' => tag,
          'layout' => 'tag'
        }
      end
    end
  end
end
```

The last thing to do is to add links the the posts tags in the layout (once again, taken from the blogpost linked above):

{% raw %}

```html
{% for tag in page.tags %} {% assign tag_slug = tag | slugify: "raw" %}
<a><span>#{{tag}}</span></a>
{% endfor %}
```

{% endraw %}

Now I can just add tags to to frontmatter of a post and everything else will be taken care of when the site is built:

```md
---
layout: post
title: Building a simple tag system for jekyll
date: 2022-02-12 22:38 +0100
tags: web-dev jekyll
---
```

<br>
