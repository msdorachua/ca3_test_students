window.addEventListener('DOMContentLoaded', function () {
    function getToken() {
        return localStorage.getItem("token");
    }

    function loadDiscountCodes() {
        const token = getToken();
        if (!token) {
            alert('No token found. Please log in.');
            return;
        }

        fetch('/api/discounts/available', {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
        .then(function (response) {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(function (discountCodes) {
            const discountCodesTableBody = document.querySelector('#discountCodesTable tbody');
            discountCodesTableBody.innerHTML = ''; // Clear the table body

            discountCodes.forEach(function (discountCode) {
                const row = document.createElement('tr');

                const codeCell = document.createElement('td');
                const descriptionCell = document.createElement('td');
                const valueCell = document.createElement('td');
                const maxUsageCell = document.createElement('td');
                const validFromCell = document.createElement('td');
                const validUntilCell = document.createElement('td');
                const actionCell = document.createElement('td');
                const grabButton = document.createElement('button');

                codeCell.textContent = discountCode.code;
                descriptionCell.textContent = discountCode.description;
                valueCell.textContent = discountCode.discountValue;
                maxUsageCell.textContent = discountCode.maxUsageCount;

        
                validFromCell.textContent = formatDate(discountCode.validFrom);
                validUntilCell.textContent = formatDate(discountCode.validUntil);

                grabButton.textContent = "Grab Discount Code";
                grabButton.addEventListener('click', function () {
                    grabDiscountCode(discountCode.discountCodeId, row);
                });

                actionCell.appendChild(grabButton);

                row.appendChild(codeCell);
                row.appendChild(descriptionCell);
                row.appendChild(valueCell);
                row.appendChild(maxUsageCell);
                row.appendChild(validFromCell);
                row.appendChild(validUntilCell);
                row.appendChild(actionCell);

                discountCodesTableBody.appendChild(row);
            });
        })
        .catch(function (error) {
            console.error('Error fetching discount codes:', error);
        });
    }

    function formatDate(dateString) {
        const date = new Date(dateString);
        return date.toLocaleDateString(); // Only return the date part
    }

    function grabDiscountCode(discountCodeId, row) {
        const token = getToken();
        
        if (!token) {
            alert('No token found. Please log in.');
            return;
        }

        fetch('/api/discounts/grab', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({ discountCodeId })
        })
        .then(function (response) {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(function (result) {
            alert(result.message);
            if (result.message === 'Discount code grabbed successfully!') {
                row.remove();
                alert('Congratulations! You have successfully grabbed the discount code.');
            }
        })
        .catch(function (error) {
            console.error('Error grabbing discount code:', error);
        });
    }

    loadDiscountCodes();
});
