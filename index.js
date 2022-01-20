function searchLyrics(artist, song) {
    return fetch(`https://api.lyrics.ovh/v1/${artist}/${song}`)
        .then(res => res.json())
        .then(data => data.lyrics)
        .catch(err => console.log(err));
}

document.querySelector('#submit').addEventListener('click', async () => {
    const artist = document.querySelector('#artist').value;
    const song = document.querySelector('#song').value;
    
    let lyrics = await searchLyrics(artist, song);
    document.querySelector('#res').innerHTML += lyrics + '<br>';

    // quando o usuario colocar outra musica, ele limpa a musica que tava antes
    document.querySelector('#res').innerHTML = '';

    if (lyrics === undefined) {
        document.querySelector('#res').innerHTML = 'Não encontrado';
    } else {
        document.querySelector('#res').innerHTML = lyrics;
    }

    // quando o usuario clicar na musica, ele copia para o clipboard
    document.querySelector('#res').addEventListener('click', () => {
        navigator.clipboard.writeText(lyrics).then(() => {
            alert('Copiado para o clipboard');
        });
    });
});