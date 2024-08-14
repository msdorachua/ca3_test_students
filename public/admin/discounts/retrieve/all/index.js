document.addEventListener('DOMContentLoaded', function() {
    const discountsTable = document.getElementById('discountsTable').getElementsByTagName('tbody')[0];
    const token = localStorage.getItem('token'); // Assume token is stored in localStorage

    // Fetch all discount codes initially
    fetchDiscountCodes();

    // Handle search form submission
    document.getElementById('searchForm').addEventListener('submit', function(e) {
        e.preventDefault();

        const startDate = document.getElementById('startDate').value;
        const endDate = document.getElementById('endDate').value;
        const minDiscount = document.getElementById('minDiscount').value;
        const maxDiscount = document.getElementById('maxDiscount').value;
        const description = document.getElementById('description').value;

        const queryParams = new URLSearchParams();

        if (startDate) queryParams.append('startDate', startDate);
        if (endDate) queryParams.append('endDate', endDate);
        if (minDiscount) queryParams.append('minDiscount', minDiscount);
        if (maxDiscount) queryParams.append('maxDiscount', maxDiscount);
        if (description) queryParams.append('description', description);

        fetchDiscountCodes(queryParams.toString());
    });

    // Function to fetch and display discount codes
    function fetchDiscountCodes(queryParams = '') {
        let url = '/api/discounts/';
        if (queryParams) {
            url += `?${queryParams}`;
        }

        console.log('Fetching discount codes:', url);   

        fetch(url, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        })
        .then(response => response.json())
        .then(data => {
            discountsTable.innerHTML = ''; // Clear existing rows

            data.forEach(discount => {
                const row = discountsTable.insertRow();

                row.insertCell(0).textContent = discount.id;
                row.insertCell(1).textContent = discount.code;
                row.insertCell(2).textContent = discount.description;
                row.insertCell(3).textContent = discount.discountValue;
                row.insertCell(4).textContent = discount.maxUsageCount;
                row.insertCell(5).textContent = new Date(discount.validFrom).toLocaleString();
                row.insertCell(6).textContent = new Date(discount.validUntil).toLocaleString();
                row.insertCell(7).textContent = discount.isActive ? 'Yes' : 'No';

                const actionCell = row.insertCell(8);

                // Create a container to hold the buttons on the same line
                const buttonContainer = document.createElement('div');
                buttonContainer.style.display = 'flex';
                buttonContainer.style.gap = '10px'; // Add spacing between buttons

                // Edit button
                const editButton = document.createElement('button');
                editButton.textContent = 'Edit';
                editButton.addEventListener('click', () => {
                    window.location.href = `/admin/discounts/update/?id=${discount.id}`;
                });
                buttonContainer.appendChild(editButton);

                // Delete button
                const deleteButton = document.createElement('button');
                deleteButton.textContent = 'Delete';
                deleteButton.addEventListener('click', () => {
                    if (confirm(`Are you sure you want to delete discount code "${discount.code}"?`)) {
                        deleteDiscount(discount.id);
                    }
                });
                buttonContainer.appendChild(deleteButton);

                actionCell.appendChild(buttonContainer);
            });
        })
        .catch(error => {
            console.error('Error fetching discount codes:', error);
            alert('Error fetching discount codes: ' + error.message);
        });
    }

    // Function to delete a discount code
    function deleteDiscount(id) {
        fetch(`/api/discounts/delete/${id}`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        })
        .then(response => {
            if (response.ok) {
                alert('Discount code deleted successfully!');
                location.reload(); // Reload the page to reflect changes
            } else {
                throw new Error('Failed to delete discount code');
            }
        })
        .catch(error => {
            console.error('Error deleting discount code:', error);
            alert('Error deleting discount code: ' + error.message);
        });
    }
});
