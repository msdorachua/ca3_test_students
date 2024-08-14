// create_discount.js

document.addEventListener('DOMContentLoaded', function() {
    const form = document.querySelector('form');
    const backToListButton = document.getElementById('backToList');
     // Back to List button event
     backToListButton.addEventListener('click', function() {
        window.location.href = '/admin/discounts/retrieve/all';
    });

    form.addEventListener('submit', function(event) {
        event.preventDefault();

        const formData = new FormData(form);
        const data = Object.fromEntries(formData);
        const token = localStorage.getItem("token");
       
   
        fetch('/api/discounts/create', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                 Authorization: `Bearer ${token}`
            },
            body: JSON.stringify(data)
        })
        .then(response => {
            if (response.ok) {
                return response.json();
            } else {
                throw new Error('Failed to create discount code');
            }
        })
        .then(data => {
            alert('Discount code created successfully!');
            form.reset();
        })
        .catch(error => {
            console.error('Error:', error);
            alert('Error creating discount code: ' + error.message);
        });
    });

    
   

});
