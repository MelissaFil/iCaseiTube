// Função para carregar vídeos do iCasei da API do YouTube
function loadICaseiVideos(searchTerm) {
    const apiKey = 'AIzaSyBIHhonPI23EkOzeBZ1E0zqCBGK6uZrMmA';
    const channelId = 'UCu5VHc965WcULpGtbu7TcSQ';
    const url = `https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=10&type=video&q=${searchTerm}&channelId=${channelId}&key=${apiKey}`;
    console.log('load')
    fetch(url)
        .then(response => response.json())
        .then(data => {
            const videos = data.items.map(item => ({
                id: item.id.videoId,
                title: item.snippet.title,
                description: item.snippet.description,
                thumbnail: item.snippet.thumbnails.default.url
            }));

            renderVideoList(videos);
        })
        .catch(error => console.error('Erro ao buscar vídeos do iCasei:', error));
}

// Função para carregar o template do card de vídeo
async function fetchTemplate() {
    const response = await fetch('./src/mf_videos/videoCard.html');
    return response.text();
}

// Função para renderizar a lista de vídeos na página
async function renderVideoList(videos) {
    console.log('render')
    const videoList = document.querySelector('#video-list');
    videoList.innerHTML = '';

    const template = await fetchTemplate();
   
    videos.forEach(video => {
      
        let videoCard = template;
        videoCard = videoCard.replace('{{thumbnail}}', video.thumbnail);
        videoCard = videoCard.replaceAll('{{title}}', video.title);
       
        const videoElement = document.createElement('div');
        videoElement.classList.add('video-item');
        videoElement.innerHTML = videoCard;
        videoList.appendChild(videoElement);
    });
}

// Função para inicializar a busca
function initSearch() {
    const searchButton = document.querySelector('#search-button');
    const searchInput = document.querySelector('#search-input');

    searchButton.addEventListener('click', () => {
        const searchTerm = searchInput.value.trim();
        loadICaseiVideos(searchTerm);
    });

    // Chamada inicial para carregar vídeos do iCasei
    loadICaseiVideos('');
}

// Inicializa a busca ao carregar o videos.js
document.addEventListener('DOMContentLoaded', initSearch());
