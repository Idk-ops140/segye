document.addEventListener('DOMContentLoaded', function() {
    // Check if the user is logged in
    const user = localStorage.getItem('user');
    const loginLink = document.getElementById('loginLink');
    const signupLink = document.getElementById('signupLink');
    
    if (user) {
        loginLink.textContent = 'Logout';
        loginLink.onclick = logoutUser;
        signupLink.style.display = 'none'; // Hide sign-up link when logged in
    } else {
        loginLink.onclick = () => window.location.href = 'login.html';
        signupLink.onclick = () => window.location.href = 'signup.html';
    }

    // Load videos (just a mock example)
    loadVideos();
});

function loadVideos() {
    const videoList = document.getElementById('videoList');
    const videos = [
        { title: 'Video 1', thumbnail: 'https://via.placeholder.com/150' },
        { title: 'Video 2', thumbnail: 'https://via.placeholder.com/150' },
        { title: 'Video 3', thumbnail: 'https://via.placeholder.com/150' },
    ];

    videoList.innerHTML = '';
    videos.forEach(video => {
        const videoElement = document.createElement('div');
        videoElement.classList.add('videoThumbnail');
        videoElement.innerHTML = `<img src="${video.thumbnail}" alt="${video.title}"><h4>${video.title}</h4>`;
        videoElement.onclick = () => playVideo(video.title);
        videoList.appendChild(videoElement);
    });
}

function searchVideos() {
    const searchTerm = document.getElementById('searchBar').value.toLowerCase();
    const videoThumbnails = document.querySelectorAll('.videoThumbnail');

    videoThumbnails.forEach(video => {
        const title = video.querySelector('h4').textContent.toLowerCase();
        if (title.includes(searchTerm)) {
            video.style.display = 'block';
        } else {
            video.style.display = 'none';
        }
    });
}

function playVideo(title) {
    alert(`Playing: ${title}`);
}

function logoutUser() {
    localStorage.removeItem('user');
    window.location.href = 'login.html';
}
