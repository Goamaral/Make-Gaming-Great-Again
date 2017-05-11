"use strict";

window.onload = function() {
    let buttons = [];
    buttons.push(document.getElementById('backButton'));
    buttons[0].onclick = buttonClickHandler;

    function buttonClickChildHandler(ev) {
      talkWithParent(ev.target.parentNode.id);
    }

    function buttonClickHandler(ev) {
      talkWithParent(ev.target.id)
    }
};

function talkWithParent(msg) {
    parent.postMessage(msg, '*');
}
