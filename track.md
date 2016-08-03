---
layout: a-frame
title: Track
description: A-Frame Demo
image: ./images/track-screenshot.jpg
scripts: [
	'https://cdn.rawgit.com/aframevr/aframe/9045c899d5a1fb4649720c2d1e9f530209533f23/dist/aframe.js', # master at the time of writing
	'https://cdn.rawgit.com/mrdoob/three.js/r75/examples/js/Mirror.js', # For a-ada-ocean
	'https://cdn.rawgit.com/mrdoob/three.js/r75/examples/js/WaterShader.js', # For a-ada-ocean
	'a-frame-assets/ada-components/webgl-ocean-shader.js?cb=1',

	'https://cdn.rawgit.com/mrdoob/three.js/r79/examples/js/SkyShader.js', # For the sky/sun
	'a-frame-assets/ada-components/webgl-sky-sun-shader.js'
]
---

<a-scene fog="type: linear; color: #ECECEC; far: 100;" isMobile inspector>

	<a-entity position="0 1.8 0">
		<a-camera></a-camera>
	</a-entity>

	<a-entity light="color: #FFFFFF; intensity: 0.3; type: ambient;"></a-entity>

	<a-assets>
		<a-asset-item id="Feisar-ship-obj" src="a-frame-assets/Feisar_Ship_OBJ/Feisar_Ship.obj"></a-asset-item>
		<a-asset-item id="Feisar-ship-mtl" src="a-frame-assets/Feisar_Ship_OBJ/Feisar_Ship.mtl"></a-asset-item>
		<img id="water-normal" src="https://raw.githubusercontent.com/mrdoob/three.js/dev/examples/textures/waternormals.jpg" crossorigin="anonymous" />
	</a-assets>

	<a-entity position="0 1 -10" rotation="0 90 0" scale="0.05 0.05 0.05">
		<a-obj-model src="#Feisar-ship-obj" mtl="#Feisar-ship-mtl"></a-obj-model>
	</a-entity>

	<a-ada-sky control="#sun" inclination="0.49">
		<!-- This light gets positioned by the sky -->
		<a-entity light="color: #FFFFFF; intensity: 1.5" id="sun"></a-entity>
	</a-ada-sky>

	<a-ada-ocean position="0 0 0" src="#water-normal" width="1000" depth="1000" light="#sun">
	</a-ada-ocean>

</a-scene>

<script>

</script>