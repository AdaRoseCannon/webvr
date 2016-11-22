/* global toolbox, importScripts, self */
/* eslint-env es6 */
/* jshint browser:true */
'use strict';

importScripts('scripts/sw-toolbox.js');

// Send a signal to all connected windows.
// Used for service worker bridge in a-slides
function reply(data) {
	return self.clients.matchAll({
			type: 'window'
		})
		.then(function(windows) {
			windows.forEach(function(w) {
				w.postMessage(data);
			});
		});
}

// Echo messages back to every window
self.addEventListener('message', function(event) {
	reply(event.data);
});

// Recieve messages from the client and reply back onthe same port
self.addEventListener('fetch', function(event) {
	const request = event.request;

	if (request.url.match(/(\.mp4|\.webm|\.avi|\.wmv|\.m4v)$/i)) {
		return handleVideo(event, true);
	}

	if (!(
			request.url.match(/data:/i)
		)) {
		if (request.url.match(/^https:\/\/twemoji.maxcdn.com/gi)) {
			return event.respondWith(toolbox.cacheFirst(request, [], {}));
		}
		event.respondWith(toolbox.networkFirst(request, [], {
			networkTimeoutSeconds: 3
		}));
	}
});


// via https://github.com/jakearchibald/range-request-test
function createRangedResponse(request, response) {
	return Promise.resolve().then(() => {
		if (!response) return response;

		const rangeHeader = request.headers.get('Range').trim().toLowerCase();
		// not a range request
		if (!rangeHeader) {
			return response;
		}

		// already a range response, or an error, or an opaque response
		// TODO: if response is 404 should this turn into 416 range not satisfiable?
		if (response.status != 200) {
			console.log('Abandoning ranged response: not status 200, is', response.status);
			return response;
		}

		return response.arrayBuffer().then(buffer => {
			if (!rangeHeader.startsWith('bytes=')) return new Response("Invalid range unit", {
				status: 400
			});
			let start, end;

			const rangeParts = /(\d*)-(\d*)/.exec(rangeHeader);

			if (!rangeParts[1] && !rangeParts[2]) return new Response("Invalid range header", {
				status: 400
			});

			if (rangeParts[1] === '') {
				start = buffer.byteLength - Number(rangeParts[2]);
				end = buffer.byteLength;
			} else if (rangeParts[2] === '') {
				start = Number(rangeParts[1]);
				end = buffer.byteLength;
			} else {
				start = Number(rangeParts[1]);
				end = Number(rangeParts[2]) + 1; // range values are inclusive
			}

			if (end > buffer.byteLength || start < 0) return new Response("Range Not Satisfiable", {
				status: 416
			});

			const slicedBuffer = buffer.slice(start, end);
			const slicedResponse = new Response(slicedBuffer, {
				status: 206,
				headers: response.headers
			});

			console.log(`Created synthetic ranged response from ${start}-${end}`);

			slicedResponse.headers.set('Content-Length', slicedBuffer.byteLength);
			slicedResponse.headers.set('Content-Range', `bytes ${start}-${end - 1}/${buffer.byteLength}`);
			return slicedResponse;
		});
	});
}

function handleVideo(event, force) {
	const url = new URL(event.request.url);

	const swType = force || url.searchParams.get('sw') || 'no-intercept';
	const polyfilRange = force || url.searchParams.get('poly-range') === "1";

	console.log("SW Type", swType);

	if (swType == 'no-intercept') return;

	event.respondWith(
		fetch(event.request)
			.then(response => {
				if (!polyfilRange) return response;
				return createRangedResponse(event.request, response);
			})
			.then(response => {
				console.log(event.request, response);
				return response;
			})
	);
}