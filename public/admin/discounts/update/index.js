document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('updateForm');
    const discountId = new URLSearchParams(window.location.search).get('id');
    const token = localStorage.getItem('token'); // Assume token is stored in localStorage
    const backToListButton = document.getElementById('backToList');
    
    // Fetch the discount details by ID and populate the form
    fetch(`/api/discounts/${discountId}`, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        }
    })
    .then(response => {
        if (response.ok) {
            return response.json();
        } else {
            throw new Error('Failed to fetch discount details');
        }
    })
    .then(data => {
        // Populate the form fields with the discount details
        document.getElementById('id').value = data.id;
        document.getElementById('code').value = data.code;
        document.getElementById('description').value = data.description;
        document.getElementById('discountValue').value = data.discountValue;
        document.getElementById('maxUsageCount').value = data.maxUsageCount;
        document.getElementById('validFrom').value = new Date(data.validFrom).toISOString().slice(0, 16);
        document.getElementById('validUntil').value = new Date(data.validUntil).toISOString().slice(0, 16);
        document.getElementById('isActive').checked = data.isActive;
    })
    .catch(error => {
        console.error('Error:', error);
        alert('Error fetching discount details: ' + error.message);
    });

    // Handle form submission for updating the discount code
    form.addEventListener('submit', function(event) {
        event.preventDefault();

        const formData = new FormData(form);
        
        const data = {
            code: formData.get('code'),
            description: formData.get('description'),
            discountValue: parseFloat(formData.get('discountValue')),  // Convert to float
            maxUsageCount: parseInt(formData.get('maxUsageCount'), 10), // Convert to integer
            validFrom: new Date(formData.get('validFrom')).toISOString(), // Convert to ISO-8601 DateTime
            validUntil: new Date(formData.get('validUntil')).toISOString(), // Convert to ISO-8601 DateTime
            isActive: formData.get('isActive') === 'on'  // Convert checkbox to boolean
        };

        fetch(`/api/discounts/update/${discountId}`, {
            method: 'PUT',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
        .then(response => {
            if (response.ok) {
                return response.json();
            } else {
                throw new Error('Failed to update discount code');
            }
        })
        .then(data => {
            alert('Discount code updated successfully!');
        })
        .catch(error => {
            console.error('Error:', error);
            alert('Error updating discount code: ' + error.message);
        });
    });

    // Back to List button event
    backToListButton.addEventListener('click', function() {
        window.location.href = '/admin/discounts/retrieve/all';
    });

});