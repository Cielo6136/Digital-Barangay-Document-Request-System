const API = 'http://localhost:8080';

requireAuth('ADMIN');

let selectedRequest = null;
let selectedStatus  = null;

const overlay = document.getElementById('overlay');
const panel   = document.getElementById('float-panel');
const tbody   = document.getElementById('requests-tbody');

async function loadRequests() {
    try {
        const res = await fetch(`${API}/api/requests`);
        const all = await res.json();
        renderTable(all);
    } catch {
        tbody.innerHTML = '<tr class="empty-row"><td colspan="5">Could not load requests. Make sure the backend is running.</td></tr>';
    }
}

function renderTable(requests) {
    if (requests.length === 0) {
        tbody.innerHTML = '<tr class="empty-row"><td colspan="5">No requests yet.</td></tr>';
        return;
    }

    tbody.innerHTML = '';
    requests.forEach(req => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td>${req.id.substring(0, 8)}…</td>
            <td>${req.fullName || req.userEmail}</td>
            <td>${req.documentType}</td>
            <td>${req.createdAt || '—'}</td>
            <td><span class="status-badge status-${req.status}">${req.status}</span></td>
        `;
        tr.addEventListener('click', () => openPanel(req));
        tbody.appendChild(tr);
    });
}

function openPanel(req) {
    selectedRequest = req;
    selectedStatus  = null;

    document.getElementById('p-id').textContent             = req.id.substring(0, 8) + '…';
    document.getElementById('p-user').textContent           = req.fullName || req.userEmail;
    document.getElementById('p-type').textContent           = req.documentType;
    document.getElementById('p-current-status').textContent = req.status;

    document.querySelectorAll('.status-option').forEach(el => el.classList.remove('selected'));

    overlay.classList.add('active');
    panel.style.display = 'block';
}

function closePanel() {
    overlay.classList.remove('active');
    panel.style.display = 'none';
    selectedRequest = null;
    selectedStatus  = null;
}

function selectStatus(el) {
    document.querySelectorAll('.status-option').forEach(o => o.classList.remove('selected'));
    el.classList.add('selected');
    selectedStatus = el.dataset.status;
}

async function confirmUpdate() {
    if (!selectedRequest) return;
    if (!selectedStatus) { alert('Please select a new status.'); return; }

    try {
        const res = await fetch(`${API}/api/requests/${selectedRequest.id}/status`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ status: selectedStatus })
        });

        if (!res.ok) throw new Error();
        closePanel();
        await loadRequests(); // ← awaited
    } catch {
        alert('Could not update status. Make sure the backend is running.');
    }
}

window.closePanel   = closePanel;
window.selectStatus = selectStatus;
window.confirmUpdate = confirmUpdate;

(async () => {
    await loadRequests(); // ← awaited
})();