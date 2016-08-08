
/* Follows an object around (don't need to be in same space) */

var __tempVector1 = new THREE.Vector3();
var __tempVector2 = new THREE.Vector3();

function getPoints(domList) {
	return Array.from(domList)
		.filter(function (a) {return a.tagName === 'A-CURVE-POINT'})
		.map(function (a) { return (new THREE.Vector3()).copy(AFRAME.utils.coordinates.parse(a.getAttribute('position'))); })
}

AFRAME.registerComponent('a-curve-point', {

	dependencies: ['position'],

	init: function () {
		this.el.updateComponent('position');
	},

	update: function () {
		this.el.parentEl.updateComponent('a-curve');
	},

	remove: function () {
		this.update();
	}

});

AFRAME.registerComponent('a-curve', {

	schema: {

		// CatmullRom
		// Spline
		// CubicBezier
		// QuadraticBezier
		// Line
		type: { default: 'CatmullRom' }
	},

	init: function () {
		this.update();
	},

	// gets called when child a-curve-points get updated
	update: function () {
		this.threeConstructor = THREE[this.data.type + 'Curve3'];
		this.play();

		// prepare to be populated
		this.remove();

		if (!this.points) {
			this.points = getPoints(this.el.children);
		}
		if (!this.curve) {

			// apply the points as ags to the Beziers
			if (this.data.type.match(/QuadraticBezier|CubicBezier|Line/)) {
				this.curve = (Function.prototype.bind.apply(this.threeConstructor, this.points));
			} else {
				if (!this.threeConstructor) {
					this.pause();
					throw ('No Three constructor of type (case sensitive): ' + this.data.type + 'Curve3');
				}
				this.curve = new this.threeConstructor(this.points);
			}

			this.el.setObject3D('curve', this.curve);
			this.ready = true;
		}
	},

	remove: function () {
		this.curve = null;
		this.points = null;
		this.ready = false;
		this.el.removeObject3D('curve');
	}
});

AFRAME.registerShader('line', {
	schema: {},

	init: function (data) {
		this.material = new THREE.LineBasicMaterial(data);
	}
});

AFRAME.registerComponent('a-draw-curve', {

	dependencies: ['a-curve', 'material	'],

	schema: {
		curve: { type: 'selector' },
		accuracy: { default: 10 }
	},

	update: function () {
		if (this.data.curve) {
			this.curve = this.data.curve.components['a-curve'].curve;
		} else if (this.components['a-curve'].curve) {
			this.curve = this.components['a-curve'].curve;
		}

		if (this.curve) {

			var points = this.curve.getSpacedPoints(this.data.accuracy);
			var mesh = this.el.getOrCreateObject3D('mesh', THREE.Line);
			var geometry = mesh.geometry = new THREE.Geometry();
			points.forEach(function (p) {
				geometry.vertices.push(p);
			});
		}
	},

	remove: function () {

		this.el.getObject3D('mesh').geometry = new THREE.Geometry();
	}

});

AFRAME.registerPrimitive('a-draw-curve', {
	defaultComponents: {
		'a-draw-curve': {},
		'material': {}
	},
	mappings: {
		curve: 'a-draw-curve.curve',
		material: 'material'
	}
});

AFRAME.registerPrimitive('a-curve-point', {
	defaultComponents: {
		'a-curve-point': {}
	}
});


AFRAME.registerPrimitive('a-curve', {

	defaultComponents: {
		'a-curve': {}
	},

	mappings: {
		type: 'a-curve.type',
		drawn: 'a-curve.type'
	}

});
