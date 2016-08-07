
/* Follows an object around (don't need to be in same space) */

var __tempVector1 = new THREE.Vector3();
var __tempVector2 = new THREE.Vector3();

AFRAME.registerComponent('a-curve', {

	schema: {
		type: { default: 'spline', type: [] },
		closed: {default: false }
	},

	tick: function () {
	}
});