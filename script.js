// 1. YOUR MOVIE LIST
// Paste the ID from your Google Drive Link
// (Link looks like: drive.google.com/file/d/THIS_IS_THE_ID/view)

const movies = [
    { title: "My First Video", id: "1Jy4GaXQgStFadoU2XQLwDk4AOxJpQqaY" }, // Example ID
    { title: "Vacation 2024", id: "1o5LMqPrsSoaXA8xOoB0z6HbwRfiwmpiL" }, 
    { title: "Heretic", id: "1DQtC18zTU26g9Dow3kfYy-dA449ieBtQ" }
];

// 2. The Code that builds the UI
const grid = document.getElementById('video-grid');
const modal = document.getElementById('video-modal');
const player = document.getElementById('player-frame');

// Generate Cards
movies.forEach(movie => {
    const card = document.createElement('div');
    card.className = 'card';
    
    // We use a simple gradient placeholder since Drive doesn't give thumbnails easily
    card.style.background = `linear-gradient(45deg, #333, #111)`;
    card.innerHTML = `<div class="card-title">${movie.title}</div>`;

    // Click to Play
    card.onclick = () => {
        openPlayer(movie.id);
    };

    grid.appendChild(card);
});

// 3. Player Functions
function openPlayer(driveId) {
    // The Magic Link: This forces the clean video player
    const streamUrl = `https://drive.google.com/file/d/${driveId}/preview`;
    player.src = streamUrl;
    modal.style.display = 'flex';
}

function closePlayer() {
    modal.style.display = 'none';
    player.src = ""; // Stop video
}
