// Archives.js
const API = 'http://localhost:8080';

requireAuth('ADMIN');

async function loadArchives() {
    const tbody = document.getElementById('archive-tbody');

    try {
        const res  = await fetch(`${API}/api/requests`);
        const all  = await res.json();
        const archived = all.filter(r => r.status === 'COMPLETED');

        if (archived.length === 0) {
            tbody.innerHTML = '<tr class="empty-row"><td colspan="5">No archived records yet.</td></tr>';
            return;
        }

        tbody.innerHTML = '';
        archived.forEach(req => {
            const tr = document.createElement('tr');
            tr.innerHTML = `
                <td>${req.id.substring(0, 8)}…</td>
                <td>${req.fullName || req.userEmail}</td>
                <td>${req.documentType}</td>
                <td>${req.createdAt || '—'}</td>
                <td>${req.completedAt || req.createdAt || '—'}</td>
            `;
            tbody.appendChild(tr);
        });

    } catch {
        tbody.innerHTML = '<tr class="empty-row"><td colspan="5">Could not load archives. Make sure the backend is running.</td></tr>';
    }
}

(async () => {
    await loadArchives();
})();