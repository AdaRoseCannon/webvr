/**
 * Based on https://github.com/mrdoob/three.js/blob/dev/examples/webgl_shaders_ocean.html
 * Requires:
 *
 *	'https://cdn.rawgit.com/mrdoob/three.js/82bd697ef06acf5c4173775abe053d7a499a6722/examples/js/Mirror.js',
 *	'https://cdn.rawgit.com/mrdoob/three.js/82bd697ef06acf5c4173775abe053d7a499a6722/examples/js/WaterShader.js'
 *
 */

function colorParse(str) {
	return (new THREE.Color(str)).getHex();
}

AFRAME.registerComponent('a-ada-ocean', {

	schema: {
		src: { type: 'src' },
		width: { default: 100 },
		depth: { default: 100 },
		distortionScale: {default: 10},
		opacity: {
			default: 1.0,
			min: 0, max: 1
		},
		srcHeight: { default: 512 },
		srcWidth: { default: 512 },
		sunDirection: {
			type: 'vec3',
     		default: { x: 1, y: 1, z: 1 }
		},
		sunColor: {
			default: 'white',
			parse: colorParse
		},
		waterColor: {
			default: '#001e0f',
			parse: colorParse
		}
	},

	init: function () {
		this.water = null;
	},

	update: function () {
		this.water = undefined;
	},

	tick: function (time) {
		if (this.water) {
			this.water.material.uniforms.time.value = time/5000;
			this.water.render();
		} else if (
			this.el.sceneEl.renderer &&
			this.el.sceneEl.camera
		) {
			waterNormals = new THREE.TextureLoader().load( this.data.src );
			waterNormals.wrapS = waterNormals.wrapT = THREE.RepeatWrapping;
			water = new THREE.Water( this.el.sceneEl.renderer, this.el.sceneEl.camera, this.el.sceneEl.object3D, {
				textureWidth: this.data.srcHeight,
				textureHeight: this.data.srcWidth,
				waterNormals: waterNormals,
				alpha: 	this.data.opacity,
				sunDirection: this.data.sunDirection,
				sunColor: this.data.sunColor,
				waterColor: this.data.waterColor,
				distortionScale: this.data.distortionScale
			} );
			mirrorMesh = new THREE.Mesh(
				new THREE.PlaneBufferGeometry( this.data.width, this.data.depth ),
				water.material
			);
			mirrorMesh.add( water );
			mirrorMesh.rotation.x = - Math.PI * 0.5;

			this.water = water;
			this.el.setObject3D('mesh', mirrorMesh);
		}
	},

	remove: function () {}
});

AFRAME.registerPrimitive('a-ada-ocean', {
  // Attaches the ocean component by default.
  // And smartly makes the ocean parallel to the ground.
  defaultComponents: {
    ocean: {},
    rotation: {x: -90, y: 0, z: 0}
  },
  // Maps HTML attributes to his ocean component's properties.
  mappings: {
    width: 'ocean.width',
    depth: 'ocean.depth',
    density: 'ocean.density',
    color: 'ocean.color',
    opacity: 'ocean.opacity'
  }
});