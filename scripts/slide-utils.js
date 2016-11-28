
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
	var setUpFirstEl;

	function init() {
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
	if (data) {
		switch(Object.keys(data)[0]) {
			case 'video':
				el.innerHTML = `<video src="${data.video}" preload autoplay autostart loop style="object-fit: contain; flex: 1 0; ${data.style}" />`;
				el.querySelector('video').currentTime=0;
				el.querySelector('video').play();
				break;
			case 'image':
				el.innerHTML = `<image src="${data.image}" style="${data.style}" />`;
				break;
			case 'markdown':
				el.addMarkdown(data.markdown);
				break;
			case 'html':
				el.innerHTML = data.html;
				break;
			case 'iframe':
				el.innerHTML = `<iframe src="${data.iframe}" frameborder="none" style="flex: 1 0; ${data.style}" /></iframe>`;
				break;
		}
		if (data.caption) {
			el.addMarkdown(data.caption);
		}
		if (data.url  || data.iframe) {
			el.addHTML(`<div class="slide-url">${data.url || data.iframe || ''}</div>`);
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