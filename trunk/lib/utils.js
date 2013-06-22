function $(id){
    return document.getElementById(id);
}

function fillMessage(){
    var placeHolders = document.getElementsByClassName("message");
    for (var i = 0; i < placeHolders.length; ++i){
        placeHolders[i].innerHTML = chrome.i18n.getMessage(placeHolders[i].getAttribute("message"));
    }
}
