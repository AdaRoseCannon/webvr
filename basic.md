---
layout: a-frame
title: Track
description: A-Frame Demo
image: ./images/track-screenshot.jpg
scripts: [
	'https://cdn.rawgit.com/aframevr/aframe/679a5d9fa501e81f5fdfa36d162580a116946fd1/dist/aframe-v0.2.0.min.js', # master at the time of writing
]
---

<a-scene>
	<a-sphere position="0 1.25 -1" radius="1.25" color="#EF2D5E"></a-sphere>
	<a-cube position="-1 0.5 1" rotation="0 45 0" width="1" height="1" depth="1" color="#4CC3D9"></a-cube>
	<a-cylinder position="1 0.75 1" radius="0.5" height="1.5" color="#FFC65D"></a-cylinder>
	<a-plane rotation="-90 0 0" width="4" height="4" color="#7BC8A4"></a-plane>
	<a-sky color="#ECECEC"></a-sky>
</a-scene>