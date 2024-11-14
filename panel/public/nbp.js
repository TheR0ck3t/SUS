document.getElementById('nbp-submit').addEventListener('click', function() {
    document.getElementById('calc').setAttribute('class', 'calc-loaded')
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

            document.getElementById('codeToPln').innerHTML = data.map(rate => `
                <option value="${rate.code}">${rate.code}</option>
            `).join('');

            document.getElementById('plnToCode').innerHTML = data.map(rate => `
                <option value="${rate.code}">${rate.code}</option>
            `).join('');

            const codeToPlnInput = document.getElementById('codeToPlnInput');
            const codeSelect = document.getElementById('codeToPln');
            const resultCodeToPln = document.getElementById('resultCodeToPln');
            const plnToCodeInput = document.getElementById('plnToCodeInput');
            const resultPlnToCode = document.getElementById('resultPlnToCode');

            // Function to calculate and update the exchange rate from currency to PLN
            function updateExchangeRateToPln() {
                const code = codeSelect.value;
                const rate = data.find(rate => rate.code === code);
                const amount = parseFloat(codeToPlnInput.value); // Ensure it's a number
                if (!isNaN(amount) && rate) {
                    const result = amount * rate.mid;
                    resultCodeToPln.innerHTML = Math.round(result * 100) / 100 + ` PLN`;
                } else if (isNaN(amount) || amount === '') {
                    resultCodeToPln.innerHTML = '';
                } else {
                    resultCodeToPln.innerHTML = 'Invalid input or rate not found';
                }
            }

            // Function to calculate and update the exchange rate from PLN to currency
            function updateExchangeRateFromPln() {
                const code = codeSelect.value;
                const rate = data.find(rate => rate.code === code);
                const amount = parseFloat(plnToCodeInput.value); // Ensure it's a number
                if (!isNaN(amount) && rate) {
                    const result = amount / rate.mid;
                    resultPlnToCode.innerHTML = Math.round(result * 100) / 100 + ` ${code}`;
                } else if (isNaN(amount) || amount === '') {
                    resultPlnToCode.innerHTML = '';
                } else {
                    resultPlnToCode.innerHTML = 'Invalid input or rate not found';
                }
            }

            // Event listener for when the "codeToPln" dropdown changes
            codeSelect.addEventListener('change', () => {
                updateExchangeRateToPln();
                updateExchangeRateFromPln();
            });

            // Event listener for when the "codeToPlnInput" input changes
            codeToPlnInput.addEventListener('input', updateExchangeRateToPln);

            // Event listener for when the "plnToCodeInput" input changes
            plnToCodeInput.addEventListener('input', updateExchangeRateFromPln);

            // Initial calculation on page load (in case a default option is pre-selected)
            updateExchangeRateToPln();
            updateExchangeRateFromPln();

        })
        .catch(error => {
            console.error('Error fetching NBP data:', error);
            document.getElementById('nbp-table').innerHTML = 'Error fetching NBP data.';
        });
});