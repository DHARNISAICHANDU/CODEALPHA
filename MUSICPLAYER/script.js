const SONG_LIST = [
    {
      songName: "SYML - Mr Sandman",
      music: "music/sandman.m4a",
      album: "img/mrsandman.jpg",
      background: "img/sky4.jpg",
    },
    {
      songName: "Brand X Music - Into The Light",
      music: "music/light.m4a",
      album: "img/intothelight.jpg",
      background: "img/sky2.jpg",
    },
    {
      songName: "NF - Hate Myself",
      music: "music/nf.m4a",
      album: "img/nf.jpg",
      background: "img/black4.jpg",
    },
    {
      songName: "Secession Studios - Past in Flames",
      music: "music/flames.m4a",
      album: "img/flames.jpg",
      background: "img/flames2.jpg",
    },
    {
      songName: "Tom Odell - Another Love",
      music: "music/another.mp3",
      album: "img/another.jpg",
      background: "img/love2.jpg",
    },
    {
      songName: "Badfinger - Baby Blue",
      music: "music/blue.m4a",
      album: "img/babyblue.jpg",
      background: "img/blue5.jpg",
    },
    {
      songName: "Eminem - Lose Yourself",
      music: "music/eminem.m4a",
      album: "img/eminem-album.jpg",
      background: "img/lose5.jpg",
    },
  ];
  
  let updateTrack;
  let isMixBtnClick = false,
    isRepeatBtnClick = false;
  let arrayCount = 0;
  
  const changeWarningText = document.getElementById("change-warning");
  const volumeSlider = document.getElementById("volume-slider");
  const trackSlider = document.getElementById("track-slider");
  const music = document.getElementById("music");
  const albumImg = document.getElementById("album-img");
  const currentSongName = document.getElementById("current-song-name");
  const backgroundImg = document.getElementById("container");
  const play = document.getElementById("play");
  const rightBtn = document.getElementById("right");
  const leftBtn = document.getElementById("left");
  const mixBtn = document.getElementById("mix");
  const repeatBtn = document.getElementById("repeat");
  const menuIcon = document.getElementById("menu-icon");
  const menuCancelIcon = document.getElementById("cancel-icon");
  const menu = document.querySelector("nav");
  const allSongsParent = document.getElementById("all-songs");
  const allSongContainer = document.getElementById("all-songs-container");
  const addBtn = document.getElementById("add-song-btn");
  const newSongContainer = document.getElementById("new-song-container");
  const file = document.getElementById("file-picker");
  
  // Event listeners
  rightBtn.addEventListener("click", changeSong);
  leftBtn.addEventListener("click", changeSong);
  play.addEventListener("click", audioPlay);
  volumeSlider.addEventListener("change", changeVolume);
  trackSlider.addEventListener("change", changeTrack);
  music.addEventListener("ended", autoSongChange);
  mixBtn.addEventListener("click", mixModeActive);
  repeatBtn.addEventListener("click", repeatModeActive);
  menuIcon.addEventListener("click", openMenu);
  menuCancelIcon.addEventListener("click", cancelMenu);
  allSongContainer.addEventListener("click", showAllSongList);
  addBtn.addEventListener("click", newSongPage);
  file.addEventListener("change", addNewSong, false);
  
  // Functions
  function changeSong(e) {
    let way = e.target;
    swapBtn(way);
    changeSwapStyle();
    playState();
    mixSongs();
    console.log(arrayCount);
  }
  
  function swapBtn(way) {
    if (way === rightBtn) {
      arrayCount++;
    } else if (way === leftBtn) {
      arrayCount--;
    }
    disableSwap();
  }
  
  function disableSwap() {
    if (arrayCount >= SONG_LIST.length) {
      arrayCount = 0;
    } else if (arrayCount < 0) {
      arrayCount = SONG_LIST.length - 1;
    }
  }
  
  function playState() {
    if (play.textContent === "❚ ❚") {
      music.play();
    }
  }
  
  function mixSongs() {
    if (isMixBtnClick) {
      arrayCount = Math.floor(Math.random() * SONG_LIST.length);
    }
  }
  
  function changeSwapStyle() {
    albumImg.style.background = `url(${SONG_LIST[arrayCount].album}) no-repeat center center`;
    albumImg.style.backgroundSize = "cover";
    backgroundImg.style.background = `url(${SONG_LIST[arrayCount].background}) no-repeat center center`;
    backgroundImg.style.backgroundSize = "cover";
    currentSongName.innerHTML = `${SONG_LIST[arrayCount].songName}`;
    music.src = `${SONG_LIST[arrayCount].music}`; // Update the audio source
  }
  
  function audioPlay() {
    const icon = music.paused ? "❚ ❚" : "►";
    play.textContent = icon;
    music.paused ? music.play() : music.pause();
    updateTrack = setInterval(seekUpdate, 1000);
  }
  
  function changeVolume() {
    music.volume = volumeSlider.value / 100;
  }
  
  function changeTrack() {
    let time = music.duration * (trackSlider.value / 100);
    music.currentTime = time;
  }
  
  function seekUpdate() {
    let seekPosition = 0;
    if (!isNaN(music.duration)) {
      seekPosition = music.currentTime * (100 / music.duration);
      trackSlider.value = seekPosition;
    }
  }
  
  function autoSongChange() {
    if (isRepeatBtnClick) {
      music.currentTime = 0;
      music.play();
    } else {
      mixModeSongChange();
      changeSwapStyle();
      playState();
    }
  }
  
  function mixModeSongChange() {
    if (isMixBtnClick) {
      mixSongs();
    } else {
      arrayCount++;
    }
    if (arrayCount >= SONG_LIST.length) {
      arrayCount = 0;
    }
    changeSwapStyle();
    playState();
  }
  
  function mixModeActive() {
    isMixBtnClick = !isMixBtnClick;
    mixBtn.style.transform = isMixBtnClick ? "scale(1.3)" : "scale(1)";
    changeWarning(isMixBtnClick ? "Mix all" : "");
  }
  
  function repeatModeActive() {
    isRepeatBtnClick = !isRepeatBtnClick;
    repeatBtn.style.transform = isRepeatBtnClick ? "scale(1.3)" : "scale(1)";
    changeWarning(isRepeatBtnClick ? "Repeat" : "");
  }
  
  function changeWarning(text) {
    changeWarningText.innerText = text;
  }
  
  // Menu
  function openMenu() {
    menu.style.left = "0";
  }
  
  function cancelMenu() {
    menu.style.left = "-20rem";
  }
  
  function styleChange(element) {
    element.style.display = element.style.display === "block" ? "none" : "block";
  }
  
  // All song list
  function getAllSongList() {
    for (let i = 0; i < SONG_LIST.length; i++) {
      let li = document.createElement("li");
      li.innerHTML = SONG_LIST[i].songName;
      li.classList.add("allSongsListElements");
      li.addEventListener("click", () => {
        arrayCount = i;
        changeSwapStyle();
        playState();
      });
      allSongsParent.appendChild(li);
    }
  }
  
  function showAllSongList() {
    styleChange(allSongsParent);
  }
  
  // Add new song (only work locally)
  function local() {
    let newSongJson = localStorage.getItem("addedSongs");
    if (newSongJson) {
      let newSong = JSON.parse(newSongJson);
      SONG_LIST.push(newSong);
    }
  }
  
  function newSongPage() {
    styleChange(newSongContainer);
  }
  
  function addNewSong() {
    for (let i = 0; i < this.files.length; i++) {
      const newAudio = URL.createObjectURL(this.files[i]);
      const newSongObj = {
        music: newAudio,
        songName: this.files[i].name.replace(/\.[^/.]+$/, ""),
        background: "img/sample.jpg",
        album: "img/album-sample.jpg",
      };
      SONG_LIST.push(newSongObj);
      localStorage.setItem("addedSongs", JSON.stringify(newSongObj));
    }
  }
  
  // Initialize
  window.addEventListener("DOMContentLoaded", () => {
    getAllSongList(); // Load the song list
    changeSwapStyle(); // Set the initial song
  });