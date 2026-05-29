const API = 'http://localhost:8080';

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

            // save session
            sessionStorage.setItem('user', JSON.stringify(user));

            // redirect based on role
            if (user.role === 'ADMIN') {
                window.location.href = '../pages/admin/dashboard.html';
            } else {
                window.location.href = '../pages/user/dashboard.html';
            }

        } catch (err) {
            alert('Could not connect to the server.');
        }
    });
}


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
            alert('Could not connect to the server.');
        }
    });
}


