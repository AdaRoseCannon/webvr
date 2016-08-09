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
		setup: function () {
			var iframe = this.querySelector('iframe');
			iframe.src = iframe.dataset.src;
		},
		action: window.FakeGenerator([
			function() {}
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

The goal if this talk is to get you building a-frame demos to run across browsers.

# Contents

> * Introduction

# Introduction - The Illusion of 3D

Hi I'm Ada from Samsung RnD.

First i'd like to ask some questions:

* Who here has used VR borrowed a friends or had a go?
* Who has a VR headset whether a Google Cardobard or GearVR?

For those who haven't experienced VR yet. You can have a go on my Gear VR at the end.

What you get from VR as opposed to a computer monitor or TV screen is a feeling of immersion.

By placing your scene around your users they are engaged like never before.

They literally cannot look away.

A VR headset works by tracking your head rotation and position and showing to each eye what it would see in the virtual space.

> ![Samsung Gear VR](images/gear-vr_kv-trim.jpg)

# Why VR and the web go and in hand

The world wide web is the most prominent content delivery platform, it has unparalelled reach and grants us the ability to share and stream content.

Its network model allows us to enjoy multimedia experiences such as games and movies without downloading the whole thing.

The web can be enjoyed across a wide variety of platforms from phones to desktops and tvs.

URLs allow for linking and sharing content easily in a format familiar to the three and half billion people who use the internet.

VR for the web, known as WebVR, allows us to make the most of the Web's strongest powers to leverage 3D models, images, videos and audio to produce 3D worlds to immerse our readers in.

Recently the WebVR spec has become more mature. It can be used in Samsung's Internet Browser for the Gear VR. In addition scripts such as the `WebVR Polyfill` to allow you to use WebVR on phones such as Android and iOS phones.

The proportion of people who access the internet on mobile devices is ever increasing and headsets can be just a piece of cardboard.

*Show Google Cardboard*

> Movie representation of traversing the web.
> then show google cardboard near the end


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
