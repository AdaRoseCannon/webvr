/* global toolbox, importScripts, self */
/* jshint browser:true */
'use strict';

importScripts('scripts/sw-toolbox.js');

// Send a signal to all connected windows.
// Used for service worker bridge in a-slides
function reply(data) {
	return self.clients.matchAll({type: 'window'})
	.then(function (windows) {
		windows.forEach(function (w) {
			w.postMessage(data);
		});
	});
}

// Echo messages back to every window
self.addEventListener('message', function(event) {
	reply(event.data);
});

// Recieve messages from the client and reply back onthe same port
self.addEventListener('fetch', function (event) {
	const request = event.request;
	const handler = (request.url.match(/^http:\/\/localhost/) && location.protocol === 'http:' || location.hostname === 'localhost') ? toolbox.networkFirst : toolbox.fastest;
	if (
		!(
			request.url.match(/(\.mp4|\.webm|\.avi|\.wmv|\.m4v)$/i) ||
			request.url.match(/data:/i)
		)
	) {
		event.respondWith(handler(request, [], {
			networkTimeoutSeconds: 3
		}));
	}
});
