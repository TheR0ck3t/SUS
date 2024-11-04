document.addEventListener("DOMContentLoaded", function() {
    fetch('/spotify')
        .then(response => response.json())
        .then(data => {
            if (data && Object.keys(data).length > 0) {
                // Format the Spotify data nicely
                document.getElementById('spotify').innerHTML = `
                    <strong>Currently Playing:</strong><br>
                    Track: ${data.item.name} <br>
                    Artist: ${data.item.artists.map(artist => artist.name).join(', ')} <br>
                    Album: ${data.item.album.name} <br>
                    <img src="${data.item.album.images[0].url}" alt="Album Art" style="width: 100px;">
                `;
            } else {
                document.getElementById('spotify').innerHTML = 'No track is currently playing.';
            }
        })
        .catch(error => {
            console.error('Error fetching Spotify data:', error);
            document.getElementById('spotify').innerHTML = 'Error fetching Spotify data.';
        });
});