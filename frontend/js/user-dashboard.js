const user = requireAuth('USER');

if (user) {
    loadActiveRequests();
}

async function loadActiveRequests() {
    try {
        const response = await fetch(`${API}/api/requests/${user.email}`);
        const requests = await response.json();

        const grid = document.getElementById('active-requests');
        const empty = document.getElementById('no-requests');

        if (!requests || requests.length === 0) {
            empty.style.display = 'block';
            return;
        }

        const recent = requests.slice(-4).reverse();

        recent.forEach(req => {
            grid.appendChild(createDocCard(req));
        });

    } catch (err) {
        console.error('Failed to load requests:', err);
    }
}

function createDocCard(req) {
    const card = document.createElement('div');
    card.className = 'doc-card';
    card.innerHTML = `
        <div class="doc-card-icon">
            <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8l-6-6zm-1 1.5L18.5 9H13V3.5zM6 20V4h5v7h7v9H6z"/>
            </svg>
        </div>
        <p class="doc-card-name">${req.documentType}</p>
        <p class="doc-card-status">Status: <strong>${req.status}</strong></p>
        <button class="btn-gold-sm" onclick="viewStatus('${req.id}')">View Status</button>
    `;
    return card;
}

function viewStatus(requestId) {
    sessionStorage.setItem('selectedRequestId', requestId);
    window.location.href = 'status.html';
}
