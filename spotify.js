console.log('Lets write JavaScript');

function convertSeconds(seconds) {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  const formattedSeconds = remainingSeconds.toFixed(0).padStart(2, '0');
  return `${minutes}:${formattedSeconds}`;
}

let currentsong = new Audio();
let songs = [];

async function getSongs() {
  // Instead of trying to fetch multiple URLs at once, we'll define our songs array directly
  // since we already know the URLs we want to use
  songs = [
    "https://sarthakgupta124.github.io/spotify_clone/songs/128-410%20-%20Sidhu%20Moose%20Wala%20128%20Kbps.mp3",
    "https://sarthakgupta124.github.io/spotify_clone/songs/128-GOAT%20-%20GOAT%20128%20Kbps.mp3",
    "https://sarthakgupta124.github.io/spotify_clone/songs/128-The%20Last%20Ride%20-%20Sidhu%20Moose%20Wala%20128%20Kbps.mp3",
    "https://sarthakgupta124.github.io/spotify_clone/songs/1Karan%20Aujla.mp3",
    "https://sarthakgupta124.github.io/spotify_clone/songs/295.mp3",
    "https://sarthakgupta124.github.io/spotify_clone/songs/52Bars.mp3",
    "https://sarthakgupta124.github.io/spotify_clone/songs/9_45-(Mr-Jat.in).mp3",
    "https://sarthakgupta124.github.io/spotify_clone/songs/Challa.mp3",
    "https://sarthakgupta124.github.io/spotify_clone/songs/Nain%20Tere(KoshalWorld.Com).mp3",
    "https://sarthakgupta124.github.io/spotify_clone/songs/Pta%20Mainu.mp3",
    "https://sarthakgupta124.github.io/spotify_clone/songs/Tauba%20Tauba%20.mp3",
    "https://sarthakgupta124.github.io/spotify_clone/songs/Wavy.mp3"
  ];
  
  return songs;
}

const playmusic = (track) => {
  currentsong.src = track;
  currentsong.play();
  play.src = "pause.svg";
  document.querySelector(".songinfo").innerHTML = decodeURIComponent(track.split("/songs/")[1]);
}

async function main() {
  let songs = await getSongs();
  console.log(songs);

  const cards = Array.from(document.querySelector(".cardcontainer").getElementsByClassName("card"));
  
  songs.forEach((song, index) => {
    if (cards[index]) {
      cards[index].insertAdjacentHTML("afterbegin", `
        <div class="info">
          <div class="songin">${song}</div>
        </div>`);
    }
  });

  const cardElements = Array.from(document.querySelector(".cardcontainer").getElementsByClassName("card"));
  cardElements.forEach((card, index) => {
    card.addEventListener("click", () => {
      playmusic(songs[index]);
    });
  });

  play.addEventListener("click", () => {
    if (currentsong.paused) {
      currentsong.play();
      play.src = "pause.svg";
    } else {
      currentsong.pause();
      play.src = "playbutton.svg";
    }
  });

  currentsong.addEventListener("timeupdate", () => {
    document.querySelector(".songtime").innerHTML = 
      `${convertSeconds(currentsong.currentTime)}/${convertSeconds(currentsong.duration)}`;
    
    const progressPercentage = (currentsong.currentTime / currentsong.duration) * 100;
    if (window.innerWidth >= 1400) {
      document.querySelector(".circle").style.left = `${25 + progressPercentage}%`;
    } else {
      document.querySelector(".circle").style.left = `${-0.9 + progressPercentage}%`;
    }
  });
}

main();

document.querySelector(".hamberger").addEventListener("click", () => {
  document.querySelector(".left").style.left = "0%";
});

document.querySelector(".cross").addEventListener("click", () => {
  document.querySelector(".left").style.left = "-100%";
});

document.querySelector(".previous").addEventListener("click", () => {
  const currentIndex = songs.indexOf(currentsong.src);
  const prevIndex = currentIndex > 0 ? currentIndex - 1 : songs.length - 1;
  playmusic(songs[prevIndex]);
});

document.querySelector(".next").addEventListener("click", () => {
  const currentIndex = songs.indexOf(currentsong.src);
  const nextIndex = currentIndex < songs.length - 1 ? currentIndex + 1 : 0;
  playmusic(songs[nextIndex]);
});
