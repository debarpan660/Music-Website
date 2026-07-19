// Get the player elements
const audioPlayer = document.getElementById("audioPlayer");
const currentTitle = document.getElementById("currentTitle");
const currentArtist = document.getElementById("currentArtist");
const equalizer = document.getElementById("equalizer");
const currentCover = document.getElementById("currentCover");

// Song list

const songs = [
{
    title: "Shape of You",
    artist: "Ed Sheeran",
    file: "music/song1.mp3",
    image: "images/song1.jpg",
},
{
    title: "Believer",
    artist: "Imagine Dragons",
    file: "music/song2.mp3",
    image: "images/song2.jpg",
},
{
    title: "Perfect",
    artist: "Ed Sheeran",
    file: "music/song3.mp3",
    image: "images/song3.jpg",
}
];

//Load Song

let currentSong = 0;
function loadSong(index) {
    currentSong = index;
    localStorage.setItem("currentSong", index);

  currentTitle.textContent = songs[index].title;
currentArtist.textContent = songs[index].artist;
audioPlayer.src = songs[index].file;
currentCover.src = songs[index].image;
    

}
document.getElementById("play1").addEventListener("click", function () {

    loadSong(0);

    audioPlayer.play();
    playPauseBtn.textContent = "⏸";
    currentCover.classList.add("rotating");
    currentCover.style.animationPlayState = "running";
    equalizer.classList.add("playing");

});

document.getElementById("play2").addEventListener("click", function () {

    loadSong(1);

    audioPlayer.play();
    playPauseBtn.textContent = "⏸";
    currentCover.classList.add("rotating");
    currentCover.style.animationPlayState = "running";
    equalizer.classList.add("playing");

});

document.getElementById("play3").addEventListener("click", function () {

    loadSong(2);

    audioPlayer.play();
    playPauseBtn.textContent = "⏸";
    currentCover.classList.add("rotating");
    currentCover.style.animationPlayState = "running";
    equalizer.classList.add("playing");

});

//Next & Previous

document.getElementById("nextBtn").addEventListener("click", function () {
    currentSong++;

    if (currentSong >= songs.length) {
        currentSong = 0;
    }

    loadSong(currentSong);
    audioPlayer.play();
    playPauseBtn.textContent = "⏸";
    currentCover.classList.add("rotating");
    currentCover.style.animationPlayState="running";
    equalizer.classList.add("playing");
});

document.getElementById("prevBtn").addEventListener("click", function () {
    currentSong--;

    if (currentSong < 0) {
        currentSong = songs.length - 1;
    }

    loadSong(currentSong);
    audioPlayer.play();
    playPauseBtn.textContent = "⏸";
    currentCover.classList.add("rotating");
    currentCover.style.animationPlayState="running";
    equalizer.classList.add("playing");
});
audioPlayer.addEventListener("ended", function () {
    if (repeatMode) {
    audioPlayer.currentTime = 0;
    audioPlayer.play();
    return;
}

  if (shuffleMode) {

    let randomSong;

    do {
        randomSong = Math.floor(Math.random() * songs.length);
    } while (randomSong === currentSong);

    currentSong = randomSong;

} else {

    currentSong++;

    if (currentSong >= songs.length) {
        currentSong = 0;
    }

}

    loadSong(currentSong);
    audioPlayer.play();
    playPauseBtn.textContent = "⏸";
    currentCover.classList.add("rotating");
    currentCover.style.animationPlayState= "running";
    equalizer.classList.add("playing");

});

//Search

const searchInput = document.getElementById("searchInput");
const searchBtn = document.getElementById("searchBtn");

searchBtn.addEventListener("click", function () {
    const searchText = searchInput.value.toLowerCase();

    for (let i = 0; i < songs.length; i++) {

       if (songs[i].title.toLowerCase().includes(searchText)) {
            loadSong(i);
            document.querySelector(".player").scrollIntoView({
    behavior: "smooth"
});
            return;
        }

    }

    alert("Song not found!");

});

//Favorites

function toggleFavorite(buttonId) {
    const button = document.getElementById(buttonId);

    if (button.textContent == "🤍") {
        button.textContent = "❤️";
        localStorage.setItem(buttonId, "❤️");
    } else {
        button.textContent = "🤍";
        localStorage.setItem(buttonId, "🤍");
    }
    updateFavorites();
}

document.getElementById("fav1").onclick = function () {
    toggleFavorite("fav1");
};

document.getElementById("fav2").onclick = function () {
    toggleFavorite("fav2");
};

document.getElementById("fav3").onclick = function () {
    toggleFavorite("fav3");
};

// Load saved favorites

["fav1", "fav2", "fav3"].forEach(function(id) {
    const saved = localStorage.getItem(id);

    if (saved) {
        document.getElementById(id).textContent = saved;
    }
});
updateFavorites();
function updateFavorites() {
    const favoriteList = document.getElementById("favoriteList");

    favoriteList.innerHTML = "";

    if (localStorage.getItem("fav1") == "❤️") {
        favoriteList.innerHTML += "🎵 Shape of You<br>";
    }

    if (localStorage.getItem("fav2") == "❤️") {
        favoriteList.innerHTML += "🎵 Believer<br>";
    }

    if (localStorage.getItem("fav3") == "❤️") {
        favoriteList.innerHTML += "🎵 Perfect<br>";
    }

    if (favoriteList.innerHTML == "") {
        favoriteList.innerHTML = "No favorite songs yet.";
    }
}

// Play / Pause

const playPauseBtn = document.getElementById("playPauseBtn");

playPauseBtn.addEventListener("click", function () {

    if (audioPlayer.paused) {

        audioPlayer.play();
        equalizer.classList.add("playing");
        playPauseBtn.textContent = "⏸";
        currentCover.classList.add("rotating");
        currentCover.classList.add("glow");
        currentCover.style.animationPlayState= "running";

    } else {

        audioPlayer.pause();
        equalizer.classList.remove("playing");
        playPauseBtn.textContent = "▶";
        currentCover.style.animationPlayState="paused";
        currentCover.classList.remove("glow");

    }

});

// Progress Bar & Timer

const timeDisplay = document.getElementById("timeDisplay");

audioPlayer.addEventListener("timeupdate", function () {
    localStorage.setItem("currentTime", audioPlayer.currentTime);

    const current = Math.floor(audioPlayer.currentTime);
    const total = Math.floor(audioPlayer.duration);
    if (isNaN(total)) {
    timeDisplay.textContent = "00:00 / 00:00";
    return;
}

    const currentMin = Math.floor(current / 60);
    const currentSec = current % 60;

    const totalMin = Math.floor(total / 60);
    const totalSec = total % 60;

    timeDisplay.textContent =
        `${currentMin}:${String(currentSec).padStart(2,"0")} / ${totalMin}:${String(totalSec).padStart(2,"0")}`;
    const progressBar = document.getElementById("progressBar");

const progress =
    (audioPlayer.currentTime / audioPlayer.duration) * 100;

progressBar.style.width = progress + "%";
});
const progressContainer = document.querySelector(".progress-container");

progressContainer.addEventListener("click", function (e) {
  if (isDragging) return;
  const width = this.clientWidth;
  const clickX = e.offsetX;
  const duration = audioPlayer.duration;

audioPlayer.currentTime = (clickX / width) * duration;

});

// Volume

const volumeSlider = document.getElementById("volumeSlider");

volumeSlider.addEventListener("input", function () {

    audioPlayer.volume = this.value / 100;

    localStorage.setItem("volume", this.value);

});
let isDragging = false;
const progressBar = document.getElementById("progressBar");

const progressThumb = document.getElementById("progressThumb");
progressThumb.addEventListener("mousedown", function () {
    isDragging = true;
});
document.addEventListener("mouseup", function () {

    setTimeout(() => {
        isDragging = false;
    }, 10);

});
document.addEventListener("mousemove", function (e) {

    if (!isDragging) return;

    const rect = progressContainer.getBoundingClientRect();

    let x = e.clientX - rect.left;

    if (x < 0) x = 0;
    if (x > rect.width) x = rect.width;

    const percent = x / rect.width;

    progressBar.style.width = (percent * 100) + "%";

    audioPlayer.currentTime = percent * audioPlayer.duration;

});

// Shuffle

let shuffleMode= false;
const shuffleBtn = document.getElementById("shuffleBtn");

shuffleBtn.addEventListener("click", function () {

    shuffleMode = !shuffleMode;

    if (shuffleMode) {
        shuffleBtn.style.background = "#ff9800";
    } else {
        shuffleBtn.style.background = "#1DB954";
    }

});

// Repeat

let repeatMode = false;

const repeatBtn = document.getElementById("repeatBtn");
repeatBtn.addEventListener("click", function () {

    repeatMode = !repeatMode;

    if (repeatMode) {

        repeatBtn.style.background = "#ff9800";

    } else {

        repeatBtn.style.background = "#1DB954";

    }

});

// Mute

const muteBtn = document.getElementById("muteBtn");

muteBtn.addEventListener("click", function () {

    if (audioPlayer.muted) {

        audioPlayer.muted = false;
        muteBtn.textContent = "🔊";

    } else {

        audioPlayer.muted = true;
        muteBtn.textContent = "🔇";

    }

});
const savedSong = localStorage.getItem("currentSong");

if (savedSong !== null) {
    currentSong = Number(savedSong);
    loadSong(currentSong);
}
const savedVolume = localStorage.getItem("volume");

if (savedVolume !== null) {

    volumeSlider.value = savedVolume;

    audioPlayer.volume = savedVolume / 100;

}
const savedTime = localStorage.getItem("currentTime");

if (savedTime !== null) {
    audioPlayer.currentTime = Number(savedTime);
}

// Keyboard Shortcuts

document.addEventListener("keydown", function (e) {

    if (e.code === "Space") {
        e.preventDefault();
        playPauseBtn.click();
    }

    if (e.code === "ArrowRight") {
        document.getElementById("nextBtn").click();
    }

    if (e.code === "ArrowLeft") {
        document.getElementById("prevBtn").click();
    }

});