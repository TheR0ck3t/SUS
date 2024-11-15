document.getElementById('login').addEventListener('submit', async function(event) {
    event.preventDefault(); // Prevents form submission redirect

    const username = document.getElementById('loginUsernameInput').value;
    const password = document.getElementById('loginPasswordInput').value;

    try {
        const response = await fetch('/auth/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, password })
        });
        if (!response.ok) {
            alert('Error:', response.statusText);
        } else {
            alert(`Logged in as ${username}`);
        }
    } catch (error) {
        console.error('Error:', error);
        alert('Failed to log in');
    }
});