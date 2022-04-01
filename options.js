import {getOption, setOption} from "./lib/option.js";
import {$, fillMessage} from "./lib/utils.js";

fillMessage();

var inputs = document.querySelectorAll("input[name=newWindowsPosition]");
for (var i = 0; i < inputs.length; ++i){
    inputs[i].addEventListener("click", function(){
        setOption(this.name, this.value);
    });
}
getOption("newWindowsPosition", function(value){
    for (var i = 0; i < inputs.length; ++i){
        if (inputs[i].value == value){
            inputs[i].checked = true;
        }
    }
});
// Setup the test button
$("testBtn").addEventListener("click", function(){
    window.open("options_test.html", "_blank");
});
