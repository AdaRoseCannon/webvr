// Based on https://github.com/aframevr/aframe/blob/master/src/components/wasd-controls.js
// it controls the ship with wasd

var shouldCaptureKeyEvent = AFRAME.utils.shouldCaptureKeyEvent;

var MAX_DELTA = 0.2;

/**
 * WASD component to control entities using WASD keys.
 */
AFRAME.registerComponent('ada-ship-controller', {
	schema: {
		easing: { default: 20 },
		acceleration: { default: 65 }
	},

	init: function () {
		this.velocity = new THREE.Vector3();
		// To keep track of the pressed keys
		this.keys = {};
		this.onBlur = this.onBlur.bind(this);
		this.onFocus = this.onFocus.bind(this);
		this.onVisibilityChange = this.onVisibilityChange.bind(this);
		this.onKeyDown = this.onKeyDown.bind(this);
		this.onKeyUp = this.onKeyUp.bind(this);
		this.attachVisibilityEventListeners();
	},

	update: function (previousData) {
		var data = this.data;
		var acceleration = data.acceleration;
		var easing = data.easing;
		var velocity = this.velocity;
		var prevTime = this.prevTime = this.prevTime || Date.now();
		var time = window.performance.now();
		var delta = (time - prevTime) / 1000;
		var keys = this.keys;
		var movementVector;
		var el = this.el;
		this.prevTime = time;

		// If data changed or FPS too low, reset velocity.
		if (previousData || delta > MAX_DELTA) {
			velocity.x = 0;
			velocity.z = 0;
			return;
		}

		velocity.x -= velocity.x * easing * delta;
		velocity.z -= velocity.z * easing * delta;

		var position = el.getComputedAttribute('position');

		if (keys[65]) { velocity.x -= acceleration * delta; } // Left
		if (keys[68]) { velocity.x += acceleration * delta; } // Right
		if (keys[87]) { velocity.z -= acceleration * delta; } // Up
		if (keys[83]) { velocity.z += acceleration * delta; } // Down

		movementVector = this.getMovementVector(delta);
		el.object3D.translateX(movementVector.x);
		el.object3D.translateY(movementVector.y);
		el.object3D.translateZ(movementVector.z);

		el.setAttribute('position', {
			x: position.x + movementVector.x,
			y: position.y + movementVector.y,
			z: position.z + movementVector.z
		});
	},

	play: function () {
		this.attachKeyEventListeners();
	},

	pause: function () {
		this.keys = {};
		this.removeKeyEventListeners();
	},

	tick: function (t) {
		this.update();
	},

	remove: function () {
		this.pause();
		this.removeVisibilityEventListeners();
	},

	attachVisibilityEventListeners: function () {
		window.addEventListener('blur', this.onBlur);
		window.addEventListener('focus', this.onFocus);
		document.addEventListener('visibilitychange', this.onVisibilityChange);
	},

	removeVisibilityEventListeners: function () {
		window.removeEventListener('blur', this.onBlur);
		window.removeEventListener('focus', this.onFocus);
		document.removeEventListener('visibilitychange', this.onVisibilityChange);
	},

	attachKeyEventListeners: function () {
		window.addEventListener('keydown', this.onKeyDown);
		window.addEventListener('keyup', this.onKeyUp);
	},

	removeKeyEventListeners: function () {
		window.removeEventListener('keydown', this.onKeyDown);
		window.removeEventListener('keyup', this.onKeyUp);
	},

	onBlur: function () {
		this.pause();
	},

	onFocus: function () {
		this.play();
	},

	onVisibilityChange: function () {
		if (document.hidden) {
			this.onBlur();
		} else {
			this.onFocus();
		}
	},

	onKeyDown: function (event) {
		if (!shouldCaptureKeyEvent(event)) { return; }
		this.keys[event.keyCode] = true;
	},

	onKeyUp: function (event) {
		if (!shouldCaptureKeyEvent(event)) { return; }
		this.keys[event.keyCode] = false;
	},

	getMovementVector: (function (delta) {
		var direction = new THREE.Vector3(0, 0, 0);
		var rotation = new THREE.Euler(0, 0, 0, 'YXZ');
		return function (delta) {
			var velocity = this.velocity;
			var elRotation = this.el.getComputedAttribute('rotation');
			direction.copy(velocity);
			direction.multiplyScalar(delta);
			if (!elRotation) { return direction; }
			if (!this.data.fly) { elRotation.x = 0; }
			rotation.set(THREE.Math.degToRad(elRotation.x),
									 THREE.Math.degToRad(elRotation.y), 0);
			direction.applyEuler(rotation);
			return direction;
		};
	})()
});
