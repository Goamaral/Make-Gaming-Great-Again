"use strict";

(function() {
	window.addEventListener("load", main);
}());

function main() {
	showPage("menu.html");
}

// Navegação e gestão de janelas
function showPage(page) {
	// carregar página na frame e enviar mensagem para a página logo que esteja carregada (frameLoadHandler)
	var frm = document.getElementsByTagName("iframe")[0];
	frm.src = page;
}
