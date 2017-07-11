---
layout: post
title: Virtual Reality and the Future of the Web.
description: New Virtual Reality browsers means we need to consider how the web platform is going to need evolve to take advantage of the benefits that Virtual Reality can bring.
image: https://i.imgur.com/1CuaofJ.jpg
scripts: [
	'scripts/post-to-slides.js',
	'scripts/slide-utils.js',
	'scripts/third-party/qrcode.min.js',
	'https://cdn.rawgit.com/AdaRoseEdwards/dirty-dom/v1.3.1/build/dirty-dom-lib.min.js'
]
styles: [
	'scripts/third-party/a-slides.css',
	'styles/vr.css'
]
---

<script>
var captionStyle = 'z-index: 2; text-align: center; background: rgba(0,0,0,0.8); padding: 1em; border-radius: 1em; width: auto; margin: 1em; font-size: 3rem; margin-top: -3em;';
</script>

# {{page.title}}

<!-- Link to trigger conversion script -->
[Convert to Slide Deck](#aslides)

Length: 45 minutes

The goals of this talk is to give your the tools to start building VR in the web.

<blockquote class="dark" style="background-color: #576363 !important; background-image: url(images/me-and-dan.jpg);background-size: cover;min-height: 16em;display: flex;justify-content: flex-start;padding: 0.5em;background-position: center right;align-items: stretch;">
<span style="flex-grow: 1;text-align: right; font-size: 4rem; text-shadow: 0 0 1em #576363;">@lady_ada_king</span>
<span style="font-size: 5rem; text-shadow: 0 0 1em #576363;">@samsunginternet</span>
</blockquote>

<blockquote style="background-color: white;">
<img src="images/StatCounter-browser-GB-monthly-201606-201706.png" />
</blockquote>

<script>
window._cssNextEl({
    padding: '1em',
	fontSize: '2rem',
	justifyContent: 'flex-start'
});	
</script>
> # Jargon
>
> ## VR, Virtual Reality, fully immersive, replaces reality with a Virtual Reality. 
>
> ## AR/MR, Augmented/Mixed Reality, a combination of Reality and Digital Content
>
> ## XR, Cross Reality, Umbrella term for all immersive media 

<blockquote>
<img src="images/gearvr+controller.png" class="bg-img" style="filter: drop-shadow(0 0 0.4em #ffffff99)"  />
</blockquote>

<script>window._setNextSlide(window.videoSlide);</script>
<blockquote>
<video data-src="images/space-jam.mp4" style="position:absolute; top: 0; left: 0; width:100%; height: 100%; max-height: none; object-fit: cover;"></video>
</blockquote>

# Try it out for yourself:

<script>window._setNextSlide(window.videoSlide);</script>
<blockquote>
<video data-src="images/enter-vr.mp4" style="position:absolute; top: 0; left: 0; width:100%; height: 100%; max-height: none; object-fit: cover;"></video>
<h1 style="margin:0; z-index: 2; position: absolute;">http://o.ada.is/simple-vr</h1>
</blockquote>

# Where is it supported

> ![supported](images/support.png)

<script>
window._cssNextEl({
    padding: '1em',
	justifyContent: 'flex-start'
});	
</script>
> # State of WebVR
>
> ## W3C community group.
>
> ## Standard still in flux
>
> ## Looking to become a W3C working group once stable.

<script>
window._setNextSlide(window.elByEl({
    reveal: true
}));
</script>

<blockquote>
<img class="base" src="images/gearvr+controller.png" class="bg-img" style="filter: drop-shadow(0 0 0.4em #ffffff99)" />
<img src="images/gearvr+controller+detail.png" class="bg-img"  />
</blockquote>

## Head Tracking Demo

<script>
window._setNextSlide(window.videoSlide);
</script>
<blockquote style="background-color: black !important;">
<video data-src="images/tracking.m4v" style="position:absolute; top: 0; left: 0; width:100%; height: 100%; max-height: none; object-fit: contain;"></video>
</blockquote>

<script>
window._setNextSlide(window.elByEl({}));
</script>
> <div style="align-items: center; justify-content: center;"><h1 style="text-align: center; font-size: 2em;">WebVR <span style="font-style: oblique;">requires</span> WebGL</h1></div>
> <div style="align-items: center; justify-content: center;"><h1 style="text-align: center; font-size: 2em;">WebGL is <span style="font-weight: 800;font-size: 1.4em;vertical-align: middle;">Hard</span></h1></div>
> <div style="background-color: #4d4d4d;"><img src="images/gl.png" style="margin: 1em auto;" /></div>

<script>
window._setNextSlide(window.elByEl({
    reveal: true
}));
</script>
<blockquote class="heirarchy-grid" style='display: grid; grid-template-columns: 1fr 1fr;grid-template-rows: 1fr 1fr 1fr; padding: 0.5em;'>
	<p style="grid-row-start: 3;">WebGl</p><p style="grid-row-start: 3;">WebVR</p>
	<p style="grid-row-start: 2; grid-column-end: span 2;">Three.js</p>
	<p style="grid-row-start: 1;">A-Frame</p><p style="grid-row-start: 1;">React VR</p>
	<img class="bg-img" src="images/aframevr.png" style="border: none; border-radius: 0;" />
</blockquote>



<script>window._setNextSlide(window.elByEl());</script>
<blockquote style="padding: 0.5em;">
	<div>
		<h2>A-Frame</h2>
		<p style="font-style: oblique;">Web Component library for describing 3D WebGL scenes using HTML!</p>
		<p>https://aframe.io</p>
	</div>
	<div data-markdown="#demo" style="font-size: 1.4rem;">
		<script id="demo" type="text/html">
	<!DOCTYPE html>
	<html>
	<head>
		<title>Hello, WebVR! - A-Frame</title>
		<meta name="description" content="Hello, WebVR! - A-Frame">
		<scr​ipt src="https://aframe.io/releases/0.5.0/aframe.min.js"></scr​ipt>
	</head>
	<body>
		<a-scene>
		<a-box position="-1 0.5 -3" rotation="0 45 0" color="#4CC3D9"></a-box>
		<a-sphere position="0 1.25 -5" radius="1.25" color="#EF2D5E"></a-sphere>
		<a-cylinder position="1 0.75 -3" radius="0.5" height="1.5" color="#FFC65D"></a-cylinder>
		<a-plane position="0 0 -4" rotation="-90 0 0" width="4" height="4" color="#7BC8A4"></a-plane>
		<a-sky color="#ECECEC"></a-sky>
		</a-scene>
	</body>
	</html>
		</script>
	</div>
</blockquote>

<script>
window._setNextSlide(window.iframeSlide);
</script>
> <iframe style="flex-grow: 1;" src="basic.html" seamless="seamless"></iframe>
> <h2 style="margin:0;">https://ada.is/webvr/basic.html</h2>

<script>
window._setNextSlide(window.elByEl());
</script>
<blockquote style="justify-content: center;">
<h1 style="align-self: center; text-align: center; font-size: 2em;">Debugging A-Frame</h1>
<h1 style="align-self: center; text-align: center; font-size: 2em;">Making engaging content</h1>
</blockquote>

<script>
window._setNextSlide(window.iframeSlide);
</script>
> <iframe style="flex-grow: 1;" src="https://stupid-sail.glitch.me/community.html" seamless="seamless"></iframe>
> <h2 style="margin:0;">https://stupid-sail.glitch.me/community.html</h2>


<script>
window._setNextSlide(window.elByEl());
</script>

<script>
window._setNextSlide(window.elByEl());
</script>
<blockquote style="justify-content: center; text-align: center; padding: 1em;">
<h1 style="font-size: 2em;">AFrame is HTML</h1>
<h1 style="font-size: 2em;">AFrame can be used with front end frameworks</h1>
<h1 style="font-size: 2em;">But it cannot render the document.</h1>
<h1 style="font-size: 2em;">WebVR cannot easily mix with the traditional Web.</h1>
<h1 style="font-size: 2em;">Think outside the box</h1>
</blockquote>

## Some cool uses

<script>
window.setDynamicSlide(window.elByEl());
window._cssNextEl({
    padding: '1em'
});	
</script>
<blockquote>
<div>
<h1>Immersive Movies</h1>
<img src="images/vrmovie.png" />
</div>
<div>
<h1>Shopping</h1>
<div style="flex-direction: row; display: flex;">
<img src="images/thomas-cook.png" />
<img src="images/ikea.png" />
</div>
</div>
<div>
<h1>Education</h1>
<img src="images/google-exhibitions.png" />
</div>
<div>
<h1>Social</h1>
<h2 style="margin:0;">https://metaverse.samsunginter.net</h2>
<img src="images/177.png" />
</div>
</blockquote>


<script>
window._setNextSlide(window.elByEl());
window._cssNextEl({
    justifyContent: 'center',
	padding: '1em'
});	
</script>
> <h1 style="text-align: center; font-size: 2.5em;">WebVR isn't just a way to distribute VR content.</h1>
>
> <h1 style="text-align: center; font-size: 2.5em;">VR brings a new way to think about the web.</h1>
>
> <h1 style="text-align: center; font-size: 2.5em;">The web brings a new way to think about VR.</h1>


## Works across devices

until there is enough content that people are regularly browsing in a headset

People probably won't have a head set to hand

Need to support cardboard and gearvr as well as htc vive and occulus rift

<script>
	window._setNextSlide(window.elByEl());
</script>
<blockquote>
	<img src="images/devices.jpg" class="bg-img">
	<div style="flex-direction: row; padding-right: 0.5em;">
		<img src="images/laptop.png" >
		<ul>
			<li>Not immersive</li>
			<li>Click and Drag Interactions</li>
			<li>Potentially Powerful Hardware</li>
		</ul>
	</div>
	<div style="flex-direction: row; padding-right: 0.5em;">
		<img src="images/phone.png" >
		<ul>
			<li>Not Immersive</li>
			<li>Limited interactions</li>
			<li>Potentially low power hardware</li>
		</ul>
	</div>
	<div style="flex-direction: row; padding-right: 0.5em;">
		<img src="images/cardboard.png" >
		<ul>
			<li>Immersive</li>
			<li>Limited interface</li>
			<li>Potentially low power hardware</li>
			<li>Massive Reach for VR</li>
		</ul>
	</div>
	<div style="flex-direction: row; padding-right: 0.5em;">
		<img src="images/gearvr+controller.png" >
		<ul>
			<li>Immersive</li>
			<li>Rotation Tracked Controller</li>
			<li>Moderate Hardware</li>
			<li>Very popular</li>
		</ul>
	</div>
	<div style="flex-direction: row; padding-right: 0.5em;">
		<img src="images/htcvive.png" >
		<ul>
			<li>Immersive</li>
			<li>Click and Drag Interactions</li>
			<li>Very Powerful Hardware</li>
			<li>Niche but slowly spreading</li>
		</ul>
	</div>
</blockquote>

## Supporting user interactions.

Different modes of user input.

<script>
window._cssNextEl({
    backgroundColor: 'lavenderblush'
});	
</script>
> <img src="images/devices.svg" />

## Be quick

<script>setDynamicSlide(contentSlide([
	{html: '<h1 style="margin-left: 1em;">The Web Comes with Expectations</h1><div style="justify-content: flex-end; padding: 0;"><img src="images/engagement.png" style="margin: 0; height: 0;" /><h2 style="' + captionStyle + '">Study by Google on Loading time and Engagement</h2></div>'},
	{video: 'images/gun.m4v', caption: 'http://gun.playcanvas.com', style:'position: absolute; top:0; left: 0; width: 100%; height: 100%; z-index: -1; object-fit: cover;', captionStyle: captionStyle},
]));
</script>
<blockquote style="justify-content: flex-end; padding: 0;">
<video src="images/gun.m4v" muted></video>
</blockquote>

<script>
	window._setNextSlide(window.elByEl());
	window._cssNextEl({
		justifyContent: 'flex-start'
	})
</script>
> <h1 style="text-align: center; font-size: 2.5em; padding: 0.5em; width: auto;">What is WebVR ideal for?</h1>
>
> <div style="align-items: center; justify-content: center; background: white; background image: none !important; filter: invert(1);"><img src="images/loading-spiral.gif" style="flex-grow: 0;"></div>
>
> <h1 style="text-align: center; font-size: 2.5em; padding: 0.5em; width: auto;">WebVR brings the Web's power to VR</h1>

## How to get involved in Standards to influence the future of VR

These discussions are happening today!

If anything in this talk has interested you then please get involved.

If you start now you will be able to shape the next medium of the web

I don't know about you guys but I am pretty excited for our VR future.

<script>
window._cssNextEl({
    padding: '1em',
    justifyContent: 'flex-start'
})
</script>
> # Get involved in standards
>
> ## https://www.w3.org/community/webvr/
>
> ## https://github.com/w3c/webvr

<script type="text/javascript">
window._executeOnNextEl(function (el) {
	var qr = new QRCode(el.querySelector('.qr-target'), "http://o.ada.is/css-day");
});
</script>

<blockquote style="display: block; padding: 1em;">
<h1>Please give feedback on this talk so we can learn and improve!</h1>
<div style="display: block;">
<h2>http://o.ada.is/css-day</h2>
<span class="qr-target" style="float: right;align-self: flex-end;margin: 0.5em;flex-shrink: 0;"></span>
</div>
<h2>@samsunginternet</h2>
</blockquote>

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


	var iframes = Array.from(document.querySelectorAll('iframe'));
	var blank = 'about:blank';
	iframes.forEach(function (iframe) {
		var button = document.createElement('button');
		var src = iframe.src;
		iframe.src = blank;
		iframe.dataset.src = src;
		button.addEventListener('click', function () {
			iframe.src = iframe.src === blank ? src : blank;
			if (iframe.src === blank) {
				button.classList.add('blank');
				button.textContent = "Load iFrame";
			} else {
				button.classList.remove('blank');
				button.textContent = "Unload iFrame";
			}
		});
		button.classList.add('load-content-button');
		button.classList.add('blank');
		button.textContent = "Load iFrame";
		iframe.after(button);
	});

	Array.from(document.querySelectorAll('[data-markdown]')).forEach(function (el) {
		if (el.dataset.markdown) {
			var html = document.querySelector(el.dataset.markdown).innerHTML;
		} else {
			var html = el.innerHTML;
		}
		el.innerHTML = '';
		el.addMarkdown(html);
	});

	var videos = Array.from(document.querySelectorAll('video'));
	videos.forEach(function (video) {
		var button = document.createElement('button');
		var src = video.src;
        if (src) {
            video.removeAttribute('src');
            video.dataset.src = src;
        }
		button.addEventListener('click', function () {
			video.src = video.dataset.src;
            video.controls = true;
            button.parentNode.removeChild(button);
		});
		button.classList.add('load-content-button');
		button.classList.add('blank');
		button.textContent = "Load Video";
		video.after(button);
	});
</script>