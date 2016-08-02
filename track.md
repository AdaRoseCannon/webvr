---
layout: a-frame
title: Track
description: A-Frame Demo
image: ./images/track-screenshot.jpg
scripts: [
	'https://cdn.rawgit.com/aframevr/aframe/9045c899d5a1fb4649720c2d1e9f530209533f23/dist/aframe.js',
	'https://cdn.rawgit.com/mrdoob/three.js/82bd697ef06acf5c4173775abe053d7a499a6722/examples/js/Mirror.js',
	'https://cdn.rawgit.com/mrdoob/three.js/82bd697ef06acf5c4173775abe053d7a499a6722/examples/js/WaterShader.js',
	'a-frame-assets/ada-components/webgl-ocean-shader.js'
]
---

<a-scene fog="type: linear; color: #ECECEC; far: 100;" isMobile="true">
	<a-assets>
		<a-asset-item id="Feisar-ship-obj" src="a-frame-assets/Feisar_Ship_OBJ/Feisar_Ship.obj"></a-asset-item>
		<a-asset-item id="Feisar-ship-mtl" src="a-frame-assets/Feisar_Ship_OBJ/Feisar_Ship.mtl"></a-asset-item>
		<img id="water-normal" src="https://raw.githubusercontent.com/mrdoob/three.js/dev/examples/textures/waternormals.jpg" crossorigin="anonymous" />
	</a-assets>

	<a-entity position="0 -5 -20" rotation="0 90 0" scale="0.1 0.1 0.1">
		<a-obj-model src="#Feisar-ship-obj" mtl="#Feisar-ship-mtl"></a-obj-model>
	</a-entity>

	<a-ada-ocean position="0 -5 0" src="#water-normal" width="1000" depth="1000"></a-ada-ocean>

	<a-sky color="#ECECEC"></a-sky>
</a-scene>

<script>

</script>