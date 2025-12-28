// 1. YOUR MOVIE LIST
// Paste the FULL URL of the video player you want to use.
const movies = [
    { 
        title: "Action Movie (Drive Player)", 
        // This uses the official Google Drive Preview (Safe, reliable)
        url: "https://drive.google.com/file/d/1CwKOe66qu484pJoFcvqNrdI8IItyif36/view?usp=sharing" 
    },
    { 
        title: "Funny Clip (Heroku Player)", 
        // Paste the FULL link you get from the youfiles.herokuapp.com site here
        url: "https://youfiles.herokuapp.com/videodictionary/?m=Video_Player_Drive" 
    },
    { 
        title: "My Trailer", 
        // You can even mix in YouTube links if you want!
        url: "https://www.youtube.com/embed/dQw4w9WgXcQ" 
    }
];

// 2. The UI Logic (Do not touch this part)
const grid = document.getElementById('video-grid');
const modal = document.getElementById('video-modal');
const player = document.getElementById('player-frame');
const fallbackBtn = document.getElementById('mobile-fallback-btn'); // Setup fallback

movies.forEach(movie => {
    const card = document.createElement('div');
    card.className = 'card';
    card.style.background = `linear-gradient(45deg, #222, #000)`; // Default dark BG
    card.innerHTML = `<div class="card-title">${movie.title}</div>`;

    card.onclick = () => {
        openPlayer(movie.url);
    };

    grid.appendChild(card);
});

function openPlayer(videoUrl) {
    // 1. Load the video into the iframe
    player.src = videoUrl;
    
    // 2. Create a "Open Directly" button for mobile users (Fixes the black screen bug)
    // We check if it's a Heroku link or Drive link to create the right fallback
    let directLink = videoUrl;
    
    // If it's a Google Drive PREVIEW link, change it to VIEW for the button
    if(videoUrl.includes("drive.google.com") && videoUrl.includes("preview")) {
        directLink = videoUrl.replace("preview", "view");
    }

    // Update the fallback button
    let btn = document.getElementById('mobile-fallback-btn');
    if (!btn) {
        btn = document.createElement('a');
        btn.id = 'mobile-fallback-btn';
        btn.className = 'fallback-btn';
        btn.innerText = "Video stuck? Click to watch in App";
        btn.target = "_blank";
        document.querySelector('.modal-content').appendChild(btn);
    }
    btn.href = directLink;

    modal.style.display = 'flex';
}

function closePlayer() {
    modal.style.display = 'none';
    player.src = ""; // Stop video immediately
}
