
const searchSongs = () => {
    const searchText = document.getElementById('search-field');
    const inputValue = searchText.value ;
    const url =` https://api.lyrics.ovh/suggest/${inputValue}`
    fetch(url)
    .then(res => res.json())
    .then(data => {
        const dataMain = data.data;
        SongDetails(dataMain);
    })
    .catch(error => displayError('SORRY! Something want wrong, Please try again later..THANK YOU')) 
    searchText.value = ''; 
}
 
const SongDetails = songData => {
   const songContainDiv = document.getElementById('song-contain');
   songContainDiv.innerHTML = '';
   songData.forEach(song => {
    const songDiv = document.createElement('div');
    songDiv.innerHTML = `
    <div class="single-result row align-items-center my-3 p-3">
        <div class="col-md-9">
            <h3 class="lyrics-name">${song.title}</h3>
            <p class="author lead">Album by <span>${song.artist.name}</span></p>
            <audio controls src="${song.preview}"></audio>
        </div>
        <div class="col-md-3 text-md-right text-center">
            <button onclick="songLyrics('${song.artist.name}','${song.title}')" class="btn btn-success">Get Lyrics</button>
        </div>
    </div>`
    songContainDiv.appendChild(songDiv);
})
}

const songLyrics = (artist, title) => {
      
    const url = `https://api.lyrics.ovh/v1/${artist}/${title}`
    fetch(url)
    .then(res => res.json())
    .then(data => showLyrics(data.lyrics))
    

const showLyrics = lyrics => {
    const lyricsDiv = document.getElementById('show-lyrics')
    lyricsDiv.innerText = lyrics;
    
}

const displayError = error =>{
    const errorDiv = document.getElementById('show-error');
    errorDiv.innerText = error
}