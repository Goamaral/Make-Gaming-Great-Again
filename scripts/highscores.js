"use strict";

window.onload = function() {
    let buttons = [];
    buttons.push(document.getElementById('backButton'));
    console.log(buttons);
    for (var i = 0; i < buttons.length; i++) {
        buttons[i].onclick = buttonClickHandler;
    }

    function buttonClickHandler(ev) {
        talkWithParent(ev.target.id)
    }
};

function talkWithParent(msg) {
    parent.postMessage(msg, '*');
}
