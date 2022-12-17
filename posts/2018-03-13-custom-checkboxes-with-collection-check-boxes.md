---
layout: post
title: Custom checkboxes with collection_check_boxes
date: '2018-03-13 17:25 +0100'
tags: web-dev rails
---

_DISCLAIMER: This is one of the posts I'm writing to help myself learn new things. This is probably not the best way to do this. If you have a better way, please let me know_!

Today, I found myself in a situation where I needed to build some custom
checkboxes inside a Rails app. Now, custom checkboxes are not that uncommon when
it comes to frontend work, but in my form, I used `collection_check_boxes` to render a
set of checkboxes and I never had to apply custom styles to those.  
I'm going to split this up in two parts.

#### The Markup

Let's say we want our result to look something like this:

![checkboxes example]({{ "assets/images/checkboxes.jpg" | absolute_url }})

The checkbox looks a little like a button, and when checked, it should render a
solid background with a white font.  
The markup for this looks rather simple:

```html
<label class="custom-checkbox">
  <input type="checkbox" class="checkbox" />
  <span class="custom-label">Label</span>
</label>
```

The [checkbox-hack](https://css-tricks.com/the-checkbox-hack/) has been around for a while now, so the following CSS should
be no suprise to anybody:

```sass
.custom-checkbox
  position: relative

  // Hide default checkbox and move it out of the way
  .checkbox
    position: absolute
    opacity: 0

  .custom-label
    display: inline-block
    padding: 14px 30px
    border: 1px solid grey
    border-radius: 4px
    font-size: 18px
    font-family: sans-serif
    cursor: pointer

  // Apply styles to custom-label when the original checkbox is checked
  .checkbox:checked ~ .custom-label
    color: white
    border-color: #00CBA2
    background-color: #00CBA2
```

Here, we are using the fact that not
only the checkbox itself can be clicked to check or uncheck it, but also the label. We're now hiding the default checkbox and styling the contents of the
label (which is just a `span` in this example) to our likings. When the label is clicked (and thus the checkbox checked), we
simply change the styling of the custom label to refelct the state of the
checkbox we desire (you can try this out in [this simple pen](https://codepen.io/christianmitc/pen/wmMWGm)).  
From a pure CSS/HTML standpoint, we reached our goal.

#### The Rails Part

In my from in rails, I was using the following line to render a list of
checkboxes for categories:

```ruby
= f.collection_check_boxes :category_ids, Category.all, :id, :name,
include_hidden: false
```

There are several ways to get to the markup I described above, but I did not
want to forgo the comfort of using `collection_check_boxes`.  
After some searching, I stumbled accros [this answer on
StackOverflow](https://stackoverflow.com/a/12037625/4181679). Even though it was
answering a question about `simple_form`, I tried to adapt it to my `form_for` setup.  
Here's what I ended up with:

```ruby
= f.collection_check_boxes :category_ids, Category.all, :id, :name, include_hidden: false do |b|
	= b.label(class: 'custom-checkbox') do
		= b.check_box(class: 'checkbox')
		%span.custom-label= b.text
```

This way, I could have both: Custom styled checkboxes and the advantages of using `collection_check_boxes`.
