const user = requireAuth('USER');

if (user) {
    // pre fill name
    document.getElementById('full-name').value = user.fullName;
}

document.getElementById('btn-submit-request').addEventListener('click', async () => {
    const documentType = document.getElementById('doc-type').value;
    const purpose      = document.getElementById('purpose').value.trim();

    if (!documentType) {
        alert('Please select a document type.');
        return;
    }

    if (!purpose) {
        alert('Please enter the purpose of your request.');
        return;
    }

    try {
        const response = await fetch(`${API}/api/requests`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                userEmail:    user.email,
                documentType: documentType,
                purpose:      purpose
            })
        });

        if (!response.ok) {
            alert('Failed to submit request. Please try again.');
            return;
        }

        alert('Request submitted successfully!');
        window.location.href = 'dashboard.html';

    } catch (err) {
        alert('Could not connect to the server.');
    }
});
