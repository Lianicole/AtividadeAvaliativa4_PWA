document.addEventListener('DOMContentLoaded', (event) => {
    const video = document.getElementById('transmissaoCamera');
    const canvas = document.getElementById('canvasCamera');
    const contexto = canvas.getContext('2d');
    const botaoTirarFoto = document.getElementById('tirarFoto');
    const botaoVoltar = document.getElementById('voltar');

    navigator.mediaDevices.getUserMedia({ video: true })
        .then((stream) => {
            video.srcObject = stream;
            video.play();
        })
        .catch((err) => {
            console.error("Erro ao acessar a câmera: ", err);
            alert("Erro ao acessar a câmera: " + err.message);
        });

    botaoTirarFoto.addEventListener('click', () => {
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;
        contexto.drawImage(video, 0, 0, canvas.width, canvas.height);

        salvarImagemNoLocalStorage(canvas.toDataURL());
        mostrarNotificacao('Foto tirada', 'Sua foto foi tirada com sucesso!');
    });

    botaoVoltar.addEventListener('click', () => {
        window.location.href = 'menu.html';
    });

    function salvarImagemNoLocalStorage(dataUrl) {
        let imagens = JSON.parse(localStorage.getItem('imagens')) || [];
        imagens.push(dataUrl);
        localStorage.setItem('imagens', JSON.stringify(imagens));
    }

    function mostrarNotificacao(titulo, corpo) {
        if (Notification.permission === 'granted') {
            navigator.serviceWorker.getRegistration().then(function (reg) {
                reg.showNotification(titulo, {
                    body: corpo,
                    icon: '/icon-192x192.png',
                });
            });
        }
    }
});
