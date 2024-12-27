document.addEventListener('DOMContentLoaded', function() {
    // Check if the user is logged in
    const user = localStorage.getItem('user');
    const loginLink = document.getElementById('loginLink');
    const signupLink = document.getElementById('signupLink');
    const createLink = document.getElementById('createLink');

    if (user) {
        loginLink.textContent = 'Logout';
        loginLink.onclick = logoutUser;
        signupLink.style.display = 'none'; // Hide sign-up link when logged in
        createLink.style.display = 'block'; // Show create link
    } else {
        loginLink.onclick = () => window.location.href = 'login.html';
        signupLink.onclick = () => window.location.href = 'signup.html';
        createLink.style.display = 'none'; // Hide create link when not logged in
    }

    // Load videos (check if there are saved videos)
    loadVideos();
});

function loadVideos() {
    const videoList = document.getElementById('videoList');
    const videos = JSON.parse(localStorage.getItem('videos')) || [];

    videoList.innerHTML = '';
    videos.forEach(video => {
        const videoElement = document.createElement('div');
        videoElement.classList.add('videoThumbnail');
        videoElement.innerHTML = `
            <img src="${video.thumbnailURL}" alt="${video.title}">
            <h4>${video.title}</h4>
        `;
        videoElement.onclick = () => playVideo(video.videoURL);
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

function playVideo(videoURL) {
    window.location.href = videoURL; // Redirect to video URL for playback
}

function logoutUser() {
    localStorage.removeItem('user');
    window.location.href = 'login.html';
}
