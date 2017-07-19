chrome.extension.sendMessage({}, function(response) {
	var readyStateCheckInterval = setInterval(function() {
		if (document.readyState === "complete") {
			clearInterval(readyStateCheckInterval);

			// ----------------------------------------------------------
			// This part of the script triggers when page is done loading
			console.log("Hello. This message was sent from scripts/inject.js");
			// ----------------------------------------------------------

			const controls = document.querySelector('.ytp-left-controls')
			var button = document.createElement("button");
			button.innerHTML = '<button><img src="https://openclipart.org/download/219326/1432343177.svg"  height="36" width="36"/> </button>'

			button.addEventListener('click', () => {
				const videoId = getVideoId();
				sendMessage({
					actionType: 'play',
					videoId: videoId
				})

				if (isPlaying()) {
					stopPlaying();
				}
			})

			controls.prepend(button);
		}
	}, 10);
});


function getVideoId() {
	return document.querySelector('meta[itemprop="videoId"]').getAttribute('content');
}

function isPlaying() {
	const iconCode = document.querySelector('.ytp-play-button.ytp-button svg > path').getAttribute('d');
	return iconCode === "M 12,26 16,26 16,10 12,10 z M 21,26 25,26 25,10 21,10 z"
}

function stopPlaying() {
	document.querySelector('.ytp-play-button.ytp-button').click();
}

function sendMessage(data) {
	chrome.runtime.sendMessage(
		'hjkeicgipjldfhgheabagfankcheiplh',
		data,
	  function(response) {
			console.log(response);
	  }
	);
}

//
// let tag = document.createElement('h1');
// tag.innerHTML = "HAHAHAHAH"
// let body = document.querySelector('body > *:last-child');
// body.parentNode.insertBefore(tag, body);
//
// alert(111)
