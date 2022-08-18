import {getOption, setOption} from "./lib/option.js";

const CASCADE = 0;
const SAME_AS_PARENT = 1;
const MAXIMIZE = 2;



chrome.tabs.onCreated.addListener(function(tab){
console.log("url" + " " + tab.pendingUrl);
console.log("active" + " " + tab.active);
console.log("index" + " " + tab.index);

    /* forked from ozami, my code added below */
    
  	// for when the user clicks the plus sign on the top to open a new tab
	if (tab.pendingUrl == "chrome://newtab/") {
	
	   return;
	
	}
	
	// for when the user right clicks on a link and selects "open in new tab"		
	if (tab.active == false) {
	
	   return;	
	
	}	
	
	// this was there from before. the very first tab to open a gets new window, so no need to force one.	
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
            // a new window and done.
            if (newWindowsPosition == CASCADE){
                chrome.windows.create(createData);
                return;
            }
            // always maximize new window
            if (newWindowsPosition == MAXIMIZE){
                createData.state = "maximized";
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
