'use strict';
/* global ASlides */

/**
 * Turns a normal markdown blog post into a slide deck!!
 * amazing right!!
 */

'use strict';
var preSetupFns = [];
window.aSlidesSlideData = {};

// Load the service worker which does not have push notification support.
if ('serviceWorker' in navigator) {
	navigator.serviceWorker.register('sw.js', { scope: './' })
	.then(function(reg) {
		console.log('sw registered', reg);
	}).catch(function(error) {
		console.log('sw registration failed with ' + error);
	});
}

function addStyle(url){
	var styles = document.createElement('link');
	styles.rel = 'stylesheet';
	styles.type = 'text/css';
	styles.media = 'screen';
	styles.href = url;
	document.getElementsByTagName('head')[0].appendChild(styles);
}

function fullScreenPlugin(o) {
	var element = o.slideContainer;
	ASlides.plugins.slideController.makeAndBindButton('Fullscreen', function () {
		if (element.requestFullscreen) { // W3C API
			element.requestFullscreen();
		} else if (element.mozRequestFullScreen) { // Mozilla current API
			element.mozRequestFullScreen();
		} else if (element.webkitRequestFullScreen) { // Webkit current API
			element.webkitRequestFullScreen();
		}
	});
}

function addScript (url) {
	var p = new Promise(function (resolve, reject) {
		var script = document.createElement('script');
		script.setAttribute('src', url);
		document.head.appendChild(script);
		script.onload = resolve;
		script.onerror = reject;
	});
	function promiseScript () {
		return p;
	};
	promiseScript.promise = p;
	return promiseScript;
}
window._addScript = addScript;

function prevAll(el) {
	var nodes = Array.from(el.parentNode.children);
	var pos = nodes.indexOf(el);
	return nodes.slice(0, pos);
}

function fire(node, name, detail) {
	node.dispatchEvent(new CustomEvent(name, { detail: detail || {}}));
	return node;
}

function genId(name) {
	return (name + '').trim().replace(/[^A-Za-z0-9]/ig, '-').toLowerCase();
}

window._setNextSlide = function _setNextSlide(setUpObject) {
	var el = document.currentScript;
	preSetupFns.push(function () {
		el.nextElementSibling._aSlideObject = setUpObject;
	});
}

window._executeOnNextEl = function _executeOnNextEl(fn) {
	var el = document.currentScript;
	preSetupFns.push(function () {
		fn.bind(el.nextElementSibling)();
	});
}

window._cssNextEl = function _cssNextEl(o) {
	var el = document.currentScript;
	preSetupFns.push(function () {
		_applyCSS(el.nextElementSibling, o);
	});
}

window._applyCSS = function _applyCSS(node, props) {
	function units(prop, i) {
		if (typeof i === 'number') {
			if (prop.match(/width|height|top|left|right|bottom/)) {
				return i + 'px';
			}
		}
		return i;
	}
	for (var n in props) {
		if (props.hasOwnProperty(n)) {
			node.style[n] = units(n, props[n]);
		}
	}
	return node;
};

window.setDynamicSlide = window._setNextSlide;

function init() {
	return Promise.all([
			addScript('./scripts/third-party/a-slides.js').promise
	])
	.then(function () {

		var noSlides = document.querySelectorAll('body > blockquote').length;
		var slideContainer = document.createElement('div');
		slideContainer.className = 'a-slides_slide-container';
		var slide;
		var i=0;
		var name;
		var notes;
		var newSlide;
		var notesWrapper;
		var progressBar;
		while (slide = document.querySelector('body > blockquote')) {
			i++;
			name = '';
			notes = prevAll(slide);
			name = notes.find(function (el) { return el.matches('script[id]') });
			if (name) {
				name = genId(name.id);
			}
			notes = notes.filter(function (a) {
				if (a.tagName.match(/^script/i)) {
					a.remove();
					return false;
				} else {
					return true;
				}
			});
			newSlide = document.createElement('div');
			newSlide.className = ('a-slides_slide');
			notesWrapper = document.createElement('div');
			notesWrapper.className = ('a-slides_notes');
			notesWrapper.tabIndex = -1; // make not tab-to-able to but receives focus when slides are changing.
			progressBar = document.createElement('div');
			progressBar.className = ('a-slides_progress');

			progressBar.style.width = 100*i/noSlides + '%';
			slide.classList.add('a-slides_slide-content');
			if (!name && notes[0] && notes[0].tagName.match(/h[0-6]/i)) {
				name = genId(notes[0].textContent);
				name = name + (slideContainer.querySelectorAll('[data-slide-id="slide-' + name + '"]').length || '');
			}
			var finalName = 'slide-' + (name || i);
			newSlide.dataset.slideId = finalName;
			if (slide._aSlideObject) {
				window.aSlidesSlideData[finalName] = slide._aSlideObject;
			}
			newSlide.appendChild(slide);
			newSlide.appendChild(notesWrapper);
			notes.forEach(function (note) { notesWrapper.appendChild(note) });
			slideContainer.appendChild(newSlide);
			newSlide.appendChild(progressBar);
		}
		document.body.before(slideContainer);

		document.body.classList.remove('post');
		Array.from(document.querySelectorAll('.slide-view-button')).forEach(function (el) {
			el.parentNode.removeChild(el);
		});
	})
	.then(function () {

		var slideData = window.aSlidesSlideData || {};
		var slideContainer = document.querySelector('.a-slides_slide-container');

		new ASlides(slideData, {
			slideContainer: slideContainer,
			plugins: [
				ASlides.plugins.markdownTransform, // needs to be run first
				ASlides.plugins.slideController, // needs to be run before buttons are added to it.
				ASlides.plugins.deepLinking,
				ASlides.plugins.interactionKeyboard,
				ASlides.plugins.interactionTouch({ // has configuration
					use: ['swipe-back']
				}),
				ASlides.plugins.bridgeServiceWorker,
				fullScreenPlugin
			]
		});

		if (location.search === '?presentation') {
			slideContainer.classList.add('presentation');
		}

		if (location.search === '?notes') {
			slideContainer.classList.add('hide-presentation');
		}

		var clock = document.querySelector('#a-slides_clock');
		if (clock) {
			var clockLength = parseInt(Number(clock.textContent) * 60);
			var finishAt = Date.now() + clockLength * 1000;
			slideContainer.appendChild(clock);
			clock.className = 'a-slides_clock';
			setInterval(function () {
					clock.textContent = (new Date(Math.max(finishAt - Date.now(), 0)))
					.toLocaleTimeString(undefined, { timeZone: 'UTC' }).match(/^\d\d:(\d\d:\d\d)/)[1]
			}, 200);
			clock.addEventListener('click', function (e) {
				e.preventDefault();
				e.stopPropagation();
				finishAt = Date.now() + clockLength*1000;
			});
		}

		slideContainer.addEventListener('a-slides_slide-show', function () {
			var notes = slideContainer.querySelector('.a-slides_slide.active .a-slides_notes');
			if (notes) notes.focus();
		});

		return slideContainer;
	});
}

document.addEventListener("DOMContentLoaded", function (event) {

	function locationHashChanged() {
		if (location.hash === '#aslides') {
			window.removeEventListener('hashchange', locationHashChanged);
			window.location.hash = oldHash;
			init().then(function(slideContainer) {
				fire(slideContainer, 'a-slides_goto-slide', {slide: oldHash ? slideContainer.querySelector('[data-slide-id="' + oldHash.substr(1,Infinity) + '"]') : 0});
			});
		}

		window.removeHashChangeEventListener();
	}

	var oldHash = location.hash || false;

	preSetupFns.forEach(function (fn) {
		fn();
	});

	if (location.hash === '#aslides' || location.search.indexOf('aslides') !== -1) {
		init().then(function (slideContainer) {
			if (location.hash === '#aslides' || oldHash === false) {
				fire(slideContainer, 'a-slides_goto-slide', {slide: 0});
			} else {
				fire(slideContainer, 'a-slides_goto-slide', {slide: slideContainer.querySelector('[data-slide-id="' + oldHash.substr(1,Infinity) + '"]')});
			}
		});
	} else {
		window.addEventListener('hashchange', locationHashChanged);
	}

	window.removeHashChangeEventListener = function () {
		window.removeEventListener('hashchange', locationHashChanged);
	}
});
