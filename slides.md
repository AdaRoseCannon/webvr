---
layout: post
title: Readme
description: Building a slide deck from a single page
image: https://ada.is/progressive-web-apps-talk/images/FinancialTimes_G-FTUS_Balloon_LordMayorsAppeal.jpg
script1: https://aframe.io/releases/0.2.0/aframe.min.js
---

<!-- Define slide animation generators -->

<!-- contents -->

# Getting started with WebVR

<!-- Link to trigger conversion script -->
[Convert to Slide Deck](#aslides)

# Basic Scene

A-Frame allows one to write a 3D scene directly into their markup.

>```html
	<a-scene>
		<a-sphere position="0 1.25 -1" radius="1.25" color="#EF2D5E">
		</a-sphere>
		<a-cube position="-1 0.5 1" rotation="0 45 0" width="1" height="1" depth="1" color="#4CC3D9">
		</a-cube>
		<a-cylinder position="1 0.75 1" radius="0.5" height="1.5" color="#FFC65D">
		</a-cylinder>
		<a-plane rotation="-90 0 0" width="4" height="4" color="#7BC8A4">
		</a-plane>
		<a-sky color="#ECECEC">
		</a-sky>
	</a-scene>
>```

<blockquote style="height: 80vh; max-height:100%;">
	<a-scene>
		<a-sphere position="0 1.25 -1" radius="1.25" color="#EF2D5E">
		</a-sphere>
		<a-cube position="-1 0.5 1" rotation="0 45 0" width="1" height="1" depth="1" color="#4CC3D9">
		</a-cube>
		<a-cylinder position="1 0.75 1" radius="0.5" height="1.5" color="#FFC65D">
		</a-cylinder>
		<a-plane rotation="-90 0 0" width="4" height="4" color="#7BC8A4">
		</a-plane>
		<a-sky color="#ECECEC">
		</a-sky>
	</a-scene>
</blockquote>
