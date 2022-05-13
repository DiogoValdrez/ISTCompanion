let username = "";
let password = "";
let toggle = true;

chrome.runtime.onInstalled.addListener(() => {
    chrome.storage.sync.set({'username': username}, function(){});
    chrome.storage.sync.set({'password': password}, function(){});
    chrome.storage.sync.set({'toggle': toggle}, function(){});
    //console.log("I'm awake!");
});