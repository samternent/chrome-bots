chrome.browserAction.onClicked.addListener(function(tab) {
    chrome.tabs.executeScript(null, {file: "content.js"});
    chrome.tabs.insertCSS(null, {file: "style.css"});
});