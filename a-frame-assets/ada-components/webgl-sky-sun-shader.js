/**
 * Based on https://github.com/brianchirls/three.js/blob/master/examples/webgl_shaders_sky.html
 * Requires:
 *
 *	https://cdn.rawgit.com/mrdoob/three.js/blob/r75/examples/js/SkyShader.js
 *
 */

var distance = 50;

AFRAME.registerComponent('a-ada-sky', {

	schema: {
		turbidity: { default: 10 },
		reileigh: { default: 2 },
		mieCoefficient: { default: 0.005 },
		mieDirectionalG: { default: 0.8 },
		luminance: { default: 1 },
		inclination: { default: 0.49 }, // elevation / inclination
		azimuth: { default: 0.25 }, // Facing front,
		sun: { default: true }
	},

	init: function () {

		// Add Sky Mesh
		this.sky = new THREE.Sky();

		// Add Sun Helper
		this.sunSphere = new THREE.Mesh(
			new THREE.SphereBufferGeometry( 20000, 16, 8 ),
			new THREE.MeshBasicMaterial( { color: 0xffffff } )
		);
		this.sunSphere.position.y = - 700000;
		this.sunSphere.visible = false;

		this.sky.mesh.add(this.sunSphere);
		this.sky.mesh.scale.multiplyScalar(0.01);
		this.el.setObject3D('mesh', this.sky.mesh);
	},

	getSunSphere: function () {
		return this.sunSphere;
	},

	update: function () {

		var uniforms = this.sky.uniforms;
		uniforms.turbidity.value = this.data.turbidity;
		uniforms.reileigh.value = this.data.reileigh;
		uniforms.luminance.value = this.data.luminance;
		uniforms.mieCoefficient.value = this.data.mieCoefficient;
		uniforms.mieDirectionalG.value = this.data.mieDirectionalG;

		var theta = Math.PI * ( this.data.inclination - 0.5 );
		var phi = 2 * Math.PI * ( this.data.azimuth - 0.5 );

		this.sunSphere.position.x = distance * Math.cos( phi );
		this.sunSphere.position.y = distance * Math.sin( phi ) * Math.sin( theta );
		this.sunSphere.position.z = distance * Math.sin( phi ) * Math.cos( theta );

		this.sunSphere.visible = this.data.sun;

		this.sky.uniforms.sunPosition.value.copy( this.sunSphere.position );
	},

	remove: function () {
		this.sky.remove();
		this.sky = undefined;
	}
});

AFRAME.registerPrimitive('a-ada-sky', {
	defaultComponents: {
		'a-ada-sky': {}
	},
	mappings: {
		turbidity: 'a-ada-sky.turbidity',
		reileigh: 'a-ada-sky.reileigh',
		mieCoefficient: 'a-ada-sky.mieCoefficient',
		mieDirectionalG: 'a-ada-sky.mieDirectionalG',
		luminance: 'a-ada-sky.luminance',
		inclination: 'a-ada-sky.inclination',
		azimuth: 'a-ada-sky.azimuth',
		sun: 'a-ada-sky.sun'
	}
});