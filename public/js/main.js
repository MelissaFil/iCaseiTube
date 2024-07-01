"use strict";
document.addEventListener('DOMContentLoaded', function () {
    // Inicialização do mf_drawer
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
        } else {
            drawer.classList.add('hidden');
        }
    });

    // Inicialização do mf_videos
    const mainContent = document.querySelector('#main-content');
    const videoContainer = document.createElement('div');
    videoContainer.id = 'mf_videos';

    if (mainContent) {
        mainContent.appendChild(videoContainer);

        fetch('src/mf_videos/videos.html')
            .then(response => response.text())
            .then(html => {
                videoContainer.innerHTML = html;
                const script = document.createElement('script');
                script.src = 'src/mf_videos/videos.js';
                script.type = 'module';
                document.body.appendChild(script);
            })
            .catch(error => console.error('Erro ao carregar o arquivo de vídeos:', error));
    }
});
