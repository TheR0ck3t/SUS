document.getElementById('nbp-submit').addEventListener('click', function() {
    fetch('/nbp')
        .then(response => response.json())
        .then(data => {
            const table = document.getElementById('nbp-table');
            table.innerHTML = `
            <table>
                <thead>
                    <tr>
                        <th>Code</th>
                        <th>Currency</th>
                        <th>Mid</th>
                    </tr>
                </thead>
                <tbody id="rates">
                </tbody>
            `;
            document.getElementById('rates').innerHTML = data.map(rate => `
                <tr>
                    <td>${rate.code}</td>
                    <td>${rate.currency}</td>
                    <td>${rate.mid}</td>
                </tr>
            `).join('') + `</table>`;

            document.getElementById('code').innerHTML = data.map(rate => `
                <option value="${rate.code}">${rate.code}</option>
            `).join('');

            const codeToPlnInput = document.getElementById('codeToPln');
            const codeSelect = document.getElementById('code');
            const resultCodeToPln = document.getElementById('resultCodeToPln');

            // Function to calculate and update the exchange rate
            function updateExchangeRate() {
                const code = codeSelect.value;
                const rate = data.find(rate => rate.code === code);
                const codeToPln = parseFloat(codeToPlnInput.value); // Ensure it's a number
                if (!isNaN(codeToPln) && rate) {
                    const result = codeToPln * rate.mid;
                    resultCodeToPln.innerHTML = Math.round(result * 100) / 100 + ` PLN`;
                } else if (isNaN(codeToPln) || codeToPln === '') {
                    resultCodeToPln.innerHTML = '';
                } else {
                    resultCodeToPln.innerHTML = 'Invalid input or rate not found';
                }

            }

            // Event listener for when the "code" dropdown changes
            codeSelect.addEventListener('change', updateExchangeRate);

            // Event listener for when the "codeToPln" input changes
            codeToPlnInput.addEventListener('input', updateExchangeRate);

            // Initial calculation on page load (in case a default option is pre-selected)
            updateExchangeRate();


        })
        .catch(error => {
            console.error('Error fetching NBP data:', error);
            document.getElementById('nbp-table').innerHTML = 'Error fetching NBP data.';
        });
});