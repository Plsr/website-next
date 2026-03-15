---
title: Conditional classes for the :host in Angular
date: '2020-09-24 09:19 +0200'
tags: web-dev angular javascript
---

Working with Angular is... interesting. Coming from React, I find it hard to grasp because there is a lot of functionality in it, it is verbose and in general feels like enterprise software. The flip side of that is, that for every problem you encounter, the framework probably already has a solution integrated. The challanging part is to find it.

The other day I was working on a new component. It was similar in styling to a component that we already had in our project, but different enough in the way it was used to be its own component with its own name. So I created a new component and imported the stylesheet of the component I wanted to use as a basis so I could extend its styling.

The component I was building on did not render more than an `<ng-content></ng-content>` in its template and thus was using the `:host` pseudo-class for styling[^1].

## The `:host` pseudo-class

To understand what my problem was, we first need to understand the concept of the `:host` pseudo-class.  
The `:host` pseudo-class only is effective inside the shadow DOM and as the name suggests, it selects the host of a custom element (in our case, our component is this custom element).

Even though the `:host` class is not an Angular concept per se, lets use Angular to illustrate the usage of `:host` with a concrete example.

Let's image we have a class like the one I was describing above. It is a simple UI component that does not accept any properties and handles no logic other than taking some content and wrapping some styling around it. Something like a card might be a realistic example.

In this case, the `component.ts` file might look like this:

```jsx
import { Component, Input } from '@angular/core'

@Component({
  selector: 'app-card',
  template: '<ng-content></ng-content>',
  styleUrls: ['./card.component.scss'],
})
export class CardComponent {}
```

We can now call this component in our app:

```html
<app-card>
  <h2>Hello Wrold</h2>
  <p>How's it going?</p>
</app-card>
```

Here, the host of our component would be the `<app-card>` selector; it hosts the content of the component.  
You may have guessed it by now, but this is also what we can target using the `:host` class in css. If we wanted to give our card a background, this is the css we could use:

```scss
:host {
  background-color: #f8f8f8;
}
```

In essence, the `:host` selector allows us to style a component _form the inside out_.

### Why not divs and classes?

The short answer to this question is: Because we don't have to, so why should we.

You could achieve the same effect with wrapping the `<ng-content>` in a div with a class and then apply the styling through this. Out template then might look like this:

```jsx
template: '<div class="card"><ng-content></ng-content></div>',
```

While there is nothing inherently wrong with this, there are a couple of reasons against this in my opinion.

First: KISS. There is absolutely no need to introduce a DOM-Node for styling, so we have a great opportunity of avoiding complexity here. I'm all for using it.

Second, we are now encapsulating the content of our card inside another DOM-Node, limiting the amount of styling we can apply to it _from the outside_. Styling the host does not only work from the inside of the component, it also works from the parent component. Inside the parents styles, we can select our card as well, since it is basically just a DOM-Node:

```scss
app-card {
  display: flex;
  flex-direction: column;
}
```

With a wrapping `<div>`, this would have no effect on the actual content we are passing in to the `<app-card>` component.

---

Now that we have a basic understanding of the `:host` pseudo-class, lets get back to the example I constructed in the beginning of this article.  
The new component I was building needed to have conditional classes based on the value of an `@Input`. Applying conditional classes is no problem in Angular, as you can use the `[ngClass]` directive. But the only tags my new component rendered where `<ng-content>`, which does not accept classes. And because I wanted my component to be usable in the same way as the component I built upon, I could not add a wrapping element for styling.

## Adding conditional styles to `:host`

Luckily, there is also a `:host()` pseudo-class function. The function accepts a class name an only applies the styling defined in the function to the host if the host has the given class set on it.

Sticking with the card example from above,

```scss
:host(.pink-text) {
  color: pink;
}
```

would only have an effect on the instances of card with the `.pink-text` class set on it:

```html
<app-card class="pink-text">
  <p>I'm pink!</p>
</app-card>
```

Great, that basically solves our problem. However, this can be enhanced a little. If we were to use our component like this, we would have to remember to check the `css` for the correct class names and set them on our component in our parent. I'd prefer to control that behaviour with an `@Input` prop.

As I mentioned in the beginning of the article, Angular mostly has a solution for all your problems, the hard part is to find it. So after searching around the web for a few minutes, I stumbled across [this StackOverflow answer](https://stackoverflow.com/questions/37258256/conditional-styling-on-host-element/37258650#37258650). Turns out: You can conditionally set classes to the host element.

The `@Component` decorator inherits the `host` option from the `@Directive` decorator, so inside our `component.ts` file we can do the following:

```jsx
import { Component, Input } from '@angular/core'

@Component({
  selector: 'app-card',
  template: '<ng-content></ng-content>',
  host: {
    '[class.pink-text]': 'isPink === true',
  },
  styleUrls: [
    './card.component.scss',
    '../base-component/base-component.component.scss',
  ],
})
export class CardComponent {
  @Input() isPink: boolean
}
```

and in our css:

```scss
:host(.pink-text) {
  color: pink;
}
```

which solves all of my problems. We can now modify our component with a property:

```html
<app-card [isPink]="true">
  <p>Pink like a panther!</p>
</app-card>
```

[^1]: The `<ng-content>` will be replaced with whatever is passed into the component at runtime. Because of this, classes cannot be used here.
