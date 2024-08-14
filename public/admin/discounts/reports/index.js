document.addEventListener('DOMContentLoaded', async function () {
    const token = localStorage.getItem("token");

    if (!token) {
        console.error('No authorization token found.');
        return;
    }

    try {
        // Fetch and display most grabbed discount codes
        const popularByUsersTable = document.getElementById('popular-by-users-table').getElementsByTagName('tbody')[0];
        const popularByUsersResponse = await fetch('/api/discounts/popularbyusers', {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        const popularByUsers = await popularByUsersResponse.json();

        if (popularByUsers && popularByUsers.length > 0) {
            popularByUsers.forEach(function (code) {
                const row = document.createElement('tr');
                row.innerHTML = `
                    <td>${code.code}</td>
                    <td>${code.description}</td>
                    <td>${code.discountValue}</td>
                    <td>${code.maxUsageCount}</td>
                    <td>${code.usageCount}</td>
                `;
                popularByUsersTable.appendChild(row);
            });
        } else {
            const noDataRow = document.createElement('tr');
            noDataRow.innerHTML = `<td colspan="5">No popular discount codes found by users.</td>`;
            popularByUsersTable.appendChild(noDataRow);
        }

        // Fetch and display top users by discount code grabs
        const topUsersTable = document.getElementById('top-users-table').getElementsByTagName('tbody')[0];
        const topUsersResponse = await fetch('/api/discounts/topusers', {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        const topUsers = await topUsersResponse.json();
        console.log(topUsers);

        if (topUsers && topUsers.length > 0) {
            topUsers.forEach(function (user) {
                // Handle the case where grabbedCodes might be empty or undefined
                const codes = user.grabbedCodes && user.grabbedCodes.length > 0 ? user.grabbedCodes.join(', ') : 'No codes found';
                
                const row = document.createElement('tr');
                row.innerHTML = `
                    <td>${user.username}</td>
                    <td>${user.email}</td>
                    <td>${user.grabbedCount}</td>
                    <td>${codes}</td>
                `;
                topUsersTable.appendChild(row);
            });
        } else {
            const noDataRow = document.createElement('tr');
            noDataRow.innerHTML = `<td colspan="4">No users have grabbed discount codes yet.</td>`;
            topUsersTable.appendChild(noDataRow);
        }

    } catch (err) {
        console.error('Error fetching discount codes or top users:', err);
    }
});
