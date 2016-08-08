
/* Follows an object around (don't need to be in same space) */

var __tempVector1 = new THREE.Vector3();
var __tempVector2 = new THREE.Vector3();

AFRAME.registerComponent('a-curve', {

	dependencies: ['a-curve-point'],

	schema: {

		// CatmullRom
		// Spline
		// ClosedSpline
		// CubicBezier
		// Line
		// QuadraticBezierCurve
		type: { default: 'SplineCurve' },
		drawn: {default: true}
	},

	update: function () {
		if (this.threeConstructor !== THREE[this.data.type + 'Curve3']) {
			this.threeConstructor = THREE[this.data.type + 'Curve3'];
			this.curve = null;
			this.points = null;
		}
		if (!this.points) {
			this.points = Array.from(this.el.children)
			.filter(function (a) {return a.tagName === 'A-CURVE-POINT'})
			.map(function (a) { return a.getComputedAttribute('position') })
		}
	},

	play: function () {
		// debugger;
	}
});

AFRAME.registerComponent('a-curve-point', {

	dependencies: ['position'],

	update: function () {
		// update parent a-curve
	}

});

AFRAME.registerPrimitive('a-curve-point', {
	mappings: {
		position: 'position'
	}
});


AFRAME.registerPrimitive('a-curve', {

	mappings: {
		type: 'a-curve.type',
		drawn: 'a-curve.type'
	}

});
