const API = 'http://localhost:8080';

requireAuth('ADMIN');

const req = JSON.parse(sessionStorage.getItem('selectedRequest'));

if (!req) {
  window.location.href = 'dashboard.html';
} else {
  document.getElementById('detail-type').textContent    = req.documentType || '—';
  document.getElementById('detail-name').textContent    = req.fullName || req.userEmail || '—';
  document.getElementById('detail-email').textContent   = req.userEmail || '—';
  document.getElementById('detail-purpose').textContent = req.purpose || '—';
}

document.getElementById('btn-approve').addEventListener('click', async () => {
  try {
    const res = await fetch(`${API}/api/requests/${req.id}/status`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status: 'APPROVED' })
    });

    if (!res.ok) throw new Error();
    alert('Request approved successfully.');
    sessionStorage.removeItem('selectedRequest');
    window.location.href = 'dashboard.html';
  } catch {
    alert('Could not update status. Make sure the backend is running.');
  }
});
