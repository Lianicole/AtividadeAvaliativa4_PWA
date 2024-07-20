document.getElementById('tirarFoto').addEventListener('click', function() {
    window.location.href = 'camera.html';
});

document.getElementById('verGaleria').addEventListener('click', function() {
    window.location.href = 'gallery.html';
});

document.getElementById('logout').addEventListener('click', function() {
    localStorage.removeItem('loggedInUser');
    window.location.href = 'index.html';
});


window.onload = function() {
    const loggedInUser = localStorage.getItem('loggedInUser');
    if (!loggedInUser) {
        window.location.href = 'index.html';
    }
};
