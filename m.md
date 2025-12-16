function convertSeconds(seconds) {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  const formattedSeconds = remainingSeconds.toFixed(0).padStart(2, '0'); // Ensures two-digit format
  return `${minutes}:${formattedSeconds}`;
}


console.log('Lets write JavaScript');
let currentsong=new Audio();



let songs = [];
async function getSongs() {
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
const playmusic=(track)=>{
  currentsong.src=`${track}`
  currentsong.play()
  play.src="pause.svg"
  document.querySelector(".songinfo").innerHTML=track.split("/songs/")[1].replaceAll("%20", " ");
 
 
}

async function main(){
  let songs = await getSongs();
  console.log(songs);


  const f=Array.from(document.querySelector(".cardcontainer").getElementsByClassName("card"));
  let i=0;
  f.forEach(e=>{

      e.insertAdjacentHTML("afterbegin", `
                          <div class="info">
                              <div class="songin">${songs[i]}</div>
                              
                          </div>`);
      i++;
    })
  
  const t = Array.from(document.querySelector(".cardcontainer").getElementsByClassName("card"));

  t.forEach(e => {
    e.addEventListener("click", () =>{
      
      playmusic(e.querySelector(".info").firstElementChild.innerHTML);
    });  
  })
  play.addEventListener("click",()=>{
    if(currentsong.paused){
      currentsong.play();
      play.src="pause.svg"
    }
    else{
      currentsong.pause();
      play.src="playbutton.svg"
    }
  })
  
  currentsong.addEventListener("timeupdate",()=>{
     document.querySelector(".songtime").innerHTML=`${convertSeconds(currentsong.currentTime) + "/" + convertSeconds(currentsong.duration)}`
     if(window.innerWidth>=1400){
      document.querySelector(".circle").style.left=25 + (currentsong.currentTime)/(currentsong.duration)*100+"%"

     }
     else if(window.innerWidth<1400){
      document.querySelector(".circle").style.left=-0.9 + (currentsong.currentTime)/(currentsong.duration)*100+"%"
     }  
  })
}
main();
document.querySelector(".hamberger").addEventListener("click",()=>{
  document.querySelector(".left").style.left="0%";

})
document.querySelector(".cross").addEventListener("click",()=>{
  document.querySelector(".left").style.left="-100%";

})
const k =(document.querySelector(".songlist").getElementsByTagName("li"))

document.querySelector(".previous").addEventListener("click",()=>{
  const g=songs[songs.indexOf(currentsong.src)-1]
  playmusic(g)
  
  
})
document.querySelector(".next").addEventListener("click",()=>{
  // console.log(currentsong.src)
  const g=songs[songs.indexOf(currentsong.src)+1]
  playmusic(g)
  

})