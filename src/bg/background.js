// if you checked "fancy-settings" in extensionizr.com, uncomment this lines

// var settings = new Store("settings", {
//     "sample_setting": "This is how you use Store.js to remember values"
// });


//example of using a message handler from the inject scripts
chrome.extension.onMessage.addListener(
  function(request, sender, sendResponse) {

    if (request.actionType === 'play' && request.videoId) {
      playVideo(request.videoId);
    }

  	chrome.pageAction.show(sender.tab.id);
    sendResponse();
  });

function playVideo(videoId) {
  var xmlHttp = new XMLHttpRequest();
  xmlHttp.open("GET", 'http://localhost:3010/play/' + videoId, true); // true for asynchronous
  xmlHttp.send(null);
}
