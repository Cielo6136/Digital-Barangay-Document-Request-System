const API = 'http://localhost:8080';

// LOGIN
const btnLogin = document.getElementById('btn-login');
if (btnLogin) {
    btnLogin.addEventListener('click', async () => {
        const email    = document.getElementById('login-email').value.trim();
        const password = document.getElementById('login-password').value.trim();

        if (!email || !password) {
            alert('Please fill in all fields.');
            return;
        }

        try {
            const response = await fetch(`${API}/api/auth/login`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password })
            });

            if (!response.ok) {
                const error = await response.text();
                alert(error);
                return;
            }

            const user = await response.json();
            sessionStorage.setItem('user', JSON.stringify(user));

            if (user.role === 'ADMIN') {
                window.location.href = '../pages/admin/dashboard.html';
            } else {
                window.location.href = '../html/dashboard.html';
            }

        } catch (err) {
            alert('Could not connect to the server. Make sure the backend is running.');
        }
    });
}

// SIGN UP
const btnSignup = document.getElementById('btn-signup');
if (btnSignup) {
    btnSignup.addEventListener('click', async () => {
        const fullName        = document.getElementById('signup-name').value.trim();
        const email           = document.getElementById('signup-email').value.trim();
        const password        = document.getElementById('signup-password').value.trim();
        const confirmPassword = document.getElementById('signup-confirm').value.trim();

        if (!fullName || !email || !password || !confirmPassword) {
            alert('Please fill in all fields.');
            return;
        }

        if (password !== confirmPassword) {
            alert('Passwords do not match.');
            return;
        }

        try {
            const response = await fetch(`${API}/api/auth/signup`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ fullName, email, password })
            });

            if (!response.ok) {
                const error = await response.text();
                alert(error);
                return;
            }

            alert('Account created successfully! Please log in.');
            window.location.href = 'login.html';

        } catch (err) {
            alert('Could not connect to the server. Make sure the backend is running.');
        }
    });
}

// LOGOUT
function logout() {
    sessionStorage.removeItem('user');
    window.location.href = '../html/login.html';
}

// Call on protected pages
function requireAuth(requiredRole = null) {
    const user = JSON.parse(sessionStorage.getItem('user'));

    if (!user) {
        window.location.href = '../html/login.html';  // pages/user/ → pages/login.html
        return null;
    }

    if (requiredRole && user.role !== requiredRole) {
        window.location.href = '../html/login.html';
        return null;
    }

    return user;
}