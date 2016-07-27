'use strict';
/* global ASlides, twemoji*/

/**
 * Turns a normal mrkdown blog posti into a slide deck!!
 * amazing right!!
 */

function addStyle(url){
	var styles = document.createElement('link');
	styles.rel = 'stylesheet';
	styles.type = 'text/css';
	styles.media = 'screen';
	styles.href = url;
	document.getElementsByTagName('head')[0].appendChild(styles);
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

// Add a fake generator which accepts arrays of functions
// to interface with a-slides on platofrms which don't support
// generators
window.FakeGenerator = function FakeGenerator(arr) {
	return function () {
		var toRun = arr.slice();
		var done = false;
		var self = this;
		return {
			done: false,
			next: function (arg) {
				if (done || !toRun.length) return {
					value: undefined,
					done: true
				};
				if (toRun.length === 1) done = true;
				return {
					done: done,
					value: toRun.shift().bind(self)(arg)
				}
			}
		}
	}
}

// Fancy Emojis
addScript('https://twemoji.maxcdn.com/2/twemoji.min.js')().then(function () {
	twemoji.parse(document.body, {
		folder: 'svg',
		ext: '.svg'
	});
});

function prevAll(el) {
	var nodes = Array.from(el.parentNode.children);
	var pos = nodes.indexOf(el);
	return nodes.slice(0, pos);
}

function fire(node, name, detail) {
	node.dispatchEvent(new CustomEvent(name, { detail: detail || {}}));
	return node;
}

function init() {
	return Promise.all([
			addScript('https://cdn.rawgit.com/AdaRoseEdwards/a-slides/v1.2.8/build/a-slides.js').promise
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
			notes = prevAll(slide).filter(function (a) { return !a.tagName.match(/^script/i) });
			newSlide = document.createElement('div');
			newSlide.className = ('a-slides_slide');
			notesWrapper = document.createElement('div');
			notesWrapper.className = ('a-slides_notes');
			progressBar = document.createElement('div');
			progressBar.className = ('a-slides_progress');

			progressBar.style.width = 100*i/noSlides + '%';
			slide.classList.add('a-slides_slide-content');
			if (notes[0] && notes[0].tagName.match(/h[0-6]/i)) {
				name = notes[0].textContent.trim().replace(/[^A-Za-z0-9]/ig, '-').toLowerCase();
				name = name + (slideContainer.querySelectorAll('[data-slide-id="' + name + '"]').length || '');
			}
			newSlide.dataset.slideId = 'slide-' + (name || i);
			newSlide.appendChild(slide);
			newSlide.appendChild(notesWrapper);
			notes.forEach(function (note) { notesWrapper.appendChild(note) });
			slideContainer.appendChild(newSlide);
			newSlide.appendChild(progressBar);
		}
		document.body.before(slideContainer);

		document.body.classList.remove('post');
	})
	.then(function () {

		var slideData = window.aSlidesSlideData || {};
		var slideContainer = document.querySelector('.a-slides_slide-container');
		var finishAt = Date.now() + 900 * 1000;
		var clock = document.createElement('div');

		new ASlides(slideData, {
			slideContainer: slideContainer,
			plugins: [
				ASlides.prototype.plugins.markdownTransform, // needs to be run first
				ASlides.prototype.plugins.slideController, // needs to be run before buttons are added to it.
				ASlides.prototype.plugins.deepLinking,
				ASlides.prototype.plugins.interactionKeyboard,
				ASlides.prototype.plugins.interactionTouch({ // has configuration
					use: ['swipe-back']
				}),
				ASlides.prototype.plugins.bridgeServiceWorker
			]
		});

		if (location.search === '?presentation') {
			slideContainer.classList.add('presentation');
		}

		if (location.search === '?notes') {
			slideContainer.classList.add('hide-presentation');
		}

		slideContainer.appendChild(clock);
		clock.className = 'a-slides_clock';
		setInterval(function () {
				clock.textContent = (new Date(Math.max(finishAt - Date.now(), 0)))
				.toLocaleTimeString(undefined, { timeZone: 'UTC' }).match(/^\d\d:(\d\d:\d\d)/)[1]
		}, 200);

		clock.addEventListener('click', function (e) {
			e.preventDefault();
			finishAt = Date.now() + 900*1000;
		});
		return slideContainer;
	});
}

(function () {
	function locationHashChanged() {
		if (location.hash === '#aslides') {
			window.removeEventListener('hashchange', locationHashChanged);
			window.location.hash = oldHash;
			init().then(function(slideContainer) {
				fire(slideContainer, 'a-slides_goto-slide', {slide: oldHash ? document.querySelector('[data-slide-id="' + oldHash.substr(1,Infinity) + '"]') : 0});
			});
		}
	}

	var oldHash = location.hash || false;

	if (location.hash === '#aslides' || location.search.indexOf('aslides') !== -1) {
		init().then(function (slideContainer) {
			if (location.hash === '#aslides' || oldHash === false) {
				fire(slideContainer, 'a-slides_goto-slide', {slide: 0});
			} else {
				fire(slideContainer, 'a-slides_goto-slide', {slide: document.querySelector('[data-slide-id="' + oldHash.substr(1,Infinity) + '"]')});
			}
		});
	} else {
		window.addEventListener('hashchange', locationHashChanged);
	}
}());
