const axios = require('axios');
module.exports = {
    name: 'nbp',
    description: 'NBP test',
    options: [{
        name: 'code',
        description: 'Currency code',
        type: 3,
        required: true,
    }],
    callback: (bot, interaction) => {
        let code = interaction.options.get('code').value;
        if (code != 'pln') {
            axios.get(`https://api.nbp.pl/api/exchangerates/rates/A/${code}/`)
                .then(response => {
                    let data = response.data;
                    interaction.reply(`Kod waluty: ${data.code}\nNazwa waluty: ${data.currency}\nKurs: ${data.rates[0].mid}`);
                })
                .catch(error => {
                    console.log(error);
                    interaction.reply('Kod waluty nie jest poprawny lub nastąpił nieoczekiwany błąd.');
                });
        } else {
            interaction.reply('Kurs z PLN na PLN = 1 :)');
        }
    }
}