document.getElementById('meowForm').addEventListener('submit', async function(event) {
    event.preventDefault(); // Prevents form submission redirect

    const meowValue = document.getElementById('meowInput').value;

    try {
        const response = await fetch('/meow', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ meow: meowValue })
        });

        if (!response.ok) {
            document.getElementById('response').innerText = 'Error submitting meow.';
        }
    } catch (error) {
        console.error('Error:', error);
        document.getElementById('response').innerText = 'Failed to connect to server.';
    }
});