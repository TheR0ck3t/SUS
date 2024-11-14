document.getElementById('nbp-submit').addEventListener('click', function() {
    document.getElementById('calc').setAttribute('class', 'calc-loaded');

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
                </table>`;

            document.getElementById('rates').innerHTML = data.map(rate => `
                <tr>
                    <td>${rate.code}</td>
                    <td>${rate.currency}</td>
                    <td>${rate.mid}</td>
                </tr>
            `).join('');

            // Populate both dropdowns with currency codes
            const options = data.map(rate => `<option value="${rate.code}">${rate.code}</option>`).join('');
            document.getElementById('codeToPln').innerHTML = options;
            document.getElementById('plnToCode').innerHTML = options;

            const codeToPlnInput = document.getElementById('codeToPlnInput');
            const plnToCodeInput = document.getElementById('plnToCodeInput');
            const codeToPlnSelect = document.getElementById('codeToPln');
            const plnToCodeSelect = document.getElementById('plnToCode');
            const resultCodeToPln = document.getElementById('resultCodeToPln');
            const resultPlnToCode = document.getElementById('resultPlnToCode');

            // Function to calculate exchange rate from selected currency to PLN
            function updateExchangeRateToPln() {
                const selectedCode = codeToPlnSelect.value;
                const rate = data.find(rate => rate.code === selectedCode);
                const amount = parseFloat(codeToPlnInput.value);
                if (!isNaN(amount) && rate) {
                    resultCodeToPln.innerHTML = `${(amount * rate.mid).toFixed(2)} PLN`;
                } else if (isNaN(amount)) {
                    resultPlnToCode.innerHTML = '';
                } else {
                    resultCodeToPln.innerHTML = 'Invalid input';
                }
            }

            // Function to calculate exchange rate from PLN to selected currency
            function updateExchangeRateFromPln() {
                const selectedCode = plnToCodeSelect.value;
                const rate = data.find(rate => rate.code === selectedCode);
                const amount = parseFloat(plnToCodeInput.value);
                if (!isNaN(amount) && rate) {
                    resultPlnToCode.innerHTML = `${(amount / rate.mid).toFixed(2)} ${selectedCode}`;
                } else if (isNaN(amount)) {
                    resultPlnToCode.innerHTML = '';
                } else {
                    resultPlnToCode.innerHTML = 'Invalid input';
                }
            }

            // Event listeners to trigger conversions when dropdowns or inputs change
            codeToPlnSelect.addEventListener('change', updateExchangeRateToPln);
            plnToCodeSelect.addEventListener('change', updateExchangeRateFromPln);
            codeToPlnInput.addEventListener('input', updateExchangeRateToPln);
            plnToCodeInput.addEventListener('input', updateExchangeRateFromPln);

            // Initial calculations on page load
            updateExchangeRateToPln();
            updateExchangeRateFromPln();
        })
        .catch(error => {
            console.error('Error fetching NBP data:', error);
            document.getElementById('nbp-table').innerHTML = 'Error fetching NBP data.';
        });
});