console.log("Welcome to Spotify");

// Initialize the Variables
let songIndex = 0;
let audioElement = new Audio('songs/Adele+Set+Fire+To+The+Rain+LYRICS.mp3');
let masterPlay = document.getElementById('masterPlay');
let myProgressBar = document.getElementById('myProgressBar');
let gif = document.getElementById('gif');
let masterSongName = document.getElementById('masterSongName');
let songItems = Array.from(document.getElementsByClassName('songItem'));

let songs = [
    
    {songName: "Set fire to the rains", filePath: "songs/Adele+Set+Fire+To+The+Rain+LYRICS.mp3", coverPath: "covers/1.jpg"},
    {songName: "Demon Slayer", filePath: "songs/Gurenge (osanime.com).mp3", coverPath: "covers/2.jpg"},
    {songName: "Heat Waves", filePath: "songs/Heat-Waves(PagalWorldl).mp3", coverPath: "covers/3.jpg"},
    {songName: "Kesariya", filePath: "songs/Kesariya(PagalWorld.com.se).mp3", coverPath: "covers/4.jpg"},
    {songName: "Life Goes on", filePath: "songs/Life Goes On-(HindiMp3s.In).mp3", coverPath: "covers/5.jpg"},
    {songName: "middle of the night", filePath: "songs/Middle-Of-The-Night(PagalWorldl).mp3", coverPath: "covers/6.jpg"},
    {songName: "radhe-radhe", filePath: "songs/Radhe Radhe(PagalWorld.com.se).mp3", coverPath: "covers/7.jpg"},
    {songName: "sab tera mahadev", filePath: "songs/Sab Tera Mahadev(PagalWorld.com.se).mp3", coverPath: "covers/8.jpg"},
    {songName: "silent solitude", filePath: "songs/Silent Solitude (osanime.com).mp3", coverPath: "covers/9.jpg"},
    {songName: "voracity", filePath: "songs/4.mp3", coverPath: "covers/10.jpg"},
]

songItems.forEach((element, i)=>{ 
    element.getElementsByTagName("img")[0].src = songs[i].coverPath; 
    element.getElementsByClassName("songName")[0].innerText = songs[i].songName; 
})

// Updating audio source based on user selection
Array.from(document.getElementsByClassName('songItemPlay')).forEach((element)=>{
    element.addEventListener('click', (e)=>{ 
        makeAllPlays();
        songIndex = parseInt(e.target.id);
        e.target.classList.remove('fa-play-circle');
        e.target.classList.add('fa-pause-circle');
        audioElement.src = songs[songIndex].filePath; 
        console.log("songs[songIndex].filePath: ", songs[songIndex].filePath)
        console.log("audioElement.src: ", audioElement.src)
        masterSongName.innerText = songs[songIndex].songName;
        audioElement.currentTime = 0;
        audioElement.play();
        console.log("audioElement: ",audioElement)
        gif.style.opacity = 1;
        masterPlay.classList.remove('fa-play-circle');
        masterPlay.classList.add('fa-pause-circle');
    })
})
 
console.log(songs);

// Handle play/pause click
masterPlay.addEventListener('click', ()=>{
    if(audioElement.paused || audioElement.currentTime<=0){
        audioElement.play();
        masterPlay.classList.remove('fa-play-circle');
        masterPlay.classList.add('fa-pause-circle');
        gif.style.opacity = 1;
    }
    else{
        audioElement.pause();
        masterPlay.classList.remove('fa-pause-circle');
        masterPlay.classList.add('fa-play-circle');
        gif.style.opacity = 0;
    }
})
audioElement.addEventListener('canplay', () => {
    audioElement.play();
});
// Listen to Events
audioElement.addEventListener('timeupdate', ()=>{ 
    // Update Seekbar
    progress = parseInt((audioElement.currentTime/audioElement.duration)* 100); 
    myProgressBar.value = progress;
})

myProgressBar.addEventListener('change', ()=>{
    audioElement.currentTime = myProgressBar.value * audioElement.duration/100;
})

const makeAllPlays = ()=>{
    Array.from(document.getElementsByClassName('songItemPlay')).forEach((element)=>{
        element.classList.remove('fa-pause-circle');
        element.classList.add('fa-play-circle');
    })
}

Array.from(document.getElementsByClassName('songItemPlay')).forEach((element)=>{
    element.addEventListener('click', (e)=>{ 
        makeAllPlays();
        songIndex = parseInt(e.target.id);
        e.target.classList.remove('fa-play-circle');
        e.target.classList.add('fa-pause-circle');
        audioElement.src = songs[songIndex].filePath; 
        masterSongName.innerText = songs[songIndex].songName;
        audioElement.currentTime = 0;
        audioElement.play();
        gif.style.opacity = 1;
        masterPlay.classList.remove('fa-play-circle');
        masterPlay.classList.add('fa-pause-circle');
    })
})

// Update previous and next functions
document.getElementById('next').addEventListener('click', ()=>{
    songIndex = (songIndex + 1) % songs.length; // Circular index increment
    // Update the source and song name based on the selected index
    audioElement.src = songs[songIndex].filePath;
    masterSongName.innerText = songs[songIndex].songName;
    audioElement.currentTime = 0;
    audioElement.play();
    masterPlay.classList.remove('fa-play-circle');
    masterPlay.classList.add('fa-pause-circle');
})

document.getElementById('previous').addEventListener('click', ()=>{
    songIndex = (songIndex - 1 + songs.length) % songs.length; // Circular index decrement
    // Update the source and song name based on the selected index
    audioElement.src = songs[songIndex].filePath;
    masterSongName.innerText = songs[songIndex].songName;
    audioElement.currentTime = 0;
    audioElement.play();
    masterPlay.classList.remove('fa-play-circle');
    masterPlay.classList.add('fa-pause-circle');
})