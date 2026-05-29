const user = requireAuth('USER');

if (user) {
    document.getElementById('profile-name').textContent  = user.fullName;
    document.getElementById('profile-email').textContent = user.email;
}
