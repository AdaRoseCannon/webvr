---
layout: post
title: Getting Started with WebVR
description: Touching on A-Frame and tools for authoring content.
image: https://ada.is/progressive-web-apps-talk/images/FinancialTimes_G-FTUS_Balloon_LordMayorsAppeal.jpg
scripts: [
	'https://cdn.rawgit.com/aframevr/aframe/679a5d9fa501e81f5fdfa36d162580a116946fd1/dist/aframe.min.js',
	'https://cdn.rawgit.com/AdaRoseEdwards/dirty-dom/v1.3.1/build/dirty-dom-lib.min.js'
]
---

<script>
	window.iframeSlide = {
		action: window.FakeGenerator([
			function() {
				var iframe = this.querySelector('iframe');
				iframe.src = iframe.dataset.src;
			},
			function() {},
		]),
		teardown: function () {
			this.querySelector('iframe').src = 'about: blank';
		}
	}
	window.aSlidesSlideData = {};

</script>

<!-- Define slide animation generators -->

<!-- contents -->

# Getting started with WebVR

<!-- Link to trigger conversion script -->
[Convert to Slide Deck](#aslides)

<span>Length should be <span id="a-frame-clock">45</span> minutes.</span>

<!-- This slide uses information from _config.yml -->
<blockquote class="dark" id="splash-slide" style="background-image: url('images/pattern.svg');">
<h1>{{ site.name }}</h1>
<h3>{{ site.description }}</h3>
<h2>{{site.author.name}} - {{site.author.company}}</h2>
</blockquote>

# Contents

> * The illusion of 3D
> * What can be done in the Web Today
>   * VR Headsets - Samsung Gear VR, Cardboard, Vive
>   * Controllers -
> * VR is easier than ever with the web
> * Composing scenes with A-Frame
> * Producing Assets
>   * 3D Models
>   * 360 Degree Photos and Videos
>     * Capturing Yourself
>     * Rendering Digitally
> * Interactivity, Animation and Physics
>   * A-Frame components different from Web-Components

# Introduction - The Illusion of 3D

# Why VR and the web go and in hand

# Composing scenes with A-Frame

A-Frame allows one to write a 3D scene directly into their markup.

Position is "Left/Right Up/Down In/Out"

>```html
	<a-scene>
		<a-sphere position="0 1.25 -1" radius="1.25" color="#EF2D5E"></a-sphere>
		<a-cube position="-1 0.5 1" rotation="0 45 0" width="1" height="1" depth="1" color="#4CC3D9"></a-cube>
		<a-cylinder position="1 0.75 1" radius="0.5" height="1.5" color="#FFC65D"></a-cylinder>
		<a-plane rotation="-90 0 0" width="4" height="4" color="#7BC8A4"></a-plane>
		<a-sky color="#ECECEC"></a-sky>
	</a-scene>
>```

# a-frame-basic-demo
<script>window.aSlidesSlideData['slide-a-frame-basic-demo'] = window.iframeSlide</script>

> # A-Frame Hello World
> <iframe src="basic.html"></iframe>

# Producing content with 360 Cameras

Samsung Gear 360 and A-Sky

# Introduce some tools for making 3d content

# Introduce some physics

# Show the Javascript API

# Best Practises

* Avoid creating Objects and Arrays in 'tick' functions. Will reduce garbage collection.

# Resources

> # Resources
>
> https://developer.leapmotion.com/assets/Leap%20Motion%20VR%20Best%20Practices%20Guidelines.pdf
>
> https://developer.oculus.com/documentation/intro-vr/latest/concepts/bp_intro/
>
> https://iswebvrready.org
>
> WebVR Example: http://threejs.org/examples/webvr_cubes.html
>
> WebVR enable url: internet://webvr-enable

<script>
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
		button.classList.add('iframe-button');
		button.classList.add('blank');
		button.textContent = "Load iFrame";
		iframe.after(button);
	});
</script>
