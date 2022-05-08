let togglevalue;
chrome.storage.sync.get(['toggle'], function(result, togglevalue){
    togglevalue = result.toggle;
    if(togglevalue && document.getElementById('username')){
        chrome.storage.sync.get(['username'], function(result){
            document.getElementById('username').value = result.username;
            chrome.storage.sync.get(['password'], function(result){
                document.getElementById('password').value = result.password;
                document.getElementsByName('submit-istid')[0].click();
            });
        });
    }
});

