---
layout: post
title: Performing VR on the Web
description: The web has new capabilities for working with VR hardware right in the browser. This talk aims to show the benefits the web can bring to VR and best practises to get your audience engaged and to keep coming back for more.
image: https://i.imgur.com/1CuaofJ.jpg
scripts: [
	'scripts/post-to-slides.js',
	'scripts/slide-utils.js'
]
styles: [
	'scripts/third-party/a-slides.css',
]
redirect_from: "/talk-bbc.html"
---

<script>
var captionStyle = 'z-index: 2; text-align: center; background: rgba(0,0,0,0.8); padding: 1em; border-radius: 1em; width: auto; margin: 1em; font-size: 3rem; margin-top: -3em;';
</script>

# {{page.title}}

<!-- Link to trigger conversion script -->
[Convert to Slide Deck](#aslides)

Length: 15 minutes + 5 for Qs

<blockquote class="dark" style="background-color: #576363 !important; background-image: url(images/me-and-dan.jpg);background-size: cover;min-height: 16em;display: flex;justify-content: flex-start;padding: 0.5em;background-position: center right;align-items: stretch;">
<span style="flex-grow: 1;text-align: right; font-size: 4rem; text-shadow: 0 0 1em #576363;">@lady_ada_king</span>
<span style="font-size: 5rem; text-shadow: 0 0 1em #576363;">@samsunginternet</span>
</blockquote>


# History


<script>window.setDynamicSlide({
	setup: function () {
		this._img = this._img || this.querySelector('img');
		this._shadeAfter = this._shadeAfter || this.querySelector('.shade-after');
		_applyCSS(this._shadeAfter, {
			opacity: 1
		});
		_applyCSS(this._img, {
			transition: 'transform 1s ease',
			filter: 'invert(1)',
			maxHeight: 'none',
			height: '100%',
			flexShrink: '0',
			margin: 0
		});
		this._img.style.transform = 'translateY(50vh) translateY(-1.5rem) translateY(-3.5%)';
	},
	action: function *() {
		this._img.style.transform = 'translateY(50vh) translateY(-1.5rem) translateY(-3.5%)';
		yield;
		this._img.style.transform = 'translateY(50vh) translateY(-1.5rem) translateY(-13.5%)';
		yield;
		this._img.style.transform = 'translateY(50vh) translateY(-1.5rem) translateY(-25%)';
		yield;
		this._img.style.transform = 'translateY(50vh) translateY(-1.5rem) translateY(-38%)';
		yield;
		this._img.style.transform = 'translateY(50vh) translateY(-1.5rem) translateY(-45%)';
		yield;
		this._img.style.transform = 'translateY(50vh) translateY(-1.5rem) translateY(-57%)';
		yield;
		this._img.style.transform = 'translateY(50vh) translateY(-1.5rem) translateY(-70%)';
		yield;
		this._img.style.transform = 'translateY(50vh) translateY(-1.5rem) translateY(-83%)';
		yield;
		this._shadeAfter.style.opacity = 0;
		this._img.style.transform = 'translateY(50vh) translateY(-1.5rem) translateY(-92%)';
		yield;
	},
	teardown () {
		if (!this._img) return;
		this._img.setAttribute('style', '');
		this._shadeAfter.setAttribute('style', '');
	}
});</script>

> <div class="shade-before"></div><div style="position: absolute; left: 0; top:0; right: 0;"><img src="images/vr-timeline.svg" /></div><div class="shade-after"></div>


## The state of VR today (WebGL based)

There is a suite of new APIs for enhancing WebGL to access head tracking, and handling the distortion and multiple displays needed for VR headsets.

These are known as the WebVR APIs

Using these one can bring content from 3D to the web

As well as the obvious gaming applications this can be used for shopping, education, sports, health and travel

The web makes it ideal for single use throw away experiences with the aim of going viral or providing a low barrier for entry.

One can take advantage of the web's powerful apis to enhance these experiences

There is a polyfill to allow these apis to be used on iOS and mobile chrome with a google cardboard.

<script>setDynamicSlide(window.videoSlide);</script>
<blockquote style="padding: 0; justify-content: flex-end;">
<video src="images/enter-vr.mp4" style="position:absolute; top: 0; left: 0; width:100%; height: 100%; max-height: none; object-fit: cover;"></video>
</blockquote>


## Render loop

> <img src="images/render-loop.svg" style="filter: invert(1)" />


## Head Tracking Demo

<script>setDynamicSlide(window.videoSlide);</script>
<blockquote style="padding: 0; justify-content: flex-end; background-color: black !important;">
<video src="images/tracking.m4v" style="position:absolute; top: 0; left: 0; width:100%; height: 100%; max-height: none; object-fit: contain;"></video>
</blockquote>

# Where is it supported

> ![supported](images/support.png)

# Where to get started?

> # https://aframe.io - Build VR by writing HTML
>
> # https://playcanvas.com - Online 3D Editor

## How the web platform can enhance VR

The web as a platform has been delivering media content for years now.

There are many reasons Native platforms can be trump the web with regard to quality.

But this is a trade off we make for the many benefits we gain from the web.

-- slide --

The web brings us the ability to reach a large audience across a wide variety of platforms,

We can take advantage of URLs and deep linking

The web also has access to many useful APIs which VR will bring to entirely new relevance.

<script>window.setDynamicSlide(window.elByEl());</script>
> # Why do VR on the web?
>
> > ## *"If visual fidelity was all that mattered we would be watching blu-rays not Netflix"*
> >
> > ### -- Josh Carpenter

## Expectations by being on the web

Even though one may be making something new and amazing, the wow factor for VR will wear off and users have a short attention span.

The lessons we've learnt in engaging uers on the web are still applicable here

Primarily reduce the barrier between the user and content.

Start fast. Each barrier to entry will lose a signifcant portion of your users.

The advantage of the web is that one link click takes you to the content but that advantage is lost easily.

* Avoid interstitials redirecting users to different devices or platforms
* Avoid long loading
* Work on desktop but enhance into VR

Think of showing VR content the same way you would use video content,

* Content is buffered, not loaded all in one go
* Content is visible on the page straight away
* Content quality improves with bandwidth and device power

<script>
setDynamicSlide(contentSlide([
	{html: '<h1 style="margin-left: 1em;">The Web Comes with Expectations</h1><div style="justify-content: flex-end; padding: 0;"><img src="images/engagement.png" style="margin: 0; height: 0;" /><h2 style="' + captionStyle + '">Study by Google on Loading time and Engagement</h2></div>'},
	{video: 'images/gun.m4v', caption: 'http://gun.playcanvas.com', style:'position: absolute; top:0; left: 0; width: 100%; height: 100%; z-index: -1; object-fit: cover;', captionStyle: captionStyle},
]));
</script>
<blockquote style="justify-content: flex-end; padding: 0;">
<ul>
<li>&lt; 3s Acceptable</li>
<li>&lt; 1s Good</li>
<li>&lt; 0.5s Ideal</li>
</ul>
<video src="images/gun.m4v" muted></video>
</blockquote>

## Works across devices

until there is enough content that people are regularly browsing in a headset

People probably won't have a head set to hand

Need to support cardboard and gearvr as well as htc vive and occulus rift

<blockquote style="background-blend-mode: normal; ;background-image: url(images/devices.jpg);background-size: cover;min-height: 16em;"></blockquote>


## Supporting user interactions.

Different modes of user input.

> <img src="images/devices.svg" style="filter: invert(1)" />

## How to get involved in Standards to influence the future of VR

These discussions are happening today!

If anything in this talk has interested you then please get involved.

If you start now you will be able to shape the next medium of the web

I don't know about you guys but I am pretty excited for our VR future.

> # Get involved in standards
>
> ## https://www.w3.org/community/webvr/
>
> ## https://github.com/w3c/webvr
>
> ## @samsunginternet

<script>

	// Fancy Emojis
	window._addScript('https://twemoji.maxcdn.com/2/twemoji.min.js')().then(function () {
		twemoji.parse(document.body, {
			folder: 'svg',
			ext: '.svg'
		});
	});

	// Add links to deep link into slides
	var blockquote = Array.from(document.querySelectorAll('body.post > blockquote'));
	var newSpans = [];
	document.querySelector('a[href="#aslides"]').addEventListener('click', function () {
		newSpans.forEach(function (s) {
			s.removeEventListener('click', onclick);
			s.remove();
		});
		newSpans.splice(0);
	});

	blockquote.forEach(function (el) {
		var span = document.createElement('span');
		newSpans.push(span);
		span.textContent = ' View Slide';
		span.addEventListener('click', function onclick() {
			window.removeHashChangeEventListener();
			newSpans.forEach(function (s) {
				s.removeEventListener('click', onclick);
				s.remove();
			});
			init().then(function () {
				document.querySelector('.a-slides_slide-container').dispatchEvent(new CustomEvent('a-slides_goto-slide', {detail: {slide: el.parentNode}}));
			});
		});
		span.setAttribute('class', 'slide-view-button');
		el.appendChild(span);
	});
</script>