---
layout: post
title: Learning Aframe
description: Troubles I encountered when learning A-Frame
---

<!-- Define slide animation generators -->
<script>
	window.aSlidesSlideData = {};
</script>
<!-- contents -->

# My background

Just to state the angle I am coming from: Developer who studied graphics at university had experience with Maya and Blender. I've been using THREE.js for a number of years but never touch A-Frame.

I found the fastest way to learn was to build a component so I ported across two of my favourite THREE.js examples, Sky Shader and Ocean Shader.

## Getting Started

* https://aframe.io

I started looking at A-Frame 0.2.

> A basic format:
>
> ```html
>     <a-scene>
>       <a-assets>
>         <img id="lake" src="lake.jpg">
>         <img id="pdx" src="portland.png">
>         <a-asset-item id="sculpture" src="sculpture.dae"></a-asset-item>
>       </a-assets>
>
>       <a-sky src="#lake"></a-sky>
>       <a-collada-model src="#sculpture" position="0 0 -6"></a-collada-model>
>       <a-image src="#pdx" width="10" height="5" position="-2 1.2 -3"
>                scale="0.2 0.2 0.2"></a-image>
>     </a-scene>
> ```
>
> https://github.com/aframevr/aframe/blob/master/examples/showcase/composite/index.html
>

## Assets

https://aframe.io/docs/0.2.0/core/asset-management-system.html

Assets are defined in a-assets, 'a-asset-item' is for 3d models; `<audio>`, `<video>` and `<img>` for those respective types of asset.

## Some objects to put into the scene

* a-collada-model - A model in the collada format, (animations?)
* a-sky - 5000 unit radius sphere inside out on origin
* a-image - a plane with normal to the z-axis with defined width and height

## Items in the scene

There are number of predefined primitives used in the example above:

* `a-sky` - An inside-out sphere you can map an image to for 360 images/videos
* `a-collada-model` - A model imported from a collada file
* `a-image` - A plane which gets an image asigned to it's material

There are some default objects too which get added automatically. They are not specified above, but can be seen in the final scene.

* 2x `a-light` - One direction, one ambient. These have pretty sensible defaults but if you want to control the lighting yourself adding a light will remove these defaults.
* `a-camera` - The default camera. If you add one yourself (e.g. to position it or add a reticule/cursor) this gets removed.

These are all known as primitives. Primitives are syntatic sugar for combining the most primitive primitive `a-entity` with `component`s which are little bundles of logic. `a-entity` is the equivalent of an empty THREE.js node, it is the point of origin for all of it's children. This allows you to create a scene graph to attatch objects together.

For example in this the branches are children of the trunk and leaves children of the branches so that moving the branches will keep the leaves in place on the branch.

```html
<a-tree-trunk>
	<a-tree-branch>
		<a-tree-leaf></a-tree-leaf>
		<a-tree-leaf></a-tree-leaf>
		<a-tree-leaf></a-tree-leaf>
	</a-tree-branch>
	<a-tree-branch>
		<a-tree-leaf></a-tree-leaf>
		<a-tree-leaf></a-tree-leaf>
	</a-tree-branch>
</a-tree-trunk>
```

# Building my own component

https://aframe.io/docs/0.2.0/core/component.html

Every tag attribute in A-Frame is a component. E.g. Position, Width, Height
Think of a component like a small piece of logic.
It should be reusable for multiple entities.

It is where all the logic happens, primitives are just wrappers for components

defining your component:

```js

	// registers a new component
	AFRAME.registerComponent('a-ada-ocean', {
```

## `schema` - Object

Defines the valid attributes for your custom component. This is how the user will interact with your component e.g.

```html
	<a-entity a-ada-ocean="src: #normal-map; opacity: 0.8;"></a-entity>
```

```js
	function colorParse(str) {
		return (new THREE.Color(str)).getHex();
	}

	// ... later...

	schema: {
		src: { type: 'src' }, // The src attribute is of type 'src' which means it should pull out a url from what ever selector (or url) it is given
		width: { default: 100 }, // The type is inferred as float because the default value is a number
		opacity: {
			default: 1.0, // This is inferred as well
			min: 0, max: 1 // But is limited between 2 values
		},
		sunDirection: {
			type: 'vec3',
			default: { x: 1, y: 1, z: 1 } // This comes through as an object, you may want to convert it to THREE Vector3
		},
		sunColor: {
			default: 'white',
			parse: colorParse // This gets parsd by custom parsing function to turn a css color into a hex
		},
		light: {
			type: 'selector' // This returns the DOM node for this selector
		},
		sun: {
			default: true // This has been inferred as boolean
		}
	},
```

## `init` - Function

This function gets run when it is first initiated the attributes defined in the schema are available on `this.data`. Use it with THREE to add your objects and do your stuff.

At this point some other items in the scene may *not* be initiated yet.

## `update` - Function

	This gets called everytime the attributes are changed and immediately after `init`.

At this point some other items in the scene may *not* be initiated yet.

## `play` - Function

This gets called after `init` and when the entity is unpaused.

At this point all items in the scene should be ready to use.

## `init` - Function

Gets called every time the scene is rendered after `play()` e.g. 60-90 times per second.

## `pause` - Function

Stops tick being fired until unpaused by calling `play()`.

## `remove` - Function

Called when entity removed;

```js
	});
```

# Primitives

Primitives are just syntatic sugar for `a-entity`s and components. You can define a primitive which will map it's attributes to those needed for one or more components.

E.g.



# Mixins

Mixins allow you to remove some of a Components properties and share them. E.g.

```html
<a-scene>
	<a-assets>
		<a-mixin id="red" line="color: #E20049"></a-mixin>
	</a-assets>
	<a-entity id="happy-face" position="0 2 -10">
		<a-entity mixin="red" line="path: -1 1 0, -1 0.5 0, -1 0 0"></a-entity>
		<a-entity mixin="red" line="path: 1 1 0, 1 0.5 0, 1 0 0"></a-entity>
		<a-entity mixin="red" line="path: -2 -1 0, 0 -2 0, 2 -1"></a-entity>
	</a-entity>
	<a-sky color="#FFEED0"></a-sky>
</a-scene>
```

Notice how the mixin only has one line property set. Also notice how the color of the sky is the component name but the color of the line is a property of the line component.

# Primitives

Primitives are away to expose Components with a nice interface. E.g.

a-ocean adds the `ocean` component and maps properties to component attributes.

```js
AFRAME.registerPrimitive('a-ocean', {

	// Attaches the ocean component by default.
	// And smartly makes the ocean parallel to the ground.
	defaultComponents: {
		ocean: {},
		rotation: {x: -90, y: 0, z: 0}
	},

	// Maps HTML attributes to the developer's ocean component's properties.
	mappings: {
		width: 'ocean.width',
		depth: 'ocean.depth',
		density: 'ocean.density',
		color: 'ocean.color',
		opacity: 'ocean.opacity'
	}
});
```
