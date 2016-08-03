var noY = { x: 1, y: 0, z: 1 };

/* Follows an object around in the XZ plane */

AFRAME.registerComponent('ada-follow', {

	schema: {
		distance: { type: 'float' },
		strength: { default: 0.03 },
		target: { type: 'selector' }
	},

	play: function () {

		// default to maintaining the starting distance
		if (!this.data.distance) {
			this.data.distance = this.el.object3D.position.distanceTo(this.data.target.object3D.position);
		}
		this.__tempVectorNewTarget = new THREE.Vector3();
	},

	tick: function () {
		var usPos = this.el.object3D.position;
		var targetPos = this.data.target.object3D.position;

		this.__tempVectorNewTarget.copy(usPos).sub(targetPos).multiply(noY).normalize().multiplyScalar(this.data.distance);

		usPos.add(this.__tempVectorNewTarget.sub(usPos).multiply(noY).multiplyScalar(this.data.strength));
	}
});