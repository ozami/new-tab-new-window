import {$, fillMessage} from "./lib/utils.js";

fillMessage();

$("closeBtn").addEventListener("click", function(){
    window.close();
});
