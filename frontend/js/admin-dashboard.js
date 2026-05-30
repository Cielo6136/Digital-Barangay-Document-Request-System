requireAuth('ADMIN');

async function loadPendingDocs() {
  const grid = document.getElementById('pending-grid');
  const emptyMsg = document.getElementById('empty-msg');

  try {
    const res = await fetch(`${API}/api/requests`);
    const all = await res.json();
    const pending = all.filter(r => r.status === 'PENDING');

    grid.innerHTML = '';

    if (pending.length === 0) {
      emptyMsg.style.display = 'block';
      grid.appendChild(emptyMsg);
      return;
    }

    pending.forEach(req => {
      const card = document.createElement('div');
      card.className = 'doc-card';
      card.innerHTML = `
        <div class="doc-card-icon">
          <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect x="10" y="4" width="36" height="48" rx="4" fill="#1e3a5f" opacity="0.15"/>
            <rect x="14" y="8"  width="36" height="48" rx="4" fill="#1e3a5f" opacity="0.25"/>
            <rect x="18" y="12" width="36" height="48" rx="4" fill="#2d4a7a"/>
            <rect x="24" y="26" width="20" height="2.5" rx="1" fill="white" opacity="0.8"/>
            <rect x="24" y="32" width="20" height="2.5" rx="1" fill="white" opacity="0.8"/>
            <rect x="24" y="38" width="14" height="2.5" rx="1" fill="white" opacity="0.6"/>
          </svg>
        </div>
        <p>${req.documentType}</p>
        <p>Customer: ${req.fullName || req.userEmail}</p>
        <p>Status: ${req.status}</p>
      `;
      card.addEventListener('click', () => {
        sessionStorage.setItem('selectedRequest', JSON.stringify(req));
        window.location.href = 'document-details.html';
      });
      grid.appendChild(card);
    });

  } catch (err) {
    grid.innerHTML = '<p class="empty-state">Could not load documents. Make sure the backend is running.</p>';
  }
}

loadPendingDocs();
