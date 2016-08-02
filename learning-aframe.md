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

## Assets

https://aframe.io/docs/0.2.0/core/asset-management-system.html

Assets are defined in a-assets, 'a-asset-item' is for 3d models; `<audio>`, `<video>` and `<img>` for those respective types of asset.

## Some objects to put into the scene

* a-collada-model - A model in the collada format, (animations?)
* a-sky - 5000 unit radius sphere inside out on origin
* a-image - a plane with normal to the z-axis with defined width and height

# Building my own component

https://aframe.io/docs/0.2.0/core/component.html

Every tag attribute in A-Frame is a component. E.g. Position, Width, Height
Think of a component like an npm script.
Either monumental like Express or tiny like Leftpad.
It should be reusable for multiple entities.

# Mixins

Mixins allow you to remove some of a Components properties and share them. E.g.

```
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
