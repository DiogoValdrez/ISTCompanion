let togglebutton = document.getElementById("ToggleAuto");
let savebutton = document.getElementById("upload");


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
    chrome.scripting.executeScript({
      target: { tabId: tab.id },
      func: changeToggleValue,
    });   
});


function changeToggleValue() {
    chrome.storage.sync.get(['toggle'], function(result){
        console.log('Value currently is ' + !result.toggle);
        /*console.log(window['togglebutton'])
        if(togglevalue){
            window['togglebutton'].innerText = "ON";
        }else{
            window['togglebutton'].innerText= "OFF";
        }*/
        chrome.storage.sync.set({'toggle': !result.toggle}, function(){});
    });
}

function saveCreds(usr, psw) {
    chrome.storage.sync.set({'username': usr}, function(){
        console.log(usr);
        console.log(psw);
        chrome.storage.sync.set({'password': psw}, function(){});
    });
}