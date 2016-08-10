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
		action: window.FakeGenerator([ function() {} ]),
		teardown: function () { this.querySelector('iframe').src = 'about:blank'; }
	};
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

> # Contents
>
> * Introduction

# Introduction - The Illusion of 3D

Hi I'm Ada from Samsung RnD.

First I would like to ask some questions:

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

# Doing graphics in the Web

There are many tools and libaries for producing publishing graphics for the Web:

* Goo Create - Web bas
* Unity - Can be compiled for the Web
* Unreal - Can also be compiled for the Web
* THREE.js - JavaScript library for building scenes
* A-Frame - What I talk about here

> A non-exhaustive list:
>
> * Goo Create - Cool web based editor
> * Unity - Can compile for the Web
> * Unreal - Can also compile for the Web
> * THREE.js - JavaScript library for building scenes. Has a nice API.
> * A-Frame - What I talk about here.

These are all really good solutions and if you are already familiar with one of these then don't feel pressured to change.

Why do I like A-Frame? it is Webby.

What does Webby mean?

# Composing scenes with A-Frame

Well for one it looks like html and can be written directly into your markup.

*Who here has built a website by typing out html before?*

It is also modular and extensible. This means that I can write a component for example. A component to give a heads up display or fancy lighting.

Then anyone can include it in their scenes without needing to write complex JavaScript.

It is extensible because my components will be based on other A-Frame components and you can release components that depend on mine.

You are not required to write a single line of JavaScript unless you want to make your own components.

> ```html
<a-scene>
	<a-sphere position="0 1.25 -1" radius="1.25" color="#EF2D5E"></a-sphere>
	<a-cube position="-1 0.5 1" rotation="0 45 0" width="1" height="1" depth="1" color="#4CC3D9"></a-cube>
	<a-cylinder position="1 0.75 1" radius="0.5" height="1.5" color="#FFC65D"></a-cylinder>
	<a-plane rotation="-90 0 0" width="4" height="4" color="#7BC8A4"></a-plane>
	<a-sky color="#ECECEC"></a-sky>
</a-scene>
```

# a-frame-basic-demo

This html from the previous slide gives us this.

But A-Frame gives us lots of hidden extras, all the basics to get started:

* The scene already has lighting
* It has a Camera
* That camera can be moved around by using the Arrow keys and clicking and dragging
* If you open it on your phone it is controlled by moving your phone
* It even has in built VR support, for both Cardboard devices and VR Headsets like the Samsung Gear VR

All of this functionality can be overridden if you don't like it or if you want more control.

<script>window.aSlidesSlideData['slide-a-frame-basic-demo'] = window.iframeSlide</script>

> <iframe src="basic.html" seamless="seamless"></iframe>
>
> ## {{ site.url }}/basic.html

The Gear VR does not run VR websites out of the box it needs to be turned on.

This is a bit annoying and confusing because my demos wouldn't work and I didn't know why.

to do that go here:

> # internet://webvr-enable

Then you will see this:

> # Picture of WebVR being enabled, now your headset is set up to make the most of VR in the web!!!

You can test it here, if it hasn't worked you will see this message

View the page in Gear VR open up the page in Samsung Internet.

if it works you will see a cool demo

> Test it here: url and image of THREE.js squares demo
>
> http://threejs.org/examples/webvr_cubes.html




# Actually building something.

The first thing a lot of people build is a 360 degree photo/video Viewer.

So we'll look at that first as it is a very simple demo.

<script>window.aSlidesSlideData['slide-actually-building-something'] = window.iframeSlide</script>

> <iframe src="360-simple.html" seamless="seamless"></iframe>
>
> ## {{ site.url }}/360-simple.html

Here I have some images I want to use.

These go into the a-assets tag, this tells a-frame to preload these for later.

We override the camera, by defining our own with the keyboard controls disabled. We don't want too let the user move around in the scene.

The final piece is the sky, the sky is an evenly lit inside out sphere. We give it the image we want to display and it shows it off.

This has all the features we want from a 360 image viewer, you can rotate the camera, view it immersively in vr and all in 7 lines of html

The image itself looks like this:

> ```html
<a-scene>
	<a-assets>
		<img id="img1" src="a-frame-assets/SAM_100_0042_SMALL.jpg" />
	</a-assets>
>
	<a-camera wasd-controls="enabled: false;"></a-camera>
>
	<a-sky src="#img1"></a-sky>
>
</a-scene>
```

The image itself looks like this:

> ![A 360 image taken with the gear VR](a-frame-assets/SAM_100_0042_SMALL.jpg)

I took it with my 360 camera (no reason to post this I just think it is adorable):

> ![The adorable Gear360](images/gear360.jpg)

If you want to do something more advanced you can, you can use JavaScript to control a-frame just as normal.

Here I have written a small script to rotate through some images whenever I click.

> ```html
<a-scene>
	<a-assets>
		<img id="img1" src="a-frame-assets/SAM_100_0046_SMALL.jpg" />
		<img id="img2" src="a-frame-assets/SAM_100_0063_SMALL.jpg" />
		<img id="img3" src="a-frame-assets/SAM_100_0042_SMALL.jpg" />
	</a-assets>
>
	<a-camera wasd-controls="enabled: false;"></a-camera>
	<a-sky src="#img1"></a-sky>
>
</a-scene>
>
<script>
	var index = 0;
	var images = document.querySelectorAll('a-assets img');
	var sky = document.querySelector('a-sky');
	window.addEventListener('click', function () {
		index = (index + 1) % images.length;
		sky.setAttribute('src', '#' + images[index].id);
	});
</script>
```

# Demo 360 Slideshow

<script>window.aSlidesSlideData['slide-demo-360-slideshow'] = window.iframeSlide</script>

> <iframe src="360.html" seamless="seamless"></iframe>
>
> ## {{ site.url }}/360.html


# Introduce some tools for making 3d content

Enough showing you my holiday photos, what if you want to actually include a more complex 3D object:



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
>
> https://github.com/aframevr/aframe-boilerplates

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
