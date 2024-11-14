function msToTime(duration) {
    const seconds = parseInt((duration / 1000) % 60);
    const minutes = parseInt((duration / (1000 * 60)) % 60);
    return `${minutes < 10 ? "0" : ""}${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
}

document.addEventListener("DOMContentLoaded", function() {
    let currentProgress = 0;
    let duration = 0;
    let timerInterval;
    let statusCheckInterval;

    document.getElementById("sync").addEventListener("click", async function() {
        await fetchCurrentlyPlaying();
    });

    async function fetchCurrentlyPlaying() {
        try {
            const response = await fetch('/spotify');
            if (!response.ok) throw new Error('Failed to fetch currently playing track');
            const data = await response.json();

            if (data && Object.keys(data).length > 0) {
                currentProgress = data.progress_ms;
                duration = data.item.duration_ms;

                const albumArtUrl = data.item.album.images.length > 0 ? data.item.album.images[0].url : 'default-image-url.jpg';


                document.getElementById('spotify').innerHTML = `
                    Track: ${data.item.name} <br>
                    Artist: ${data.item.artists.map(artist => artist.name).join(', ')} <br>
                    <span id="progress">${msToTime(currentProgress)}</span> / ${msToTime(duration)} <br>
                    Link: <a href="${data.item.external_urls.spotify}" target="_blank">
                          <img src="${albumArtUrl}" alt="Album Art" style="width: 100px;"></a>
                    ${data.is_playing ? '<br>Playing' : '<br>Paused'}
                `;

                clearInterval(timerInterval);
                clearInterval(statusCheckInterval);

                // If playing, start the one-second progress timer
                if (data.is_playing) {
                    startProgressTimer();
                }

                // Start 15-second status check timer
                startStatusCheckTimer();
            } else {
                document.getElementById('spotify').innerHTML = 'No track is currently playing.';
                clearInterval(timerInterval);
                clearInterval(statusCheckInterval);
            }
        } catch (error) {
            console.error('Error fetching Spotify data or not logged:', error);
            document.getElementById('spotify').innerHTML = 'Error fetching Spotify data/Not token in cookies, please log in.';
            clearInterval(timerInterval);
            clearInterval(statusCheckInterval);
        }
    }

    function startProgressTimer() {
        timerInterval = setInterval(() => {
            if (currentProgress < duration) {
                currentProgress += 1000;
                document.getElementById('progress').textContent = msToTime(currentProgress);
            } else {
                clearInterval(timerInterval);
            }
        }, 1000);
    }

    function startStatusCheckTimer() {
        statusCheckInterval = setInterval(async() => {
            await fetchCurrentlyPlaying(); // Re-fetch data every 15 seconds
        }, 15000);
        console.log('15s from now on');
    }

    // Initial fetch
    fetchCurrentlyPlaying();
});