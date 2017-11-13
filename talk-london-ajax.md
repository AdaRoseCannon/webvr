---
layout: post
title: London Ajax WebVR
description: Touching on A-Frame and tools for authoring content.
image: https://i.imgur.com/1CuaofJ.jpg
scripts: [
	'https://cdn.rawgit.com/AdaRoseEdwards/dirty-dom/v1.3.1/build/dirty-dom-lib.min.js'
]
---

# London Ajax

<!-- Link to trigger conversion script -->
[Convert to Slide Deck](#aslides)

<span>Length should be <span id="a-frame-clock">45</span> minutes.</span>
WebVR, A-Frame and the Gear VR - 45mins

The goal of this talk is show that VR in the web is ready to go right now. Usable by web developers everywhere.

Audience Web faithful but not exposed to VR

## Introduction

### About Us, Talk Goals

Blah

### Anecdote and Demo

Something to get the crowd warmed up and focused

## Why VR now?

### Hardware

* Gear VR

* Daydream

* HTC Vive

Industry Interest

* Browser Manufactures

    * Samsung, Mozilla, Google, Microsoft

* Theme Parks

    * Thorpe Park

* Media companies

    * TV, Video

### Apis and Tooling

* WebVR APIs

    * Exposes Virtual Reality headsets to the browser. Such as Samsung GearVR and desktop headsets too such as the HTC Vive.

* Three.js - Improved support

* Unity - WebVR support in HTML export

* AFRAME!!!

## AFrame

* What is Aframe?

    * Based on Entity Component System Pattern like Unity

* Benefits?

* Why it is great for Web Developers

    * Based upon Custom Elements

    * Can be manipulated with JS

    * Written like HTML

    * Access to powerful Web APIs, Web Audio, WebRTC, WebSockets, Gamepad APIs

    * Progressive Web Apps - Push notifications, offline etc

* Not just for state of the art browsers like Samsung Internet also works on Safari too via the WebVR polyfill.

### Example

* Show code

* Show demo

### Live Coding Demo in JSBin

* Assemble simple scene with interactions.

### Community

* What is a component

* AFrame is very extensible

* Wide comminunity of components, like npm small modular

    * Physics

    * Templating

    * Some other cool component

* Community Support, active slack, twitter, blog

## WebVR used in Industry

## Conclusion

* Slick Demo

* VR in the web is ready to go right now. Usable by web developers everywhere.

* Qs

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

	var blockquote = Array.from(document.querySelectorAll('blockquote'));
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