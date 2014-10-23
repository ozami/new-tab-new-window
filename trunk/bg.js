chrome.tabs.onCreated.addListener(function(tab){
    if (tab.url == "chrome://newtab/"){
        return;
    }
    if (tab.url == "about:blank"){
        return;
    }
    chrome.tabs.query({windowId: tab.windowId}, function(tabs){
        if (tabs.length <= 1){
            return;
        }
        chrome.windows.get(tab.windowId, function(curWindow){
            getOption("newWindowsPosition", function(newWindowsPosition){
                var createData = {
                    tabId: tab.id,
                    incognito: tab.incognito
                };
                if (newWindowsPosition){
                    createData.top = Math.max(0, curWindow.top);
                    createData.left = Math.max(0, curWindow.left);
                }
                chrome.windows.create(createData, function(newWindow){
                    chrome.windows.update(newWindow.id, {
                        state: curWindow.state
                    });
                });
            });
        });
    });
});

chrome.runtime.onInstalled.addListener(function(){
    if (localStorage.newWindowsPosition === undefined){
        return;
    }
    setOption("newWindowsPosition", localStorage.newWindowsPosition, function(){
        delete localStorage.newWindowsPosition;
    });
});
