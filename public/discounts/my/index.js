function getToken() {
    return localStorage.getItem("token");
}

document.addEventListener('DOMContentLoaded', () => {
    const token = getToken();   

    if (!token) {
        console.error('No authorization token found.');
        return;
    }

    fetch('/api/discounts/my', {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        }
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then(data => {
        console.log(data);
        const discountCodesTableBody = document.querySelector('#discount-codes-table tbody');
        discountCodesTableBody.innerHTML = ''; // Clear any previous content

        data = data.response;

        if (data.length === 0) {
            discountCodesTableBody.innerHTML = '<tr><td colspan="6">No discount codes available.</td></tr>';
        } else {
            data.forEach(discount => {
                const row = document.createElement('tr');
                row.innerHTML = `
                    <td>${discount.code}</td>
                    <td>${discount.description}</td>
                    <td>${discount.discountValue}</td>
                    <td>${new Date(discount.validFrom).toLocaleDateString()}</td>
                    <td>${new Date(discount.validUntil).toLocaleDateString()}</td>
                    <td>${new Date(discount.grabbedAt).toLocaleDateString()}</td>
                `;
                discountCodesTableBody.appendChild(row);
            });
        }
    })
    .catch(err => {
        console.error('Error fetching discount codes:', err);
        alert('An error occurred while fetching your discount codes. Please try again later.');
    });
});