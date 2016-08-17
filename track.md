---
layout: a-frame
title: Track
description: A-Frame Demo
image: ./images/track-screenshot.jpg
scripts: [
	'https://cdn.rawgit.com/aframevr/aframe/679a5d9fa501e81f5fdfa36d162580a116946fd1/dist/aframe.min.js', # A-Frame master at the time of writing

	'https://cdn.rawgit.com/ngokevin/aframe-look-at-component/ddcf223e7fdeec3b536bbc43a233b994cd6d4653/dist/aframe-look-at-component.min.js', # look at component

	'https://cdn.rawgit.com/mrdoob/three.js/r75/examples/js/Mirror.js', # For a-ada-ocean
	'https://cdn.rawgit.com/mrdoob/three.js/r75/examples/js/WaterShader.js', # For a-ada-ocean
	'a-frame-assets/ada-components/webgl-ocean-shader.js?cb=1',

	# 'https://cdn.rawgit.com/mrdoob/three.js/r79/examples/js/SkyShader.js', # Shader For the sky/sun
	# 'a-frame-assets/ada-components/webgl-sky-sun-shader.js',

	'a-frame-assets/ada-components/follow.js',
	'a-frame-assets/ada-components/ada-ship-controller.js',
	'a-frame-assets/ada-components/curve.js'
]
---

<a-scene inspector stats physics="debug: true">

	<!-- Assets -->

	<a-assets>
		<a-asset-item id="Feisar-ship-obj" src="a-frame-assets/Feisar_Ship_OBJ/Feisar_Ship.obj"></a-asset-item>
		<a-asset-item id="Feisar-ship-mtl" src="a-frame-assets/Feisar_Ship_OBJ/Feisar_Ship.mtl"></a-asset-item>

		<a-asset-item id="race-track-obj" src="a-frame-assets/race-track/race-track.obj"></a-asset-item>
		<a-asset-item id="race-track-mtl" src="a-frame-assets/race-track/race-track.mtl"></a-asset-item>

		<img id="water-normal" src="https://raw.githubusercontent.com/mrdoob/three.js/dev/examples/textures/waternormals.jpg" crossorigin="anonymous" />

		<!-- Sky is free sample sky from cgskies, buy one for commecial use -->
		<img id="cgsky" src="a-frame-assets/sky/CGSkies_0347_free.jpg" crossorigin="anonymous" />
	</a-assets>

	<!-- CAMERA -->

	<a-entity look-at="#ship" follow="target: #ship-camera-target;">
		<a-entity position="0 6 0" rotation="0 180 0">

			<!-- Disable the default wasd controls we are using those to control the ship -->
			<a-camera wasd-controls="enabled: false;"></a-camera>
		</a-entity>
	</a-entity>


	<a-entity ada-ship-controller="easing: 5; acceleration: 100; rollTarget: #ship; turnTarget: #controller-target;">
		<a-entity id="controller-target" rotation="0 0 0">
			<a-entity  id="ship-camera-target" position="0 0 -15"></a-entity>
			<a-obj-model src="#Feisar-ship-obj" mtl="#Feisar-ship-mtl" position="0 1 0" id="ship"></a-obj-model>
		</a-entity>
	</a-entity>

	<!-- ENVIRONMENT -->

	<a-entity light="color: #FFFFFF; intensity: 0.3; type: ambient;"></a-entity>

	<!-- SKY SHADER, not very performant :(  -->
	<!--<a-ada-sky control="#sun" inclination="0.49">
		<a-entity light="color: #FFFFFF; intensity: 1.5" id="sun"></a-entity>
	</a-ada-sky>-->

	<!-- Prerendered for performance -->
	<a-sky src="#cgsky" position="0 -1 0" rotation="0 -90 0">
		<a-entity light="color: #FFFFFF; intensity: 1.5" position="0 1 50"></a-entity>
	</a-sky>

	<a-ada-ocean position="0 0 0" src="#water-normal" opacity="0.6" width="1000" depth="1000" light="#sun"></a-ada-ocean>

	<!-- TRACK -->

	<a-curve id="track" curve="CatmullRom">
		<a-curve-point position="30 -10 0"></a-curve-point>
		<a-curve-point position="0 0 0"></a-curve-point>
		<a-curve-point position="-60 4 30"></a-curve-point>
		<a-curve-point position="-60 10 60"></a-curve-point>
		<a-curve-point position="-60 10 120"></a-curve-point>
		<a-curve-point position="-60 50 180"></a-curve-point>
		<a-curve-point position="-60 10 240"></a-curve-point>
	</a-curve>

	<a-draw-curve curve="#track" material="shader: line; color: red;"></a-draw-curve>

	<a-entity floor-track clone-along-curve="curve: #track; spacing: 7; scale: 6 5 2;" obj-model="obj: #race-track-obj; mtl: #race-track-mtl;"></a-entity>

</a-scene>

<script>

	function getCurveFromTrack(a) { return a.components['clone-along-curve'].data.curve.components.curve; }

	var shipController = document.querySelector('[ada-ship-controller]').components['ada-ship-controller'];
	var curves = Array.from(document.querySelectorAll('[floor-track]'));
	var gravity = 9.8;
	var __temp = new THREE.Vector3();

	var currentFloor = {
		height: 0,
		normal: new THREE.Vector3()
	}

	function updateCurrentFloor(p) {
		var h = 0;
		for (var i in curves) {
			var d = getCurveFromTrack(curves[i]).closestPointInLocalSpace(p);
			if (d.distance < 10) {
				h = Math.max(d.location.y, h);
			}
		}
		return h;
	}

	AFRAME.registerSystem('custom-fuzzy-physics', {
		tick: function () {
			var p = document.querySelector('[ada-ship-controller]').getComputedAttribute('position');
			updateCurrentFloor(p);
			if (p.y > currentFloor.height) {
				shipController.velocity.y -= gravity;
			}
			if (p.y < currentFloor.height) {
				shipController.velocity.y /= 5;
				shipController.velocity.y = Math.abs(shipController.velocity.y);
				if (currentFloor.height - p.y < 10) {

					var magnitude = __temp.copy(shipController.velocity).length();

					__temp.y += (currentFloor.height - p.y);

					__temp.normalize().multiplyScalar(magnitude);

					shipController.velocity.copy(__temp);
				}
			}
		}
	});
</script>