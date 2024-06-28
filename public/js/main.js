"use strict";
document.addEventListener('DOMContentLoaded', function () {
    const drawer = document.querySelector('#drawer');
    const menuIcon = document.querySelector("#menu-icon");
    if (!drawer || !menuIcon) {
        console.error('Elementos #drawer ou #menu-icon não encontrados no DOM.');
        return;
    }
    menuIcon.addEventListener('click', function () {
        if (drawer.classList.contains('hidden')) {
            fetch('src/mf_drawer/drawer.html')
                .then(response => response.text())
                .then(html => {
                if (drawer) {
                    drawer.innerHTML = html;
                    drawer.classList.remove('hidden');
                }
            })
                .catch(error => console.error('Erro ao carregar o arquivo:', error));
        }
        else {
            drawer.classList.add('hidden');
        }
    });
});
