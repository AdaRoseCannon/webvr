---
layout: post
title: AFrame for View Source
description: Touching on A-Frame and tools for authoring content.
image: http://i.imgur.com/1CuaofJ.jpg
scripts: [
	'https://cdn.rawgit.com/aframevr/aframe/679a5d9fa501e81f5fdfa36d162580a116946fd1/dist/aframe.min.js',
	'https://cdn.rawgit.com/AdaRoseEdwards/dirty-dom/v1.3.1/build/dirty-dom-lib.min.js'
]
---

# View Source Workshop

<!-- Link to trigger conversion script -->
[Convert to Slide Deck](#aslides)

<span>Length should be <span id="a-frame-clock">15</span> minutes.</span>

Hi, I'm Ada from Samsung.

I am really irritating at dinner parties.

I am perpetually bringing out VR headsets and trying to get people to have a go.

I love building and showing off cool VR demos.

Now it is now easier than ever before with A-Frame.

When they do give it a go though

my favourite moment is when they get wowed by the immersion and they make this face:

<!-- This slide uses information from _config.yml -->
<blockquote class="dark" id="splash-slide" style="background-image: url('images/pattern.svg');">
<h1>{{ site.name }}</h1>
<h3>{{ site.description }}</h3>
<h2>{{site.author.name}} - {{site.author.company}}</h2>
</blockquote>

# Faces

I love that face.

My goal is to get you building stuff with A-Frame

so you can make your friends and relatives have the same

awed expression

<script>window.aSlidesSlideData['slide-faces'] = window.contentSlide([
	{image: 'images/face1.jpg'},
	{image: 'images/face2.jpg'},
	{image: 'images/face3.jpg'},
	{image: 'images/face4.jpg'},
	{image: 'images/face5.jpg'}
]);</script>
> ![Face](images/face1.jpg)

# What is A-Frame

A-Frame a is a JavaScript library to abstract away the difficult and the rote parts of Virtual Reality.

A-Frame is built on top of another library called THREE.js

It also includes the WebVR polyfill.

The WebVR polyfill allows all smartphones to be VR capable with Google Cardboard

THREE.js provides a nice way to work with 3D rendering.

A-Frame simplifies everything and abstracts away the more difficult bits.

Allowing us to get started straight away!

> ![WebVR](images/VR-Requirements.svg)

Why do I like A-Frame?

A-Frame allows you to compose scenes with 3D models, Videos, Audio, Images by writing html.

It handles a lot of the heavy lifting and edge cases.

The fundamentals of a scene are already set up so don't need to be written out again and again and again

I can get started making something straight away with no faffing about.

> ![Aframe](images/aframevr.png)
>
> # https://aframe.io/

# Composing scenes with A-Frame

A-Frame is webby.

Well for one it looks like html and can be written directly into your markup.

It gives new html elements for building virtual reality

*Who here has built a website by typing out html before?*

It is much the same. Like HTML you can do an awful lot without writing a single line of javascript. But you can still use JavaScript to add extra functionality of you want.

It is also modular and extensible.

Modular means that I can write a component. For example. A component to give a heads up display or fancy lighting.

Then anyone can include it in their scenes without needing to write complex JavaScript.

It is extensible because my components will be based on other A-Frame components and you can release components that depend on mine.

You are not required to write a single line of JavaScript unless you want to make your own components.

* Walk through this line by line *

> ```html
	<html>
	<head>
		<script src="js/a-frame.js"></script>
	</head>
	<body>
		<a-scene>
			<a-sphere position="0 1.25 -1" radius="1.25" color="#EF2D5E"></a-sphere>
			<a-box position="-1 0.5 1" rotation="0 45 0" color="#4CC3D9"></a-box>
			<a-cylinder position="1 0.75 1" radius="0.5" color="#FFC65D"></a-cylinder>
			<a-plane rotation="-90 0 0" width="4" height="4" color="#7BC8A4"></a-plane>
			<a-sky color="#ECECEC"></a-sky>
		</a-scene>
	</body>
	</html>
```

# a-frame-basic-demo

This html from the previous slide gives us this.

But A-Frame gives us lots of hidden extras, all the basics to get started:

* The scene already has lighting
* It has a Camera
* That camera can be moved around by using the Arrow keys and clicking and dragging
* If you open it on your phone it is controlled by moving your phone
* It even has in built VR support, for both Cardboard devices and VR Headsets like the Samsung Gear VR

All of this functionality can be overridden if you don't like it or if you want more control.

<script>window.aSlidesSlideData['slide-a-frame-basic-demo'] = window.iframeSlide</script>

> <iframe src="basic.html" seamless="seamless"></iframe>
>
> ## {{ site.url }}/basic.html

The Gear VR does not run VR websites out of the box it needs to be turned on.

This is a bit annoying and confusing because my demos wouldn't work and I didn't know why.


<blockquote class="dark" style="background-image: url('images/nowebvr.jpg');">
	<h1>Testing if WebVR is available</h1>
	<p><br />&nbsp;</p>
	<h1>http://threejs.org/examples/webvr_cubes.html</h1>
</blockquote>

Now your headset is set up to make the most of VR in the web!!!

Try that previous url again and you will see a cool demo, or try out any of the A-Frame demos.

Now we have WebVR set up lets actually build something.


<blockquote class="dark" style="background-image: url('images/webvr-enable.jpg');">
	<h2>To enable webvr in GearVR open this URL in the WebVR browser</h2>
	<p><br />&nbsp;</p>
	<h1>internet://webvr-enable</h1>
</blockquote>

# Actually building something

The first thing a lot of people build is a 360 degree photo/video Viewer.

It makes a great first project as it has very few components/

So we'll look at that first as it is a very simple demo.

<script>window.aSlidesSlideData['slide-actually-building-something'] = window.iframeSlide</script>

> <iframe src="360-simple.html" seamless="seamless"></iframe>
>
> ## {{ site.url }}/360-simple.html

Here I have some images I want to use.

These go into the a-assets tag, this tells a-frame to preload these for later.

We override the camera, by defining our own with the keyboard controls disabled. We don't want too let the user move around in the scene.

The final piece is the sky, the sky is an evenly lit inside out sphere. We give it the image we want to display and it shows it off.

This has all the features we want from a 360 image viewer, you can rotate the camera, view it immersively in vr and all in 7 lines of html

The image itself looks like this:

> ```html
<a-scene>
	<a-assets>
		<img id="img1" src="a-frame-assets/SAM_100_0042_SMALL.jpg" />
	</a-assets>
>
	<a-camera wasd-controls="enabled: false;"></a-camera>
>
	<a-sky src="#img1"></a-sky>
>
</a-scene>
```

The image itself looks like this:

> ![A 360 image taken with the gear VR](a-frame-assets/SAM_100_0042_SMALL.jpg)

I took it with my 360 camera (no reason to post this I just think it is adorable):

> ![The adorable Gear360](images/gear360.jpg)

# Adding some interactivity

If you are comfortable writing JavaScript and want to do something more advanced

You can, you can use JavaScript to control a-frame just like you would use it on normal html

Here I have written a small script to rotate through some images whenever I click.

> ```html
<a-scene>
	<a-assets>
		<img id="img1" src="a-frame-assets/SAM_100_0046_SMALL.jpg" />
		<img id="img2" src="a-frame-assets/SAM_100_0063_SMALL.jpg" />
		<img id="img3" src="a-frame-assets/SAM_100_0042_SMALL.jpg" />
	</a-assets>
>
	<a-camera wasd-controls="enabled: false;"></a-camera>
	<a-sky src="#img1"></a-sky>
>
</a-scene>
>
<script>
	var index = 0;
	var images = document.querySelectorAll('a-assets img');
	var sky = document.querySelector('a-sky');
	window.addEventListener('click', function () {
		index = (index + 1) % images.length;
		sky.setAttribute('src', '#' + images[index].id);
	});
</script>
```

# Demo 360 Slideshow

<script>window.aSlidesSlideData['slide-demo-360-slideshow'] = window.iframeSlide</script>

> <iframe src="360.html" seamless="seamless"></iframe>
>
> ## {{ site.url }}/360.html


# Introduce some tools for making 3d content

Enough showing you my holiday photos, what if you want to actually include a more complex 3D object:

A-Frame comes with a whole bunch of geometric primitives.

By one sided I mean that if you were to view it from the back you don't see anything.

> * Box
> * Circle (One sided)
> * Cone
> * Cylinder Primitive
> * Plane (One sided)
> * Ring
> * Sphere
> * Torus (A donut)
> * Torus Knot

# One Sided

In 3D unless specified otherwise flat shapes are one sided

By one sided I mean that if you were to view it from the back you don't see anything.

But there is only so much you can do with primitives.

We can make them a little more complex by attatching them together.

<script>window.aSlidesSlideData['slide-one-sided'] = window.iframeSlide</script>

> <iframe src="one-sided.html" seamless="seamless"></iframe>
>
> ## {{ site.url }}/one-sided.html

# Models from Primitives

By making one object a child of another they become attached together.

The child is transformed in the same way as the parent.

By transformed I mean the way it is scaled, rotated or positioned.

This keeps them stuck together.

<script>window.aSlidesSlideData['slide-models-from-primitives'] = window.iframeSlide</script>

> ```html
	<a-box position="0 2 0" color="red">
>
		<!-- This blue box is a child of the red box -->
		<a-box position = "0.5 0.5 0.5" color="blue"></a-box>
>
		<!-- Spin the red box -->
		<a-animation repeat="indefinite" attribute="rotation" easing="linear" to="0 360 0" dur="2000"></a-animation>
	</a-box>
```
> <iframe src="two-boxes.html" seamless="seamless"></iframe>

# Scene Graphs

This behaviour is known as a scene graphs

It creates a heirarchy of items in the scene. So you can reuse models and attach them to other objects.

E.g. A model bus only needs one chair which can then be reused and attatched to the bus again and again.

This is good because each unique model is expensive but reusing it is cheap.

The example behind me is just a more elaborate version of the last slide.

* The eyes are children of the head
* Which is a child of the body
* Which is a child of the robot

It is being transformed elaborately

* The robot is being shrunk and grown
* the head is being rotated
* Through all this the eyes stay in place

<script>window.aSlidesSlideData['slide-scene-graphs'] = window.iframeSlide</script>

> <iframe src="scene-graph.html" seamless="seamless"></iframe>
>
> ## {{ site.url }}/scene-graph.html

# Third Party components

At this point you are ready to put together some simple scenes and animations.

A-Frame provides lots of components

Which is nice but they probably don't do every thing you want.

There are lots of components built by third parties a prominent library is A-Frame extras

> ## A-Frame extras provides
>
> * Various ways to get user input
> * Dynamic Physics
> * Some extra primitives such as a grid plane
> * Dynamic Shadows
>
> ## https://github.com/donmccurdy/aframe-extras

# Making new components

If you do not find a component which does what you want.

You can make your own components as well.

There is a lot to take in when extending A-Frame for the first time.

I was totally lost.

I reached out to A-Frame community by joining the A-Frame slack channel.

They are really friendly and very helpful.

I asked where to begin and some of the best advice I recieved was to create your own component.

This seemed daunting at first but once I got stuck in and asked for some help it began to make sense.

This really allowed me to get to grips with how A-Frame works.


> ![https://aframe.io/community/](images/aframecommunity.png)
>
> ## https://aframe.io/community/


# What can Components do?

The most fundamental element in a-frame is the `<a-entity>`

An `<a-entity>` is an empty THREE.js group with no geometry or material.

Components are the discreet bits of logic which power A-Frame.

They provide the interface between the mark up (HTML) and the 3D rendering engine THREE.js

They are entity agnostic.

They do not care what they are attatched to.

For example the position component just sets the objects position in 3D space.

The rotation component rotates the entity by an angle in degrees.

More complex components such as geometry or material have properties defined like the `style` attribute;

<script id="what-can-components-do">window.setDynamicSlide(window.elByEl())</script>

> <code><span style="background: yellow;">&lt;a-entity&gt;&lt;/a-entity&gt;</span></code>
>
> <code>&lt;a-entity <span style="background: yellow;">position="0 1 0"</span>&gt;&lt;/a-entity&gt;</code>
>
> <code>&lt;a-entity position="0 1 0" <span style="background: yellow;">rotation="0 90 0"</span>&gt;&lt;/a-entity&gt;</code>
>
> <code>&lt;a-entity position="0 1 0" rotation="0 90 0" <span style="background: yellow;">geometry="primitive: box; width: 3; height: 2; depth: 2;"</span>&gt;&lt;/a-entity&gt;</code>
>
> <code>&lt;a-entity position="0 1 0" rotation="0 90 0" geometry="primitive: box; width: 3; height: 2; depth: 2;" <span style="background: yellow;">material="color: red;"</span>&gt;&lt;/a-entity&gt;</code>

# Reusing Components

They are usually totally agnostic to what they get attatched to.

For example we can take the 'wasd-controls' off the camera and attach them to our racing ship from earlier.

> ```html
<a-scene>
>
	<!-- controls  disabled -->
	<a-camera wasd-controls="enabled: false;"></a-camera>
>
>
	<!-- controls  enabled -->
	<a-entity wasd-controls="enabled: true;">
		<a-obj-model src="#Feisar-ship-obj" mtl="#Feisar-ship-mtl" id="ship"></a-obj-model>
	</a-entity>
>
</a-scene>
```

# Component move demo

As you can see now the camera does not move but the ship does

I'm beginning to think we could do something cool with this...

<script>window.aSlidesSlideData['slide-component-move-demo'] = window.iframeSlide</script>

> <iframe src="moving-the-wasd-controller.html" seamless="seamless"></iframe>
>
> ## {{ site.url }}/moving-the-wasd-controller.html

# Making a new component

A component has two parts a schema and set of call back functions.

The schema defines what data gets passed into the component from the attributes defined in the markup.

It then uses this information to

<script id="defining-a-component">window.setDynamicSlide(window.elByEl())</script>

>
> ```javascript
	// Simple one property schema
	// <a-entity component1="1 2 3"></a-entity>
	registerComponent('component1', {
		schema: {type: 'vec3'}
	});
>
	// Multi-property property schema
	// <a-entity component2="oranges: blah; someEl: #thatEl;"></a-entity>
	registerComponent('component2', {
		schema: {
			apples: {default: 2}, // implied to be a number
			oranges: {default: ''} // implied to be a string
			someEl: {type: selector}
		}
	});
>
	// Built in types:
	// array, boolean, color, int, number, selector, selectorAll, src, string, time, vec2, vec3, vec4
```
>
>
>
> ```javascript
>
	registerComponent('component2', {
		schema: {},
		init: function () {
			// Called only once when component initialised
		},
		update: function () {
			// Called after init and whenever attributes on the element are changed
		},
		tick: function () {
			// Called once per frame
		},
		remove: function () {
			// Use this to undo the effects of the component
			// Called when the component is removed
			// also when the attatched el is deleted.
		}
	})
```
>
>
> ```javascript
// Copy-pasted from the A-Frame source code.
>
registerComponent('position', {
  schema: {type: 'vec3'},
>
  update: function () {
    var object3D = this.el.object3D;
    var data = this.data;
    object3D.position.set(data.x, data.y, data.z);
  }
});
```

# Primitives

Primitives are just `a-entity`s with a bunch of preset components.

For example this is a very large plane which looks like an ocean.

It uses 3 components, `geometry`, `rotation` and `material`

The mappings section allow  easy ways to control some comoonents.

> ```javascript
// <a-ocean-plane width="100" height="100"></a-ocean-plane>
AFRAME.registerPrimitive('a-ocean-plane', {
	defaultComponents: {
		geometry: {
			primitive: 'plane',
			height: 10000,
			width: 10000
		},
		rotation: '-90 0 0',
		material: {
			shader: 'standard',
			color: '#8ab39f',
			metalness: 1,
			roughness: 0.2,
			opacity: 0.8
		}
	},
	mappings: {
		width: 'geometry.width',
		height: 'geometry.depth',
		color: 'material.color',
		opacity: 'material.opacity'
	}
});
```

# Workshop

So I am going to step aside for a bit.

To leave you to play with some demos and get some inspiration.

And ask me some questions.

Then in about 10 minutes I will then run through some of my favourite examples of UI interactions.


> ## Give it ago: http://o.ada.is/aframe-jsbin
>
> ## Components
>
> * geometry - add 3d shapes
> * material - sets the material to a geometry
> * rotation, position, scale
> * wasd-controls
> * sound
> * cursor
>
> ## Primitives
>
> * a-animation

# Other projects and User Interfaces

The really interesting state we are in now is that we are in a green field of interface design.

Nothing is set in stone.

Interactions tend to fall somewhere on this graph.

Building interactions in the top right is where most people jump to.

Although familiar and quick to be grasped they limit what could be done to what is already doable.

Interactions in the top left square can be quirky and fun because they subvert are expectations of reality.

The bottom right tend to be more minimalist, they make sense when that interaction is not something which needs to be special. This kind of interface is probably familiar to those used to playing first person roleplaying games.

Click on this, click on that. Simple potentially restrictive.

The bottom left square is where the VR magic will happen. Unconstrained by both reality and pre-existing assumptions and expectations a new User interface language will be formed.

Thinking of icons we are familiar with

* E.g. Hamburger icon would sit in the bottom left
* Save icon is top right if you are born in the 80s
* Or bottom right if you were born in the 90s 00s

A new generation has grown up where every screen is a touch screen

Who are familiar with the visual language of those screens.

We designing user interfaces for the VR generation.

VR gives us new tools for design

A sense of scale, we can build interfaces at a familiar scale to the user or with no extra work make them tiny or huge.

Things can be relateable or familiar but behave by different rules.

VR can be at once both familiar and Surreal,

> ![Diagram of interaactions](images/vr-interactions.svg)

People get used to new interactions really quickly.

Minesweeper was invented to teach people to use right click.

As we settle on new design languages for VR people are going to need a similar step up

> ![Minesweeper](images/mines.gif)

# My Faves

Over the past year I have seen some really interesting user interface elements in VR.

These are a few of my faves. The a forementioned exit burrito.

* Juicy Sliders
* Exit Burrito
* Going through links by putting something on your head

<script>window.aSlidesSlideData['slide-my-faves'] = window.contentSlide([{
	video: 'images/juicy-sliders.mp4',
	caption: '## https://twitter.com/Cabbibo/status/758792984095621120'
},{
	video: 'images/exit-burrito.mp4',
	caption: '## Owlchemy Labs’ Job Simulator 2050'
},{
	video: 'images/a-frame-link-traversal.mp4',
	caption: '## Link traversal in the next release of A-Frame'
}
])</script>

> <video src="images/juicy-sliders.mp4" muted preload autoplay autostart loop></video>

# A-Frame Examples

That last one I found on the A-Frame blog.

Each week A-Frame do a blog post highlighting development of the platform and interesting projects from the community.

Check it out really interesting and exciting to see what is upcoming in A-Frame.

Also the wide variety of demos and projects are great if you are stumped for ideas

> ![a-frame-blog](images/a-frame-blog.png)
>
> ## https://aframe.io/blog/

# Google's Daydream Experiments

Google are regularly giving feedback from their experiments into VR interaction

<script>window.aSlidesSlideData['slide-google-s-daydream-experiments'] = window.playVideo</script>

> # Google's Daydream Experiments
>
> <video src="images/simpleavatars.mp4" muted autoplay autostart loop preload></video>
>
> ## http://uploadvr.com/google-shares-lessons-60-vr-experiments/

# Google VR Videos

They have lots of examples on their website

This recent one is interesting, an experiment in diffusing situations where one player might get irate by reducing their agency if not playing nice.

<script>window.aSlidesSlideData['slide-google-vr-videos'] = window.iframeSlide</script>

> <iframe width="560" height="315" src="https://www.youtube.com/embed/BoOVVx9CnL8" frameborder="0" allowfullscreen></iframe>
>
> ## https://www.youtube.com/channel/UCkUZagbGbewp3bZQLXGzkmA

# Some rules for what you should not do

* Don't teleport the user it will just confuse them.
* Don't accelerate or rotate the camera unless in well expected smooth fashion, you will make them seasick.
* Don't do something which runs laggy, it may make them ill.

# Stuff you should

* Do have interactive elements give a wiggle when the user glances at it.
* Do make any text large, thick and clear
* Do have fun making something

Some guides to building good expereinces:

My slides are online if you want to find this later

> ### https://developer.leapmotion.com/assets/ Leap%20Motion%20VR%20Best%20Practices%20Guidelines.pdf
>
> ## https://developer.oculus.com/documentation/intro-vr/latest/concepts/bp_intro/

<script>
	var iframes = Array.from(document.querySelectorAll('iframe'));
	var blank = 'about:blank';
	iframes.forEach(function (iframe) {
		var button = document.createElement('button');
		var src = iframe.src;
		iframe.src = blank;
		iframe.dataset.src = src;
		button.addEventListener('click', function () {
			iframe.src = iframe.src === blank ? src : blank;
			if (iframe.src === blank) {
				button.classList.add('blank');
				button.textContent = "Load iFrame";
			} else {
				button.classList.remove('blank');
				button.textContent = "Unload iFrame";
			}
		});
		button.classList.add('iframe-button');
		button.classList.add('blank');
		button.textContent = "Load iFrame";
		iframe.after(button);
	});

	var blockquote = Array.from(document.querySelectorAll('blockquote'));
	var newSpans = [];
	blockquote.forEach(function (el) {
		var span = document.createElement('span');
		newSpans.push(span);
		window.removeHashChangeEventListener();
		span.textContent = ' View Slide';
		span.addEventListener('click', function onclick() {
			newSpans.forEach(function (s) {
				s.removeEventListener('click', onclick);
				s.remove();
			});
			init().then(function () {
				document.querySelector('.a-slides_slide-container').dispatchEvent(new CustomEvent('a-slides_goto-slide', {detail: {slide: el.parentNode}}));
			});
		});
		span.setAttribute('style', 'position: absolute; bottom: 0; right: 0; background: white; border-radius: 0.5em 0 0 0; border: 1px solid grey; border-width: 1px 0 0 1px; color: darkcyan; padding: 0.25em; cursor: pointer;');
		el.appendChild(span);
	});
</script>