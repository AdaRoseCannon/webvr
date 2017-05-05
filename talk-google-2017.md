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
---

<script>
var captionStyle = 'z-index: 2; text-align: center; background: rgba(0,0,0,0.8); padding: 1em; border-radius: 1em; width: auto; margin: 1em; font-size: 3rem; margin-top: -3em;';
</script>

# {{page.title}}

<!-- Link to trigger conversion script -->
[Convert to Slide Deck](#aslides)

Length: 45 minutes + 10 for Qs

<blockquote class="dark" style="background-color: #576363 !important; background-image: url(images/me-and-dan.jpg);background-size: cover;min-height: 16em;display: flex;justify-content: flex-start;padding: 0.5em;background-position: center right;align-items: stretch;">
<span style="flex-grow: 1;text-align: right; font-size: 4rem; text-shadow: 0 0 1em #576363;">@lady_ada_king</span>
<span style="font-size: 5rem; text-shadow: 0 0 1em #576363;">@samsunginternet</span>
</blockquote>

<blockquote style="background-color: white;">
<img src="images/StatCounter-browser-SE-monthly-201602-201702.png" />
</blockquote>

<blockquote>
<img src="images/DeX.jpg" />
</blockquote>

<blockquote>
<h1>Samsung Internet 5.4 Beta</h1>
<div style="flex-direction: row;">
<img src="images/beta-play-store.png" />
<ul>
<li>Available on GDE devices, Pixel, Nexus etc</li>
<li>Chromium 51</li>
<li>Progressive Web Apps</li>
<li>Web Payment</li>
<li>Samsung Specific Features
<ul>
<li>Physical Web Beacons</li>
<li>WebVR</li>
<li>Ad-Blocking</li>
</ul>
</li>
</ul>
</div>
</blockquote>

<script>window._setNextSlide(window.videoSlide);</script>
<blockquote style="padding: 0; justify-content: flex-end;">
<video src="images/space-jam.mp4" style="position:absolute; top: 0; left: 0; width:100%; height: 100%; max-height: none; object-fit: cover;"></video>
</blockquote>

<script>window._setNextSlide(window.videoSlide);</script>
<blockquote style="padding: 0; justify-content: flex-end;">
<video src="images/360-media.mp4" style="position:absolute; top: 0; left: 0; width:100%; height: 100%; max-height: none; object-fit: cover;"></video>
</blockquote>

<script>window._setNextSlide(elByEl({
	preserve: 'h1:first-child'
}))</script>
> # Building immersive media into the web platform
>
> ## Set the environment
>
> ```javascript
// First, check if the API is available
if ('SamsungChangeSky' in window) {
  // Set the spherical panorama image
  window.SamsungChangeSky({ sphere: 'http://site.com/panorama.jpg' });
}
```
>
> ## Immersive Video
> <pre class="highlight"><code><span class="nt">&lt;video</span> <span class="na">src=</span><span class="s">"/360.webm"</span> <span class="na">type=</span><span class="s">"video/webm; dimension=360-lr;"</span><span class="nt">&gt;&lt;/video&gt;</span>
</code></pre>


<script>window._setNextSlide(window.videoSlide);</script>
<blockquote style="padding: 0; justify-content: flex-end;">
<video src="images/enter-vr.mp4" style="position:absolute; top: 0; left: 0; width:100%; height: 100%; max-height: none; object-fit: cover;"></video>
</blockquote>


# History

<script>window._setNextSlide({
	setup: function () {
		this._img = this._img || this.querySelector('img');
		this._shadeAfter = this._shadeAfter || this.querySelector('.shade-after');
		_applyCSS(this._shadeAfter, {
			opacity: 1
		});
		_applyCSS(this._img, {
			transition: 'transform 1s ease',
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
> <div class="shade-before"></div><div style="position: absolute; left: 0; top:0; right: 0;"><img src="images/vr-timeline.svg" style="filter: invert(1)" /></div><div class="shade-after"></div>


## Render loop

> <img src="images/render-loop.svg" style="filter: invert(1)" />

## Head Tracking Demo

<script>window._setNextSlide(window.videoSlide);</script>
<blockquote style="padding: 0; justify-content: flex-end; background-color: black !important;">
<video src="images/tracking.m4v" style="position:absolute; top: 0; left: 0; width:100%; height: 100%; max-height: none; object-fit: contain;"></video>
</blockquote>

# Where is it supported

> ![supported](images/support.png)



<script>window._setNextSlide(elByEl({
	reveal: true
}));</script>
> # How can the web help VR?
>
> # VR has problems with engagement.
>
> * Users may be put off my large initial download sizes
> * May get distracted by during set up of VR equipment
> * Can get bored during long loading times, especially on mobile.
>
> # How does the web solve these issues?


Traditionally the Web has been a media for documents.

Right now VR is bad for text

Even in the best VR headsets text is difficult to read and can induce eye strain

APIs traditionally for A11y have relevance for every one now as we are all physically and visually impaired in VR.

Newer APIs like *Speech recognition* and *Speech Synthesis* are very useful but can be limited to languages spoken in the western world, and the web is for everyone and should not be limited to the wealthy.


The Web has a pedigree for assembling beautiful documents, providing new APIs for setting text and laying out block elements.

All of this power is discarded for VR in the Web.

Due to security concerns we are unable to access layers rendered by the browser in WebGL.

An API for converting HTML to mipped bitmaps efficiently would be very powerful in enabling WebVR in it's current state to layout 2D interfaces in VR.

## But What if we think bigger.

Platform level support for 3D assets and layout.

Allow developers who are unfamiliar with the complex paradigms of real time rendering and 3D graphics to describe an interface using HTML and CSS.

## Benefits of Declarative VR

* A11y
* Dynamic Performance
* Seperate content from rendering and interactions
* Content can be reinerpreted for different platforms and will upgrade/degrade gracefully
* Interactions depend heavily on the hardware involved, abstractions based around interactions with objects rather than granular doing own maths allow, new hardware to reinterpret content in a way which makes sense.

Such an investment would take enormous effort by standards bodies and implementators but should VR prove to be as inevitable as it seems then it would pave the way to make the web the future of VR content.



> # Challenges of VR on the Web

A-Frame is a Mozilla project for building VR using HTML

It really made me a beleiver in declarative VR is a good and possible future for the Web.

By abstracting away a bunch of details

I am introducing the A-Frame project.

A-Frame uses custom elements to bring declarative VR to the web



> ![A-Frame](images/aframevr.png)




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