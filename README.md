---
layout: post
title: Readme
description: Building a slide deck from a single page
scripts: [
	'https://cdn.rawgit.com/AdaRoseEdwards/dirty-dom/v1.3.1/build/dirty-dom-lib.min.js',
	'scripts/post-to-slides.js',
	'scripts/slide-utils.js',
]
styles: [
	'scripts/third-party/a-slides.css',
]
---

# {{page.title}}

This is a little layout for blog posts which can turn into slides using a-slides

<!-- Link to trigger conversion script -->
[Convert to Slide Deck](#aslides)

```bash
sudo apt-get install bundler zlib1g-dev libxml2-dev nodejs
bundle config build.nokogiri --use-system-libraries
bundle install
bundle exec jekyll serve
```

## About

This is useful for creating a blog post which is also a slide deck.

Each slide is a block quote

All the content before a slide appears as the notes for that slide.

## Controls

It should work with slide remotes and a wii mote on supported platforms

* Click, Return or right key to Advance
* Left Key to go back
* f to toggle fullscreen
* If you hae multiple tabs open (in a broser which supports a service worker), press parent in the control bar and it will control all the other tabs

<!-- This slide uses information from _config.yml and the page settings -->
<blockquote class="dark" id="splash-slide" style="background-image: url('images/pattern.svg');">
<h1>{{ page.title }}</h1>
<h3>{{ page.description }}</h3>
<h2>{{site.author.name}} - {{site.author.company}}</h2>
</blockquote>

Block quotes can also be defined short hand as well

> # Content Goes Here
> Demo slide
>
> ```markdown
> > # Content Goes Here
> > Demo Slide
> >
> > ```markdown
> > > # Content Goes Here
> > > Demo Slide
> > ```
> ```

# This h1 is what defines the slide name

* Animations are defined as generators, when the yeild whenever you are awaiting an input from the presenter.
* setup is run and action are run when the slide is being moved into position.
* action's next() is called repeatedly with each input.
* teardown() is called after the slide has been hidden
* pressing back will run teardown() and reinitialise action()
* for a complex example see: https://github.com/AdaRoseEdwards/progressive-web-apps-talk/blob/gh-pages/scripts/content/LoaPN.js

>```javascript
window.aSlidesSlideData = {'slide-this-h1-is-what-defines-the-slide-name': {
	setup() {},
	action: function *() {
		this.appendChild(window.MAKE.markdown('# Hello'));
		yield;
		this.appendChild(window.MAKE.markdown('# World'));
		yield;
	},
	teardown() {
		this.innerHTML = '';
	}
}}
>```

# Demo

<script>
	window.aSlidesSlideData['slide-demo'] = {
		setup: function () {
			this.innerHTML = '';
		},

		// action: function *() {
		// 	this.addMarkdown('# Hello');
		// 	yield;
		// 	this.addMarkdown('# World');
		// 	yield;
		//	return;
		// },
		//
		// This fake generator is an a-slides compatible
		// es5 shim, from post-to-slides.js
		action: window.FakeGenerator([
			function() {this.addMarkdown('# Hello');},
			function() {this.addMarkdown('# World');},
			function() {this.addMarkdown('## - From Ada');},
			function() {},
		]),
		teardown: function () {
			this.innerHTML = '';
		}
	};
</script>
> This content gets removed

# Events

## a-slides provides a number of events you can hook into:

These get fired on the slide container

* a-slides_slide-setup
* a-slides_slide-teardown
* a-slides_refresh-slide (fireable)
* a-slides_next-slide (fireable)
* a-slides_previous-slide (fireable)
* a-slides_goto-slide (fireable)

> ```javascript
>
> slideContainer.fire = (function fire(name, detail) {
> 	this.dispatchEvent(new CustomEvent(name, { detail: detail || {}}));
> 	return this;
> }).bind(slideContainer);
>
> // goto a slide by id or by dom element
> slideContainer.fire('a-slides_goto-slide', {slide: 0});
> slideContainer.fire('a-slides_goto-slide', {slide: document.querySelector('.a-slide')});
> ```

