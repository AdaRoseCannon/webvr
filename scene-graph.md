---
layout: a-frame
title: Robot
description: A scene graph example
image: ./images/track-screenshot.jpg
scripts: [
	'https://cdn.rawgit.com/aframevr/aframe/679a5d9fa501e81f5fdfa36d162580a116946fd1/dist/aframe-v0.2.0.min.js', # master at the time of writing
]
---

<a-scene>

	<a-entity id="robot" position="0 0 2" scale="1.5 1.5 1.5">

		<a-animation attribute="scale"
			dur="5000"
			direction="alternate"
			to="2 2 2"
			repeat="indefinite"></a-animation>

		<a-box id="body" width="0.3" depth="0.2" height="0.4" position="0 0.8 0" color="grey">

			<!-- legs-->
			<a-box id="leftleg" width="0.05" depth="0.05" height="0.4" position="-0.125 -0.4 0" color="cornflowerblue"></a-box>
			<a-box id="rightleg" width="0.05" depth="0.05" height="0.4" position="0.125 -0.4 0" color="cornflowerblue"></a-box>

			<a-entity id="rightshoulder" position="0.155 0.2 0" rotation="-45 0 0" >
				<a-animation attribute="rotation"
					dur="700"
					direction="alternate"
					to="45 0 10"
					repeat="indefinite"></a-animation>
				<!-- the shoulder has no geometry itself but is a point which will be rotated to move the arm -->
				<a-box id="rightarm" width="0.05" depth="0.05" height="0.4" position="0.03 -0.2 0" color="mediumseagreen">
					<a-sphere color="yellow" radius="0.04" position="0 -0.2 0"></a-sphere>
				</a-box>
			</a-entity>

			<a-entity id="leftshoulder" position="-0.155 0.2 0" rotation="-45 0 0">
				<a-animation attribute="rotation"
					dur="700"
					direction="alternate-reverse"
					to="45 0 -10"
					repeat="indefinite"></a-animation>
				<!-- the shoulder has no geometry itself but is a point which will be rotated to move the arm -->
				<a-box id="leftarm" width="0.05" depth="0.05" height="0.4" position="-0.03 -0.2 0" color="mediumseagreen">
					<a-sphere color="yellow" radius="0.04" position="0 -0.2 0"></a-sphere>
				</a-box>
			</a-entity>

			<a-cylinder id="head" color="grey" height="0.2" radius="0.08" segments-radial="8" position="0 0.3 0" rotation="0 -60 0">
				<a-animation attribute="rotation"
					dur="2000"
					direction="alternate-reverse"
					to="0 60 0"
					repeat="indefinite"></a-animation>
				<a-box id="lefteye" width="0.03" depth="0.03" height="0.03" position="-0.035 0.04 0.06" color="crimson"></a-box>
				<a-box id="righteye" width="0.03" depth="0.03" height="0.03" position="0.035 0.04 0.06" color="crimson"></a-box>
			</a-cylinder>
		</a-box>
	</a-entity>

	<a-plane rotation="-90 0 0" width="4" height="4" color="#7BC8A4"></a-plane>
	<a-sky color="#ECECEC"></a-sky>
</a-scene>