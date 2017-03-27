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


<script>setDynamicSlide(window.videoSlide);</script>
<blockquote style="padding: 0; justify-content: flex-end;">
<video src="images/space-jam.mp4" style="position:absolute; top: 0; left: 0; width:100%; height: 100%; max-height: none; object-fit: cover;"></video>
</blockquote>

<script>setDynamicSlide(window.videoSlide);</script>
<blockquote style="padding: 0; justify-content: flex-end;">
<video src="images/360-media.mp4" style="position:absolute; top: 0; left: 0; width:100%; height: 100%; max-height: none; object-fit: cover;"></video>
</blockquote>

> # Building immersive media into the web platform
>
> ## Set the environment
>
> ```javascript
// First, check if the API is available
if ('SamsungChangeSky' in window) {
  // Set the spherical panorama image
  window.SamsungChangeSky({ sphere: 'http://site.com/my-360-image.jpg' });
}
```
>
> ## Immersive Video
> <pre class="highlight"><code><span class="nt">&lt;video</span> <span class="na">src=</span><span class="s">"/360.webm"</span> <span class="na">type=</span><span class="s">"video/webm; dimension=360-lr;"</span><span class="nt">&gt;&lt;/video&gt;</span>
</code></pre>


<script>setDynamicSlide(window.videoSlide);</script>
<blockquote style="padding: 0; justify-content: flex-end;">
<video src="images/enter-vr.mp4" style="position:absolute; top: 0; left: 0; width:100%; height: 100%; max-height: none; object-fit: cover;"></video>
</blockquote>


# History

<script>_setNextSlide({
	setup: function () {
		this._img = this._img || this.querySelector('img');
		this._shadeAfter = this._shadeAfter || this.querySelector('.shade-after');
		applyCSS(this._shadeAfter, {
			opacity: 1
		});
		applyCSS(this._img, {
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


## Render loop

> <img src="images/render-loop.svg" style="filter: invert(1)" />


## Head Tracking Demo

<script>setDynamicSlide(window.videoSlide);</script>
<blockquote style="padding: 0; justify-content: flex-end; background-color: black !important;">
<video src="images/tracking.m4v" style="position:absolute; top: 0; left: 0; width:100%; height: 100%; max-height: none; object-fit: contain;"></video>
</blockquote>

# Where is it supported

> ![supported](images/support.png)














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