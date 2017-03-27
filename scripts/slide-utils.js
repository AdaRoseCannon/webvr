/* eslint-env es6 */

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

window.setDynamicSlide = function (o) {
	window.aSlidesSlideData[window.getSlideName(document.currentScript)] = o;
}

window.applyCSS = function (node, props) {
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

window.videoSlide = window.playVideo;

window.elByEl = function (selector) {

	var children;
	var clone;
	var preserve = [];

	function replaceWithEl(el, target) {
		target.innerHTML = '';
		preserve.forEach(function (el) {
			target.appendChild(el);
		});
		target.appendChild(el);
	}

	var out = {};
	var setUpFirstEl;

	function init() {
		var self = this;
		preserve = Array.from(selector ? (this.querySelectorAll(selector) || []) : []);
		preserve.forEach(function (el) {
			self.removeChild(el);
		});

		children = Array.from(this.children);
		var target = this;
		clone = children.map(function (el) {
			return function () { replaceWithEl(el, this) };
		}.bind(this));
		if (!clone.length) throw Error('Empty elByEl target');
		setUpFirstEl = clone.shift();
		clone.unshift(function () {});
		clone.push(function () {});
		out.action = window.FakeGenerator(clone);
	}

	out.teardown = out.setup = function () {
		if (!children) init.bind(this)();
		this.innerHTML = '';
		setUpFirstEl.bind(this)();
	};

	return out;
};

window.getSlideName = function (el) {
	var name;
	if (el.matches('script[id]')) {
		name = genId(el.id);
	} else {
		var foundBlockquote = false;
		var hs = prevAll(el).reverse().filter(function (el) {
			if (foundBlockquote || !!el.tagName.match(/blockquote/i)) {
				foundBlockquote = true;
				return false;
			}
			return !!el.tagName.match(/h[0-6]/i);
		});
		if (!hs.length) throw 'No h to find';
		var h = hs[hs.length - 1];
		name =  genId(h.textContent);
	}
	return 'slide-' + name;
}

function renderContent(el, data) {
	data.style = data.style || '';
	if (data) {
		switch(Object.keys(data)[0]) {
			case 'video':
				el.innerHTML = `<video src="${data.video}" preload autoplay autostart ${data.loop ? 'loop' : ''} style="object-fit: contain; flex: 1 0; ${data.style}" />`;
				el.querySelector('video').currentTime= data.start || 0;
				el.querySelector('video').play();
				break;
			case 'image':
				el.innerHTML = `<image src="${data.image}" style="${data.style}" />`;
				break;
			case 'markdown':
				const preWhite = data.markdown.match(/\n?([ \t]*)[^\w]/)[1];
				el.addMarkdown(data.markdown.replace(new RegExp('\\n' + preWhite, 'gi'), '\n'));
				break;
			case 'html':
				el.innerHTML = data.html;
				break;
			case 'iframe':
				el.innerHTML = `<iframe src="${data.iframe}" frameborder="none" style="flex: 1 0; ${data.style}" /></iframe>`;
				break;
		}
		if (data.caption) {
			var caption = document.createElement('h2');
			caption.textContent = data.caption;
			el.appendChild(caption);
			caption.classList.add('caption');
			if (data.captionStyle) caption.setAttribute('style', data.captionStyle);
		}
		if (data.url  || data.iframe) {
			el.addHTML(`<div class="slide-url">${data.url || data.iframe || ''}</div>`);
		}
		if (data.callback) {
			data.callback.bind(el)(data);
		}
	}
}

// Uses ES2015 Generators
window.contentSlide = function (slides) {
	var oldContent;

	return {
		setup: function setup() {
			oldContent = Array.from(this.children);
			this.innerHTML = '';
			renderContent(this, slides[0]);
			if (slides[0].video) {
				this.querySelector('video').pause();
			}
		},
		action: function* () {

			const t = slides.slice();

			if (t.length === 0) {
				yield;
				return;
			}

			while(t.length) {
				this.innerHTML = '';
				renderContent(this, t.shift());
				yield;
			}
		},
		teardown() {
			if (oldContent) {
				this.innerHTML = '';
				oldContent.forEach(c => this.appendChild(c));
			}
		}
	};
};