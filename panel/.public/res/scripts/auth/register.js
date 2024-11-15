document.getElementById('register').addEventListener('submit', async function(event) {
    event.preventDefault(); // Prevents form submission redirect

    const username = document.getElementById('usernameInput').value;
    const password = document.getElementById('passwordInput').value;

    try {
        const response = await fetch('/auth/register', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, password })
        });
        if (!response.ok) {
            throw new Error(`Failed to register. ${response.statusText}`);
        } else {
            alert('Registered successfully');
        }
    } catch (error) {
        console.error('Error:', error);
        alert('Failed to register');
    }
});