function getOption(name){
    var value = localStorage[name];
    // Defaults
    if (value == undefined){
        value = {
            newWindowsPosition: false
        }[name];
    }
    // Convert type
    value = {
        newWindowsPosition: Number
    }[name](value);
    return value;
}

function setOption(name, value){
    value = {
        newWindowsPosition: Number
    }[name](value);
    localStorage[name] = "" + value;
}
