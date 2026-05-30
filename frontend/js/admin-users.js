requireAuth('ADMIN');

async function loadUsers() {
  const tbody = document.getElementById('users-tbody');

  try {
    const res   = await fetch(`${API}/api/auth/users`);
    const users = await res.json();

    if (users.length === 0) {
      tbody.innerHTML = '<tr class="empty-row"><td colspan="4">No users registered yet.</td></tr>';
      return;
    }

    tbody.innerHTML = '';
    users.forEach(u => {
      const tr = document.createElement('tr');
      tr.innerHTML = `
        <td>${u.id.substring(0, 8)}…</td>
        <td>${u.fullName}</td>
        <td>${u.email}</td>
        <td><span class="role-badge role-${u.role}">${u.role}</span></td>
      `;
      tbody.appendChild(tr);
    });

  } catch {
    tbody.innerHTML = '<tr class="empty-row"><td colspan="4">Could not load users. Make sure the backend is running.</td></tr>';
  }
}

loadUsers();
