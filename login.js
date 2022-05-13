let togglebutton = document.getElementById("ToggleAuto");
let savebutton = document.getElementById("upload");


window.onload = function() {
    chrome.storage.sync.get(['toggle'], function(result){
        if(result.toggle){
            togglebutton.innerText = "ON";
        }else{
            togglebutton.innerText = "OFF";
        }
    });
}

savebutton.addEventListener("click", async () => {
    let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
    let usr = document.getElementById("username").value;
    let psw = document.getElementById("password").value;

    chrome.scripting.executeScript({
      target: { tabId: tab.id },
      func: saveCreds,
      args: [usr, psw],
    });
});

togglebutton.addEventListener("click", async () => {
    let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
    let results = await chrome.scripting.executeScript({
      target: { tabId: tab.id, allFrames: true},
      func: changeToggleValue,
      args: [togglebutton.innerText]
    });
});

chrome.storage.onChanged.addListener(function (changes, namespace) {
    for (let [key, { oldValue, newValue }] of Object.entries(changes)) {
      /* console.log(
        `Storage key "${key}" in namespace "${namespace}" changed.`,
        `Old value was "${oldValue}", new value is "${newValue}".`
      ); */
      if(key == "toggle"){
          if(newValue){
            togglebutton.innerText = "ON";
          }else{
            togglebutton.innerText = "OFF";
          }
      }
    }
  });

function changeToggleValue(TEXT) {
    let test = chrome.storage.sync.get(['toggle'], function(result){
        chrome.storage.sync.set({'toggle': !result.toggle}, function(){});
    });
    /*
    var storageCache = {};
    chrome.storage.sync.get(null, function(data) {
    storageCache = data;
    init(); // All your code is contained here, or executes later that this
        });
    */
}

function saveCreds(usr, psw) {
    chrome.storage.sync.set({'username': usr}, function(){
        /* console.log(usr);
        console.log(psw); */
        chrome.storage.sync.set({'password': psw}, function(){});
        alert("Credentials Saved!");
    });
}