/**************************HAMBURGER*****************************/
const hamburger = document.querySelector(".hamburger");
const navMenu = document.querySelector(".links");

hamburger.addEventListener("click", () => {
  hamburger.classList.toggle("active");
  navMenu.classList.toggle("active");
});

const playlistContainer = document.querySelector(".playlist-podcast");
const playlistThumb = document.getElementById("scrollbarThumbPlaylist");

function updatePlaylistThumb() {
  const scrollHeight = playlistContainer.scrollHeight;
  const visibleHeight = playlistContainer.clientHeight;
  const scrollTop = playlistContainer.scrollTop;
  const thumbHeight = Math.max(
    (visibleHeight / scrollHeight) * visibleHeight,
    30
  );
  const thumbTop = (scrollTop / scrollHeight) * visibleHeight;

  playlistThumb.style.height = `${thumbHeight}px`;
  playlistThumb.style.top = `${thumbTop}px`;
}

/**************************SCROLLBAR*****************************/
playlistContainer.addEventListener("scroll", updatePlaylistThumb);
window.addEventListener("resize", updatePlaylistThumb);
window.addEventListener("load", updatePlaylistThumb);

// Enable dragging the playlist scrollbar
let isPlaylistDragging = false;
let playlistStartY, playlistStartScrollTop;

playlistThumb.addEventListener("mousedown", (e) => {
  isPlaylistDragging = true;
  playlistStartY = e.clientY;
  playlistStartScrollTop = playlistContainer.scrollTop;
  document.body.style.userSelect = "none";
});

document.addEventListener("mousemove", (e) => {
  if (!isPlaylistDragging) return;
  const deltaY = e.clientY - playlistStartY;
  const scrollFactor =
    playlistContainer.scrollHeight / playlistContainer.clientHeight;
  playlistContainer.scrollTop = playlistStartScrollTop + deltaY * scrollFactor;
});

document.addEventListener("mouseup", () => {
  isPlaylistDragging = false;
  document.body.style.userSelect = "";
});

const content2 = document.getElementById("content2");
const thumb2 = document.getElementById("scrollbarThumb2");

function updateCustomThumb() {
  const scrollHeight = content2.scrollHeight;
  const visibleHeight = content2.clientHeight;
  const scrollTop = content2.scrollTop;
  const thumbHeight = Math.max(
    (visibleHeight / scrollHeight) * visibleHeight,
    30
  );
  const thumbTop = (scrollTop / scrollHeight) * visibleHeight;

  thumb2.style.height = `${thumbHeight}px`;
  thumb2.style.top = `${thumbTop}px`;

  // Remove all border-radius classes
  thumb2.classList.remove("top-rounded", "bottom-rounded", "both-rounded");

  const atTop = scrollTop <= 0;
  const atBottom = scrollTop + visibleHeight >= scrollHeight - 1;

  if (atTop && atBottom) {
    thumb2.classList.add("both-rounded");
  } else if (atTop) {
    thumb2.classList.add("top-rounded");
  } else if (atBottom) {
    thumb2.classList.add("bottom-rounded");
  }
}

content2.addEventListener("scroll", updateCustomThumb);
window.addEventListener("resize", updateCustomThumb);
window.addEventListener("load", updateCustomThumb);

// Enable dragging the scrollbar
let isDragging = false;
let startY, startScrollTop;

thumb2.addEventListener("mousedown", (e) => {
  isDragging = true;
  startY = e.clientY;
  startScrollTop = content2.scrollTop;
  document.body.style.userSelect = "none";
});

document.addEventListener("mousemove", (e) => {
  if (!isDragging) return;
  const deltaY = e.clientY - startY;
  const scrollFactor = content2.scrollHeight / content2.clientHeight;
  content2.scrollTop = startScrollTop + deltaY * scrollFactor;
});

document.addEventListener("mouseup", () => {
  isDragging = false;
  document.body.style.userSelect = "";
});

function updateContentOnResize() {
  const element = document.getElementById("changable-content");

  if (window.innerWidth < 570) {
    element.textContent = "Open App";
  } else {
    element.textContent = "Log in";
  }
}

updateContentOnResize();
window.addEventListener("resize", updateContentOnResize);

/**************************MUSICPLAYER*****************************/
document.addEventListener("DOMContentLoaded", function () {
  const pElement = document.querySelector(".foot-singer-name");
  let originalContent = pElement.textContent;
  let isMarquee = false;

  pElement.addEventListener("mouseenter", function () {
    if (!isMarquee) {
      // Store original content and attributes
      originalContent = this.textContent;
      const className = this.className;

      // Create marquee element
      const marquee = document.createElement("marquee");
      marquee.textContent = originalContent;
      marquee.className = className;
      marquee.setAttribute("scrollamount", "4"); // Slow speed

      // Replace p with marquee
      this.parentNode.replaceChild(marquee, this);
      isMarquee = true;

      // Add mouseleave event to the new marquee
      marquee.addEventListener("mouseleave", function () {
        // Create new p element
        const newP = document.createElement("p");
        newP.textContent = originalContent;
        newP.className = className;

        // Replace marquee with p
        this.parentNode.replaceChild(newP, this);
        isMarquee = false;

        // Re-add the mouseenter event to the new p element
        addHoverEvent(newP);
      });
    }
  });

  function addHoverEvent(element) {
    element.addEventListener("mouseenter", function () {
      if (!isMarquee) {
        originalContent = this.textContent;
        const className = this.className;

        const marquee = document.createElement("marquee");
        marquee.textContent = originalContent;
        marquee.className = className;
        marquee.setAttribute("scrollamount", "2"); // Slow speed

        this.parentNode.replaceChild(marquee, this);
        isMarquee = true;

        marquee.addEventListener("mouseleave", function () {
          const newP = document.createElement("p");
          newP.textContent = originalContent;
          newP.className = className;

          this.parentNode.replaceChild(newP, this);
          isMarquee = false;

          addHoverEvent(newP);
        });
      }
    });
  }
});

const playButtons = document.querySelectorAll(".play-btn");
const mainFooter = document.querySelector(".main-footer");
const mainFooterMusicPlay = document.querySelector(".main-footer-music-play");

playButtons.forEach((button) => {
  button.addEventListener("click", (e) => {
    e.preventDefault(); // Prevent default behavior if it's a link
    if (mainFooter) {
      mainFooter.style.display = "none";
      mainFooterMusicPlay.style.display = "grid";
      playPause();
    }
    console.log("Play button clicked!");
  });
});

const closeBtn = document.getElementById("close-btn");
const mobileContent = document.querySelector(".mobile-content");

closeBtn.addEventListener("click", () => {
  mobileContent.style.display = "none";
});

let progress = document.getElementById("progress");
let song = document.getElementById("song");
let currentTime = document.getElementById("current-time");
let totalTime = document.getElementById("total-time");
let ctrlIcon = document.getElementById("ctrlIcon");

// Format time function
function formatTime(seconds) {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = Math.floor(seconds % 60);
  return `${minutes}:${remainingSeconds.toString().padStart(2, "0")}`;
}

song.onloadedmetadata = function () {
  progress.max = song.duration;
  totalTime.textContent = formatTime(song.duration);
};

function playPause() {
  if (ctrlIcon.classList.contains("fa-circle-pause")) {
    song.pause();
    ctrlIcon.classList.remove("fa-circle-pause");
    ctrlIcon.classList.add("fa-circle-play");
  } else {
    song.play();
    ctrlIcon.classList.remove("fa-circle-play");
    ctrlIcon.classList.add("fa-circle-pause");
  }
}

song.addEventListener("timeupdate", function () {
  if (song.duration) {
    progress.value = song.currentTime;
    currentTime.textContent = formatTime(song.currentTime);

    const progressPercent = (song.currentTime / song.duration) * 100;
    progress.style.background = `linear-gradient(to right, var(--white) ${progressPercent}%, grey ${progressPercent}%)`;
  }
});

progress.addEventListener("input", function () {
  song.currentTime = progress.value;
  const progressPercent = (progress.value / song.duration) * 100;
  progress.style.background = `linear-gradient(to right, var(--white) ${progressPercent}%, grey ${progressPercent}%)`;
});

song.addEventListener("ended", function () {
  ctrlIcon.classList.remove("fa-circle-pause");
  ctrlIcon.classList.add("fa-circle-play");
  progress.value = 0;
  currentTime.textContent = "0:00";
  progress.style.background = "grey";
});

// Add spacebar functionality
document.addEventListener("keydown", function (event) {
  // Check if spacebar is pressed (keyCode 32 or key === ' ')
  if (event.code === "Space" || event.key === " ") {
    // Prevent default spacebar behavior (scrolling)
    event.preventDefault();

    // Only trigger if user is not typing in an input field
    if (
      document.activeElement.tagName !== "INPUT" &&
      document.activeElement.tagName !== "TEXTAREA" &&
      !document.activeElement.isContentEditable
    ) {
      playPause();
    }
  }
});

/**************************VOLUME*****************************/
// Enhanced volume slider functionality with progress bar styling and persistence
let volumeSlider = document.getElementById("volume");
let volumeIcon = document.getElementById("volume-icon");
let volumeContainer = document.querySelector(".volume-container");

// Load saved volume from localStorage, default to 100 if not found
let savedVolume = localStorage.getItem("musicPlayerVolume")
  ? parseInt(localStorage.getItem("musicPlayerVolume"))
  : 100;
let previousVolume = savedVolume;

// Initialize volume slider with saved value
volumeSlider.value = savedVolume;
song.volume = savedVolume / 100;

// Function to save volume to localStorage
function saveVolumeToStorage(volume) {
  localStorage.setItem("musicPlayerVolume", volume.toString());
}

// Function to update volume slider background (same as progress bar)
function updateVolumeSliderBackground() {
  const volumePercent = (volumeSlider.value / volumeSlider.max) * 100;
  volumeSlider.style.background = `linear-gradient(to right, var(--white) ${volumePercent}%, grey ${volumePercent}%)`;
}

// Function to update volume icon based on volume level
function updateVolumeIcon() {
  volumeIcon.className = "";
  if (song.volume >= 0.5) {
    volumeIcon.className = "fa-solid fa-volume-high";
  } else if (song.volume > 0 && song.volume < 0.5) {
    volumeIcon.className = "fa-solid fa-volume-low";
  } else {
    volumeIcon.className = "fa-solid fa-volume-xmark";
  }
}

// Initialize volume slider styling and icon on page load
updateVolumeSliderBackground();
updateVolumeIcon();

// Volume slider event listener with enhanced styling and persistence
volumeSlider.addEventListener("input", function () {
  song.volume = this.value / 100;
  savedVolume = this.value;

  // Save to localStorage
  saveVolumeToStorage(savedVolume);

  updateVolumeIcon();
  updateVolumeSliderBackground();
  showVolumeSlider();
});

// Volume icon click functionality (mute/unmute) with persistence
volumeIcon.addEventListener("click", function () {
  if (song.volume > 0) {
    // Store current volume before muting
    previousVolume = volumeSlider.value;
    localStorage.setItem(
      "musicPlayerPreviousVolume",
      previousVolume.toString()
    );

    // Mute
    song.volume = 0;
    volumeSlider.value = 0;
    savedVolume = 0;
    saveVolumeToStorage(0);
  } else {
    // Restore previous volume or use saved previous volume
    const storedPreviousVolume = localStorage.getItem(
      "musicPlayerPreviousVolume"
    );
    if (storedPreviousVolume) {
      previousVolume = parseInt(storedPreviousVolume);
    }

    song.volume = previousVolume / 100;
    volumeSlider.value = previousVolume;
    savedVolume = previousVolume;
    saveVolumeToStorage(savedVolume);
  }

  updateVolumeIcon();
  updateVolumeSliderBackground();
  showVolumeSlider();
});

// Show volume slider on hover
volumeContainer.addEventListener("mouseenter", function () {
  showVolumeSlider();
});

// Load volume settings on page load
window.addEventListener("load", function () {
  // Load saved volume and previous volume from localStorage
  const storedVolume = localStorage.getItem("musicPlayerVolume");
  const storedPreviousVolume = localStorage.getItem(
    "musicPlayerPreviousVolume"
  );

  if (storedVolume !== null) {
    savedVolume = parseInt(storedVolume);
    volumeSlider.value = savedVolume;
    song.volume = savedVolume / 100;
  }

  if (storedPreviousVolume !== null) {
    previousVolume = parseInt(storedPreviousVolume);
  }

  // Update UI to reflect loaded values
  updateVolumeSliderBackground();
  updateVolumeIcon();
});

// Optional: Add keyboard shortcuts for volume control
document.addEventListener("keydown", function (event) {
  // Only trigger if user is not typing in an input field
  if (
    document.activeElement.tagName !== "INPUT" &&
    document.activeElement.tagName !== "TEXTAREA" &&
    !document.activeElement.isContentEditable
  ) {
    // Volume up with Up arrow or + key
    if (event.key === "ArrowUp" || event.key === "+") {
      event.preventDefault();
      const newVolume = Math.min(100, parseInt(volumeSlider.value) + 5);
      volumeSlider.value = newVolume;
      song.volume = newVolume / 100;
      savedVolume = newVolume;
      saveVolumeToStorage(savedVolume);
      updateVolumeIcon();
      updateVolumeSliderBackground();
      showVolumeSlider();
    }

    // Volume down with Down arrow or - key
    if (event.key === "ArrowDown" || event.key === "-") {
      event.preventDefault();
      const newVolume = Math.max(0, parseInt(volumeSlider.value) - 5);
      volumeSlider.value = newVolume;
      song.volume = newVolume / 100;
      savedVolume = newVolume;
      saveVolumeToStorage(savedVolume);
      updateVolumeIcon();
      updateVolumeSliderBackground();
      showVolumeSlider();
    }

    // Mute/unmute with M key
    if (event.key === "m" || event.key === "M") {
      event.preventDefault();
      volumeIcon.click(); // Trigger the existing mute/unmute functionality
    }
  }
});

/**************************SONG_TILE*****************************/
const songs = [
  {
    name: "Qatal",
    singers: "Guru Randhawa, Sanjoy, Gill Machhrai",
    thumbnail: "images/songs/qatal.jpeg",
    src: "songs/qatal.mp3",
  },
  {
    name: "Courtside",
    singers: "Karan Aujla, Signature By SB",
    thumbnail: "images/songs/courtside.jpeg",
    src: "songs/courtside.mp3",
  },
  {
    name: 'Minnavala (From "Narivetta")',
    singers: "Jakes Bejoy, Sid Sriram, Sithara Krishnakumar",
    thumbnail: "images/songs/minnavala.jpeg",
    src: "songs/minnavala.mp3",
  },
  {
    name: "STFU",
    singers: "AP Dhillon, Shinda Kahlon",
    thumbnail: "images/songs/STFU.jpeg",
    src: "songs/stfu.mp3",
  },
  {
    name: "Shaky",
    singers: "Sanju Rathod, G-SPXRK",
    thumbnail: "images/songs/shaky.jpeg",
    src: "songs/shaky.mp3",
  },
  {
    name: "Jhol - Acoustic",
    singers: "Maanu, Annural Khalid, Abdullah Siddiqui",
    thumbnail: "images/songs/jhol.jpeg",
    src: "songs/jhol.mp3",
  },
  {
    name: "Pretty Little Baby - Stereo Mix",
    singers: "Connie Francis",
    thumbnail: "images/songs/prettlylittlebaby.jpeg",
    src: "songs/prettylittlebaby.mp3",
  },
  {
    name: "Nothing to Prove",
    singers: "KR$NA, Phenom",
    thumbnail: "images/songs/nothingtoprove.jpeg",
    src: "songs/nothingtoprove.mp3",
  },
  {
    name: "Jaat Intro",
    singers: "Ajay Bhagta, Manisha Sharma, Kb Dhull",
    thumbnail: "images/songs/jaatintro.jpeg",
    src: "songs/jaatintro.mp3",
  },
  {
    name: "Vibe (Feat. Shanaya Kapoor)",
    singers: "Guru Randhawa, French Montana, JSL Singh",
    thumbnail: "images/songs/vibe.jpeg",
    src: "songs/vibe.mp3",
  },
];

const artists = [
  { name: "Pritam", img: "images/artists/pritam.jpeg" },
  { name: "Arijit Singh", img: "images/artists/arijit.jpeg" },
  { name: "A.R. Rahman", img: "images/artists/rahman.jpeg" },
  { name: "Sachin-Jigar", img: "images/artists/sachinjigar.jpeg" },
  { name: "Vishal-Shekhar", img: "images/artists/vishalshekhar.jpeg" },
  { name: "Atif Aslam", img: "images/artists/atif.jpeg" },
  { name: "Anirudh Ravichandran", img: "images/artists/anirudh.jpeg" },
  { name: "Udit Narayan", img: "images/artists/uditnarayan.jpeg" },
  { name: "Yo Yo Honey Singh", img: "images/artists/honeysingh.jpeg" },
  { name: "Amit Trivedi", img: "images/artists/amit.jpeg" },
];

const albums = [
  {
    name: "Aashiqui 2",
    singers: "Mithoon, Ankit Tiwari, Jeet Ganguli",
    img: "images/Popularalbums/aashiqui2.jpeg",
    src: "songs/aashiqui2.mp3",
  },
  {
    name: "Yeh Jawaani Hai Deewani",
    singers: "Pritam",
    img: "images/Popularalbums/yehjawani.jpeg",
    src: "songs/yjhd.mp3",
  },
  {
    name: "Sanam Teri Kasam",
    singers: "Himesh Reshamiya, Sameer Anjan, Subrat Sinha",
    img: "images/Popularalbums/sanamterikasam.jpeg",
    src: "songs/sanamterikasam.mp3",
  },
  {
    name: "Finding Her",
    singers: "AP Kushagra, Bharath, Saaheal",
    img: "images/Popularalbums/findingher.jpeg",
    src: "songs/findingher.mp3",
  },
  {
    name: "Young G.O.A.T",
    singers: "Cheema Y, Gur Sindhu",
    img: "images/Popularalbums/younggoat.jpeg",
    src: "songs/younggoat.mp3",
  },
  {
    name: "Raanjhan (From 'Do Patti')",
    singers: "Sachet-Parampara, Parampara Tandon, Kausar Munir",
    img: "images/Popularalbums/ranjhan.jpeg",
    src: "songs/ranjhan.mp3",
  },
  {
    name: "Ultimate Love Songs - Arijit Singh",
    singers: "Arijit Singh",
    img: "images/Popularalbums/ultimatelovesongs.jpeg",
    src: "songs/arijitlove.mp3",
  },
  {
    name: "Making Memories",
    singers: "Karan Aujla, Ikky",
    img: "images/Popularalbums/makingmemories.jpeg",
    src: "songs/makingmemories.mp3",
  },
  {
    name: "Glory",
    singers: "Yo Yo Honey Singh",
    img: "images/Popularalbums/glory.jpeg",
    src: "songs/glory.mp3",
  },
  {
    name: "Moosetape",
    singers: "Sidhu Moose Wala",
    img: "images/Popularalbums/moosetape.jpeg",
    src: "songs/moosetape.mp3",
  },
];

const radios = [
  {
    img: "images/radio/arijitsingh.jpeg",
    singers: "With Sachin-Jigar, Sachet Tandon, Atif Aslam",
  },
  {
    img: "images/radio/karanaujla.jpeg",
    singers: "With Shubh, AP Dhillon, DIVINE and more",
  },
  {
    img: "images/radio/diljitdosanjh.jpeg",
    singers: "With Karan Aujla, Shubh, Sidhu Moose Wala and more",
  },
  {
    img: "images/radio/kk.jpeg",
    singers: "With Pritam, Mustafa Zahid, Atif Aslam and more",
  },
  {
    img: "images/radio/shreyaghoshal.jpeg",
    singers: "With A.R. Rahman, Atif Aslam, Ajay Atul and more",
  },
  {
    img: "images/radio/arrahman.jpeg",
    singers: "With Anirudh Ravichander, Harris Jayaraj, G.V. Prakash and more",
  },
  {
    img: "images/radio/yoyo.jpeg",
    singers: "With Badshah, Guru Randhawa, Hardy Sandhu and more",
  },
  {
    img: "images/radio/kishorkumar.jpeg",
    singers: "With Mukesh, Mohammed Rafi, Hemant Kumar and more",
  },
  {
    img: "images/radio/kumarsanu.jpeg",
    singers: "With Alka Yagnik, Jatin-Lalit, Vinod Rathod and more",
  },
  {
    img: "images/radio/kumarsanu.jpeg",
    singers: "With Shubh, AP Dhillon, Jerry and more",
  },
];

const featuredCharts = [
  {
    img: "images/featured/global.png",
    desc: "Your weekly update of the most played tracks right now - Global",
  },
  {
    img: "images/featured/india.png",
    desc: "Your weekly update of the most played tracks right now - India",
  },
  {
    img: "images/featured/top50global.jpeg",
    desc: "Your daily update of the most played tracks right now - Global",
  },
  {
    img: "images/featured/top50india.jpeg",
    desc: "Your daily update of the most played tracks right now - India",
  },
  {
    img: "images/featured/viral50global.jpeg",
    desc: "Your daily update of the most viral tracks right now - Global",
  },
  {
    img: "images/featured/viral50india.jpeg",
    desc: "Your daily update of the most viral tracks right now - India",
  },
];

const indiasBest = [
  {
    img: "images/indiasbest/ipopicon.jpeg",
    desc: "Hottest tracks from your favourite I-Pop Icons. Cover- Jubin Nautiyal",
  },
  {
    img: "images/indiasbest/bollywoodcentral.jpeg",
    desc: "Bollywood Central, jab baje toh seedha dil ke centre mein lage 🫶🏼 Cover - Bhool Bhulaiyaa 3",
  },
  {
    img: "images/indiasbest/radarindia.jpeg",
    desc: "Most exciting artists from the Indian Indie scene. Cover: maahi",
  },
  {
    img: "images/indiasbest/radarpunjabi.jpeg",
    desc: "Watch out for these exciting upcoming Punjabi artists. Cover: Pavitar Lassoi",
  },
  {
    img: "images/indiasbest/rap91.jpeg",
    desc: "India's Rap Scene. Cover - KR$NA",
  },
  {
    img: "images/indiasbest/yohaiharyanvi.jpeg",
    desc: "Biggest Haryanvi hits from the last 10 years. Cover: Raju Punjabi",
  },
  {
    img: "images/indiasbest/kollywoodcream.jpeg",
    desc: "Finest collection of Tamil Music from the past 10 years Cover : Dragon",
  },
  {
    img: "images/indiasbest/tollywoodpearls.jpeg",
    desc: "The finest set of Telugu music from the past 10 years. Cover : Pushpa 2",
  },
  {
    img: "images/indiasbest/indieindia.jpeg",
    desc: "Best of the Indian Indie scene. Cover - Kushagra",
  },
  {
    img: "images/indiasbest/mollywoodgold.jpeg",
    desc: "Finest collection of Malayalam Music from the past 10 years Cover : Aavesham",
  },
];

window.addEventListener("DOMContentLoaded", () => {
  const songTilesContainer = document.querySelector(".song-tiles");

  songs.forEach((song, index) => {
    const tile = document.createElement("div");

    // Assign base class
    tile.classList.add("tile");

    // Add special tile classes
    if (index === 0) tile.classList.add("first-tile");
    if (index === songs.length - 1) tile.classList.add("last-tile");

    // Generate inner HTML
    tile.innerHTML = `
      <button class="play-btn" data-index="${index}">
        <img class="play-img" src="images/icons/play-btn.png" alt="play-btn">
      </button>
      <img loading="lazy" src="${song.thumbnail}" alt="${
      song.name
    }" class="thumbnail">
      <div class="song-name">
        <a class="song-link" href="#">${song.name}</a>
      </div>
      <div class="singers">
  ${song.singers
    .split(",")
    .map((singer, i) => `<a class="singer">${singer.trim()}</a>`)
    .join(", ")}
</div>

    `;

    songTilesContainer.appendChild(tile);
  });

  attachSongPlayEvents();
});

function attachSongPlayEvents() {
  const playButtons = document.querySelectorAll(".play-btn");
  const songElement = document.getElementById("song");

  playButtons.forEach((btn) => {
    btn.addEventListener("click", (e) => {
      const index = e.currentTarget.getAttribute("data-index");
      const selectedSong = songs[index];

      if (songElement) {
        songElement.src = selectedSong.src;
        songElement.play();
        ctrlIcon.classList.remove("fa-circle-play");
        ctrlIcon.classList.add("fa-circle-pause");

        document.querySelector(".main-footer").style.display = "none";
        document.querySelector(".main-footer-music-play").style.display =
          "grid";

        // Optional: update song info in footer
        document.querySelector(".foot-song-name").textContent =
          selectedSong.name;
        document.querySelector(".foot-singer-name").textContent =
          selectedSong.singers;
        document.querySelector(".main-footer-music-play img").src =
          selectedSong.thumbnail;
      }
    });
  });
}

function generateArtistTiles() {
  const container = document.querySelector(".artist-tiles");
  container.innerHTML = "";

  artists.forEach((artist, i) => {
    const tile = document.createElement("div");
    tile.classList.add("artist-tile");

    if (i === 0) tile.classList.add("first-tile");
    if (i === artists.length - 1) tile.classList.add("artist-last-tile");

    tile.innerHTML = `
      <button class="play-btn"><img class="play-img" src="images/icons/play-btn.png" alt="play-btn"></button>
      <img loading="lazy" src="${artist.img}" alt="" class="artist-thumbnail">
      <div class="artist-name"><a class="artist-link" href="#">${artist.name}</a></div>
      <div class="artist-word">Artist</div>
    `;

    container.appendChild(tile);
  });
}

function generateAlbumTiles() {
  const container = document.querySelector(".album-tiles");
  container.innerHTML = "";

  albums.forEach((album, i) => {
    const tile = document.createElement("div");
    tile.classList.add("tile");

    if (i === 0) tile.classList.add("first-tile");
    if (i === albums.length - 1) tile.classList.add("last-tile");

    const singerTags = album.singers
      .split(",")
      .map((singer) => `<a class="singer" href="#">${singer.trim()}</a>`)
      .join(", ");

    tile.innerHTML = `
      <button class="play-btn" data-src="${album.src}" data-name="${album.name}" data-singers="${album.singers}">
        <img class="play-img" src="images/icons/play-btn.png" alt="play-btn">
      </button>
      <img loading="lazy" src="${album.img}" alt="${album.name}" class="thumbnail">
      <div class="song-name">
        <a class="song-link" href="#">${album.name}</a>
      </div>
      <div class="singers">${singerTags}</div>
    `;

    container.appendChild(tile);
  });

  attachAlbumPlayEvents();
}

function generateRadioTiles() {
  const container = document.querySelector(".radio-tiles");
  container.innerHTML = "";

  radios.forEach((radio, i) => {
    const tile = document.createElement("div");
    tile.classList.add("tile", "radio-tile");
    if (i === 0) tile.classList.add("first-tile");
    if (i === radios.length - 1) tile.classList.add("last-tile");

    // Split singers string into anchor tags
    const singerTags = radio.singers
      .split(",")
      .map((singer) => {
        return `<a class="singer" href="#">${singer.trim()}</a>`;
      })
      .join(", ");

    tile.innerHTML = `
      <button class="play-btn">
        <img class="play-img" src="images/icons/play-btn.png" alt="play-btn">
      </button>
      <img loading="lazy" src="${radio.img}" alt="Radio Thumbnail" class="radio-thumbnail thumbnail" />
      <div class="singers radio-text">${singerTags}</div>
    `;

    container.appendChild(tile);
  });
}

function generateFeaturedTiles() {
  const container = document.querySelector(".featured-tiles");
  container.innerHTML = "";

  featuredCharts.forEach((chart, i) => {
    const tile = document.createElement("div");
    tile.classList.add("tile", "featured-tile");
    if (i === 0) tile.classList.add("first-tile");
    if (i === featuredCharts.length - 1) tile.classList.add("last-tile");

    tile.innerHTML = `
      <button class="play-btn"><img class="play-img" src="images/icons/play-btn.png" alt="play-btn"></button>
      <img loading="lazy" src="${chart.img}" class="featured-thumbnail thumbnail" />
      <div class="about-charts">${chart.desc}</div>
    `;

    container.appendChild(tile);
  });
}

function generateIndiasBestTiles() {
  const container = document.querySelector(".indiasbest-tiles");
  container.innerHTML = "";

  indiasBest.forEach((item, i) => {
    const tile = document.createElement("div");
    tile.classList.add("tile", "indiasbest-tile");
    if (i === 0) tile.classList.add("first-tile");
    if (i === indiasBest.length - 1) tile.classList.add("last-tile");

    tile.innerHTML = `
      <button class="play-btn"><img class="play-img" src="images/icons/play-btn.png" alt="play-btn"></button>
      <img loading="lazy" src="${item.img}" class="indiasbest-thumbnail thumbnail" />
      <div class="about-indiasbest">${item.desc}</div>
    `;

    container.appendChild(tile);
  });
}

function attachAlbumPlayEvents() {
  const playBtns = document.querySelectorAll(".album-tiles .play-btn");
  playBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      const src = btn.dataset.src;
      const name = btn.dataset.name;
      const singers = btn.dataset.singers;

      song.src = src;
      song.load();
      playPause(); // Start playing
      document.querySelector(".main-footer").style.display = "none";
      document.querySelector(".main-footer-music-play").style.display = "grid";

      document.querySelector(".foot-song-name").textContent = name;
      document.querySelector(".foot-singer-name").textContent = singers;
    });
  });
}

document.addEventListener("DOMContentLoaded", () => {
  generateArtistTiles();
  generateAlbumTiles();
  generateRadioTiles();
  generateFeaturedTiles();
  generateIndiasBestTiles();
});

// === Player State Management ===
let isLooping = false;
let isShuffling = false;
let currentSongIndex = 0;

let allTrendingSongs = [...songs];
let allAlbums = [...albums];

const shuffleBtn = document.getElementById("shuffle-btn");
const loopBtn = document.getElementById("loop-btn");
const nextBtn = document.getElementById("next-btn");
const prevBtn = document.getElementById("prev-btn");

function updateSongInfo(songData) {
  song.src = songData.src;
  song.play();
  ctrlIcon.classList.remove("fa-circle-play");
  ctrlIcon.classList.add("fa-circle-pause");
  document.querySelector(".foot-song-name").textContent = songData.name;
  document.querySelector(".foot-singer-name").textContent = songData.singers;
  document.querySelector(".main-footer-music-play img").src =
    songData.thumbnail || songData.img;
}

function playSongByIndex(index, list) {
  currentSongIndex = index;
  updateSongInfo(list[index]);
}

function getCurrentList() {
  return currentSongIndex >= allTrendingSongs.length
    ? allAlbums
    : allTrendingSongs;
}

function getCurrentListLength() {
  return getCurrentList().length;
}

function playNext() {
  const list = getCurrentList();
  if (isShuffling) {
    currentSongIndex = Math.floor(Math.random() * list.length);
  } else {
    currentSongIndex = (currentSongIndex + 1) % list.length;
  }
  playSongByIndex(currentSongIndex, list);
}

function playPrevious() {
  const list = getCurrentList();
  if (isShuffling) {
    currentSongIndex = Math.floor(Math.random() * list.length);
  } else {
    currentSongIndex = (currentSongIndex - 1 + list.length) % list.length;
  }
  playSongByIndex(currentSongIndex, list);
}

song.addEventListener("ended", () => {
  if (isLooping) {
    song.currentTime = 0;
    song.play();
  } else {
    playNext();
  }
});

shuffleBtn.addEventListener("click", () => {
  isShuffling = !isShuffling;
  shuffleBtn.firstElementChild.style.color = isShuffling ? "#1ed760" : "";
});

loopBtn.addEventListener("click", () => {
  isLooping = !isLooping;
  loopBtn.firstElementChild.style.color = isLooping ? "#1ed760" : "";
});

nextBtn.addEventListener("click", playNext);
prevBtn.addEventListener("click", playPrevious);

// Update song index when song is clicked from trending or album
function overrideSongClicks() {
  const allPlayBtns = document.querySelectorAll(
    ".play-btn[data-index], .play-btn[data-src]"
  );
  allPlayBtns.forEach((btn) => {
    btn.addEventListener("click", (e) => {
      e.preventDefault();
      const index = [...allPlayBtns].indexOf(btn);
      const isAlbum =
        btn.hasAttribute("data-src") && btn.hasAttribute("data-name");
      currentSongIndex = index;
      if (isAlbum) {
        updateSongInfo(albums[index]);
      } else {
        updateSongInfo(songs[index]);
      }
    });
  });
}

document.addEventListener("DOMContentLoaded", overrideSongClicks);
