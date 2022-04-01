export function getOption(name, callback){
    var defaults = {
        newWindowsPosition: 0
    };
    var query = {};
    query[name] = defaults[name];
    chrome.storage.sync.get(query, function(options){
        callback(options[name]);
    });
};

export function setOption(name, value, callback){
    value = {
        newWindowsPosition: Number
    }[name](value);
    var data = {};
    data[name] = value;
    chrome.storage.sync.set(data, callback);
};
