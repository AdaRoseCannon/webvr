'use strict';
/* global ASlides, twemoji*/

/**
 * Turns a normal markdown blog post into a slide deck!!
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

function genId(name) {
	return (name + '').trim().replace(/[^A-Za-z0-9]/ig, '-').toLowerCase();
}

function init() {
	return Promise.all([
			addScript('https://cdn.rawgit.com/AdaRoseEdwards/a-slides/v1.4.0/build/a-slides.js').promise
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
				ASlides.plugins.bridgeServiceWorker
			]
		});

		if (location.search === '?presentation') {
			slideContainer.classList.add('presentation');
		}

		if (location.search === '?notes') {
			slideContainer.classList.add('hide-presentation');
		}

		var clock = document.querySelector('#a-frame-clock');
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

(function () {
	function locationHashChanged() {
		if (location.hash === '#aslides') {
			window.removeEventListener('hashchange', locationHashChanged);
			window.location.hash = oldHash;
			init().then(function(slideContainer) {
				fire(slideContainer, 'a-slides_goto-slide', {slide: oldHash ? slideContainer.querySelector('[data-slide-id="' + oldHash.substr(1,Infinity) + '"]') : 0});
			});
		}
	}

	var oldHash = location.hash || false;

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
}());


window.aSlidesSlideData = {};

window.setDynamicSlide = function (o) {
	window.aSlidesSlideData[window.getSlideName(document.currentScript)] = o;
}

/**
 * Define some useful presetup generators
 */
window.iframeSlide = {
	setup: function () {
		var iframe = this.querySelector('iframe');
		iframe.src = iframe.dataset.src;
	},
	action: window.FakeGenerator([ function() {} ]),
	teardown: function () { this.querySelector('iframe').src = 'about:blank'; }
};

window.playVideo = {
	setup: function () {
		this.querySelector('video').currentTime=0;
		this.querySelector('video').pause();
	},
	action: window.FakeGenerator([ function() {
		this.querySelector('video').play();
	}]),
	teardown: function () {
		this.querySelector('video').pause();
	}
}

window.elByEl = function () {

	var children;
	var clone;

	function replaceWithEl(el, target) {
		target.innerHTML = '';
		target.appendChild(el);
	}

	var out = {};

	function init() {
		if (!children) {
			children = Array.from(this.children);
			var target = this;
			clone = children.map(function (el) {
				return function () { replaceWithEl(el, this) };
			}.bind(this));
			clone.push(function () {});
			out.action = window.FakeGenerator(clone);
		}
	}

	out.setup = function () {
		init.bind(this)();
		this.innerHTML = '';
	};

	out.teardown = function () {
		init.bind(this)();
		this.innerHTML = '';
	}

	return out;
};

window.getSlideName = function (el) {
	var name;
	if (el.matches('script[id]')) {
		name = genId(el.id);
	} else {
		var hs = el.prevAll().filter(function (el) {
			return el.tagName.match(/h[0-6]/i);
		});
		if (!hs.length) throw 'No h to find';
		var h = hs[hs.length - 1];
		name =  genId(h.textContent);
	}
	return 'slide-' + name;
}

window.contentSlide = function (slides) {
	var oldContent;

	return {
		setup: function setup() {
			oldContent = Array.from(this.children);
		},
		action: function* () {

			const t = slides.slice();

			if (t.length === 0) {
				yield;
				return;
			}

			while(t.length) {

				this.empty();
				let i = t.shift();
				if (i) {
					switch(Object.keys(i)[0]) {
						case 'video':
							this.innerHTML = `<video src="${i.video}" preload autoplay autostart loop style="object-fit: contain; flex: 1 0;" />`;
							this.querySelector('video').currentTime=0;
							this.querySelector('video').play();
							break;
						case 'image':
							this.innerHTML = `<image src="${i.image}" />`;
							break;
						case 'markdown':
							this.addMarkdown(i.markdown);
							break;
						case 'html':
							this.innerHTML = i.html;
							break;
						case 'iframe':
							this.innerHTML = `<iframe src="${i.iframe}" frameborder="none" style="flex: 1 0;" /></iframe>`;
							break;
					}
					if (i.caption) {
						this.addMarkdown(i.caption);
					}
					if (i.url  || i.iframe) {
						this.addHTML(`<div class="slide-url">${i.url || i.iframe || ''}</div>`);
					}
				}
				yield;
			}
		},
		teardown() {
			if (oldContent) {
				this.empty();
				oldContent.forEach(c => this.appendChild(c));
			}
		}
	};
};
