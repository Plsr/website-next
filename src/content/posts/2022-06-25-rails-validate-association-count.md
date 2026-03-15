---
title: Validate association count in Rails
date: '2022-06-25 11:51 +0200'
tags: rails programming web-dev
---

Say you have a `Post` model that should have a maximum of 3 `Tags` asscotiated to it.
There are multiple ways to achieve that:

### Use the built in `length` validation

In `models/Post.rb`:

```ruby
has_many :tags
validates :tags, length: { maximum: 3 }
```

The default error message for this would similar to "tags too long". This sounds weird, so the translations should be adapted: `en.activerecord.errors.models.posts.attributes.tags.too_long`

### Custom validation

```ruby
  has_many :tags
  validate :tags_count

  def tags_count
    errors.add(:tags_count, "not more than three tags allowed") if tags.size > 3
  end
```

The adventage here is that no translations are needed.  
Since almost all applications I work on are multilanguage and have to be translated, I prefer the first method. It is also more readable.
