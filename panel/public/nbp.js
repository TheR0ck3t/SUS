document.getElementById('nbp-submit').addEventListener('click', function() {
    fetch('/nbp')
        .then(response => response.json())
        .then(data => {
            const table = document.getElementById('nbp-table');
            table.innerHTML = `
                <tr>
                    <th>Code</th>
                    <th>Currency</th>
                    <th>Mid</th>
                </tr>
            `;
            data.forEach(rate => {
                const row = document.createElement('tr');
                row.innerHTML = `
                    <td>${rate.code}</td>
                    <td>${rate.currency}</td>
                    <td>${rate.mid}</td>
                `;
                table.appendChild(row);
            });
        })
        .catch(error => {
            console.error('Error fetching NBP data:', error);
            document.getElementById('nbp-table').innerHTML = 'Error fetching NBP data.';
        });
});