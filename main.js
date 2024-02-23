
// spotify API creds
//not for git

// getToken function
const getToken = async () => {
    const response = await fetch('https://accounts.spotify.com/api/token', {
        method: 'POST',
        body: 'grant_type=client_credentials',
        headers: {
            'Authorization': 'Basic ' + btoa(client_id+':'+client_secret),
            'Content-Type': 'application/x-www-form-urlencoded'
        }
    })
    const data = await response.json()
    token = data.access_token
    return token
}


// verify that we get our token
// getToken()
getToken()
// use getToken function, to get a song
// getSong Function

const getSong = async (track) => {
    const token = await getToken();
    const response = await fetch(`https://api.spotify.com/v1/search?q=${track}&type=track`,{
        headers: {
            Authorization: 'Bearer ' + token
        }
    });

    const data = await response.json()
    const song_data = {
    preview_url: data.tracks.items[0].preview_url,
    album_cover: data.tracks.items[0].album.images[0].url,
    artist: data.tracks.items[0].artists[0].name
    }
    return song_data
}


// verify that we get the song data
getSong('ride the storm')

// clickedSong function
const form = document.querySelector('form')
const card = document.querySelector('#card')
form.addEventListener('submit', async (event) =>{
    event.preventDefault()
    const track = form[0].value.toLowerCase()
    const song_data = await getSong(track)
    playSong(song_data.preview_url)
    console.log(song_data.album_cover)
    card.innerHTML = `
    <div class="my-card">
    <img src=${song_data.album_cover}>
    <div class="content-box">
        <div class="song-info">
            <h1>${song_data.artist}</h1>
            <h3>Yeeeeeeeeerr</h3>
        </div>
        <button id="pause" onClick='pauseSong()'>Pause</button>
    </div>
</div>
    `
})


// handles playing the audio
let audio
const playSong = (song_url) =>{
    if (audio) {
        audio.pause()
    }
    audio = new Audio(song_url)
    audio.play()
    pause = false
}


// handles pausing the audio
let pause = false
const pauseSong = () => {
    const button = document.querySelector('#pause')
    if (!pause) {
        audio.pause()
        pause = true
        button.innerText = 'Play'
    } else {
        audio.play()
        pause = false
        button.innerText = 'Pause'
    }

}