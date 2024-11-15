document.getElementById('arf-load').addEventListener('click', () => {
    fetch('/arf') // Ensure this points to the correct route
        .then(res => res.json())
        .then(data => {
            const table = document.getElementById('arf-table');
            table.innerHTML = `
                <table>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Nazwa</th>
                        </tr>
                    </thead>
                    <tbody id="nazwy"></tbody>
                </table>`;

            document.getElementById('nazwy').innerHTML = data.map(nazwa => `<tr>
                <td>${nazwa.id}</td>
                <td>${nazwa.nazwa}</td>
            </tr>`).join('');
        })
        .catch(error => {
            console.error('Error fetching ARF data:', error);
            document.getElementById('arf-table').innerHTML = 'Error fetching ARF data.';
        });
});