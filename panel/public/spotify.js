function msToTime(duration) {
    var seconds = parseInt((duration / 1000) % 60),
        minutes = parseInt((duration / (1000 * 60)) % 60),
        minutes = (minutes < 10) ? "0" + minutes : minutes;
    seconds = (seconds < 10) ? "0" + seconds : seconds;
    return minutes + ":" + seconds;
}

document.addEventListener("DOMContentLoaded", function() {
    let currentProgress = 0;
    let duration = 0;
    let timerInterval;
    async function fetchCurrentlyPlaying() {
        try {
            const response = await fetch('/spotify');
            if (!response.ok) {
                throw new Error('Failed to fetch currently playing track');
            }
            const data = await response.json();

            if (data && Object.keys(data).length > 0) {
                currentProgress = data.progress_ms;
                duration = data.item.duration_ms;
                // Format the Spotify data nicely
                document.getElementById('spotify').innerHTML = `
                    Track: ${data.item.name} <br>
                    Artist: ${data.item.artists.map(artist => artist.name).join(', ')} <br>
                    <span id="progress">${msToTime(currentProgress)}</span> / ${msToTime(duration)} <br>
                    Link: <a href="${data.item.external_urls.spotify}" target="_blank"><img src="${data.item.album.images[0].url}" alt="Album Art" style="width: 100px;"></a>
                    ${data.is_playing ? '<br>Playing' : '<br>Paused'}
                `;
                clearInterval(timerInterval);
                if (data.is_playing === true) { timerInterval = setInterval(updateProgress, 1000); } else { clearInterval(timerInterval); }
            } else {
                document.getElementById('spotify').innerHTML = 'No track is currently playing.';
                clearInterval(timerInterval);
            }
        } catch (error) {
            console.error('Error fetching Spotify data:', error);
            document.getElementById('spotify').innerHTML = 'Error fetching Spotify data.';
            clearInterval(timerInterval);
        }
    }

    function updateProgress() {
        if (currentProgress < duration) {
            currentProgress += 1000; // Increment by 1 second
            document.getElementById('progress').textContent = msToTime(currentProgress);
        } else {
            clearInterval(timerInterval); // Stop updating when the track ends
        }
    }

    // Poll every 30 seconds
    setInterval(fetchCurrentlyPlaying, 10000);

    // Initial fetch
    fetchCurrentlyPlaying();
});