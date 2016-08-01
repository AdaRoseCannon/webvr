---
layout: a-frame
title: Track
description: A-Frame Demo
image: ./images/track-screenshot.jpg
scripts: [
	'https://aframe.io/releases/0.2.0/aframe.min.js'
]
---

<a-scene>
	<a-assets>
		<a-asset-item id="Feisar-ship-obj" src="a-frame-assets/Feisar_Ship_OBJ/Feisar_Ship.obj"></a-asset-item>
		<a-asset-item id="Feisar-ship-mtl" src="a-frame-assets/Feisar_Ship_OBJ/Feisar_Ship.mtl"></a-asset-item>
	</a-assets>

	<a-obj-model src="#Feisar-ship-obj" mtl="#Feisar-ship-mtl" position="0 -5 -20" rotation="0 90 0" scale="0.1 0.1 0.1"></a-obj-model>

	<a-sky color="#ECECEC">
	</a-sky>
</a-scene>
