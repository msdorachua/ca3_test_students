document.addEventListener('DOMContentLoaded', function() {
    const discountsTable = document.getElementById('discountsTable').getElementsByTagName('tbody')[0];
    const token = localStorage.getItem('token'); // Assume token is stored in localStorage

    // Fetch all discount codes initially
    fetchDiscountCodes();

    // Function to fetch and display discount codes
    function fetchDiscountCodes() {
        let url = '/api/discounts/test_route';
        
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
 
            });
        })
        .catch(error => {
            console.error('Error fetching discount codes:', error);
            alert('Error fetching discount codes: ' + error.message);
        });
    }

    
});
