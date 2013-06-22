var getOption = function(name, callback){
    var defaults = {
        newWindowsPosition: 0
    };
    var query = {};
    query[name] = defaults[name];
    chrome.storage.sync.get(query, function(options){
        callback(options[name]);
    });
};

var setOption = function(name, value, callback){
    value = {
        newWindowsPosition: Number
    }[name](value);
    var data = {};
    data[name] = value;
    chrome.storage.sync.set(data, callback);
};
