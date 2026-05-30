const user = requireAuth('USER');

const requestId = sessionStorage.getItem('selectedRequestId');

if (!requestId) {
    window.location.href = 'activities.html';
}

if (user && requestId) {
    loadStatus();
}

async function loadStatus() {
    try {
        const response = await fetch(`${API}/api/requests/${user.email}`);
        const requests = await response.json();

        const req = requests.find(r => r.id === requestId);

        if (!req) {
            alert('Request not found.');
            window.location.href = 'activities.html';
            return;
        }

        document.getElementById('doc-name').textContent = req.documentType;

        // map status to steps
        const steps = ['APPROVAL', 'PROCESSING', 'PICKUP', 'COMPLETED'];
        const statusMap = {
            'PENDING':    0,
            'APPROVED':   1,
            'PROCESSING': 2,
            'RELEASED':   3,
            'COMPLETED':  4
        };

        const currentStep = statusMap[req.status] ?? 0;

        const stepKeys = ['approval', 'processing', 'pickup', 'completed'];

        stepKeys.forEach((key, index) => {
            const label    = document.getElementById(`label-${key}`);
            const checkbox = document.getElementById(`check-${key}`);
            const icon     = document.getElementById(`icon-${key}`);

            if (index < currentStep) {
                label.classList.add('done');
                checkbox.classList.add('checked');
                icon.classList.add('done');
            } else if (index === currentStep) {
                label.classList.add('active');
                icon.classList.add('active');
            }
        });

    } catch (err) {
        console.error('Failed to load status:', err);
    }
}
