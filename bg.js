chrome.tabs.onCreated.addListener(function(tab){
    if (tab.index == 0){
        return;
    }
    chrome.windows.get(tab.windowId, function(curWindow){
        getOption("newWindowsPosition", function(newWindowsPosition){
            var createData = {
                tabId: tab.id,
                incognito: tab.incognito,
                state: curWindow.state
            };
            // if the default window position was used, simply create
            //  a new window and done.
            if (!newWindowsPosition){
                chrome.windows.create(createData);
                return;
            }
            // new window need to be placed to where the current window is.
            chrome.runtime.getPlatformInfo(function(platformInfo){
                // window states that cannot be
                var nonPositionalStates = {
                    minimized: true,
                    maximized: true,
                    fullscreen: true
                };
                // ignores maximized state on OS X
                if (platformInfo.os == "mac"){
                    nonPositionalStates.maximized = false;
                }
                // just create a new window and done if the current
                // window is in special state.
                if (nonPositionalStates[curWindow.state]){
                    chrome.windows.create(createData);
                    return;
                }
                // create a new window with position setting.
                delete createData.state;
                createData.top = curWindow.top;
                createData.left = curWindow.left;
                chrome.windows.create(createData);
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
