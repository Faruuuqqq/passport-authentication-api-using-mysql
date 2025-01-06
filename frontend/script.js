const API_URL = 'http://localhost:5000/auth'; // URL backend

// Handle Register
if (document.getElementById('registerForm')) {
  document.getElementById('registerForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    try {
      const response = await fetch(`${API_URL}/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password }),
      });
      const data = await response.json();
      document.getElementById('message').innerText = data.message || 'Registered successfully!';
    } catch (error) {
      document.getElementById('message').innerText = 'Error registering user.';
    }
  });
}

// Handle Login
if (document.getElementById('loginForm')) {
  document.getElementById('loginForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    try {
      const response = await fetch(`${API_URL}/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include', // To include session cookies
        body: JSON.stringify({ email, password }),
      });
      const data = await response.json();
      document.getElementById('message').innerText = data.message || 'Login successful!';
    } catch (error) {
      document.getElementById('message').innerText = 'Login failed.';
    }
  });
}

// Handle Protected Page
if (document.getElementById('protectedContent')) {
  (async () => {
    try {
      const response = await fetch(`${API_URL}/protected`, {
        method: 'GET',
        credentials: 'include', // To include session cookies
      });
      const data = await response.json();
      document.getElementById('protectedContent').innerText = data.message || 'Access granted!';
    } catch (error) {
      document.getElementById('errorMessage').innerText = 'Access denied.';
    }
  })();
}
