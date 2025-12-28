// --- CONFIGURATION ---
const API_KEY = "AIzaSyAYrcBjfHKWN4qKXJJUlV7LFzPYGJY4Nbw"; // From Step 1

const movies = [
    { 
        title: "My 4K Movie", 
        id: "1Jy4GaXQgStFadoU2XQLwDk4AOxJpQqaY" // e.g., 1A2B3C...
    },
    { 
        title: "Vacation Video", 
        id: "1o5LMqPrsSoaXA8xOoB0z6HbwRfiwmpiL"
    },
     { 
        title: "Movie", 
        id: "1Jy4GaXQgStFadoU2XQLwDk4AOxJpQqaY" // e.g., 1A2B3C...
    }
];
// ---------------------

const grid = document.getElementById('video-grid');
const modal = document.getElementById('video-modal');
let player = null; // We will initialize this later

// 1. Build the Grid
movies.forEach(movie => {
    const card = document.createElement('div');
    card.className = 'card';
    card.style.background = `linear-gradient(45deg, #222, #111)`;
    card.innerHTML = `<div class="card-title">${movie.title}</div>`;

    card.onclick = () => {
        openPlayer(movie.id);
    };

    grid.appendChild(card);
});

// 2. Open Player Logic
// 2. Open Player Logic
function openPlayer(fileId) {
    // --- PART 1: RESET (New Fix) ---
    // This kills the old video process so the browser doesn't get confused
    if (player) {
        player.pause();
        player.src({ src: "", type: "video/mp4" }); 
        player.reset(); 
    }
    
    modal.style.display = 'flex';

    // --- PART 2: THE LINK ---
    // We use Date.now() to create a unique timestamp (nocache)
    // We use acknowledgeAbuse=true to bypass virus warnings
    const streamUrl = `https://www.googleapis.com/drive/v3/files/${fileId}?alt=media&key=${API_KEY}&acknowledgeAbuse=true`;
    console.log("TEST LINK:", streamUrl);
    // --- PART 3: INITIALIZE ---
    if (!player) {
        player = videojs('my-player');
    }

    // --- PART 4: PLAY ---
    player.src({ type: 'video/mp4', src: streamUrl });
    player.play();

    // --- PART 5: DOWNLOAD BUTTON ---
    let dlBtn = document.getElementById('download-btn');
    
    if (!dlBtn) {
        dlBtn = document.createElement('a');
        dlBtn.id = 'download-btn';
        dlBtn.className = 'download-btn'; 
        dlBtn.innerText = "⬇ Download Video";
        dlBtn.target = "_blank"; 
        document.querySelector('.modal-content').appendChild(dlBtn);
    }

    // Update the button to point to the current file
    dlBtn.href = streamUrl;
}

// 3. Close Logic
function closePlayer() {
    modal.style.display = 'none';
    if (player) {
        player.pause();
    }
}
