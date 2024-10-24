const axios = require('axios');
module.exports = {
    name: 'nbp',
    description: 'NBP test',
    options: [{
            name: 'code',
            description: 'Currency code',
            type: 3,
            required: true,
        },
        {
            name: 'howmuch',
            description: 'How much',
            type: 3,
        }
    ],
    callback: async(bot, interaction) => {
        let code = interaction.options.get('code').value;
        let howMuch = interaction.options.get('howmuch') ? interaction.options.get('howmuch').value : 1;


        if (code != 'pln') {
            try {
                // First try with type "A"
                let response = await axios.get(`https://api.nbp.pl/api/exchangerates/rates/A/${code}/`);
                let data = response.data;
                interactionReply(data);
            } catch (errorA) {
                // If type "A" fails, try type "B"
                try {
                    let response = await axios.get(`https://api.nbp.pl/api/exchangerates/rates/B/${code}/`);
                    let data = response.data;
                    interactionReply(data);
                } catch (errorB) {
                    // If type "B" fails, try type "C"
                    try {
                        let response = await axios.get(`https://api.nbp.pl/api/exchangerates/rates/C/${code}/`);
                        let data = response.data;
                        interactionReply(data);
                    } catch (errorC) {
                        // If all types fail, reply with an error message
                        interaction.reply('Kod waluty nie jest poprawny lub nastąpił nieoczekiwany błąd.');
                    }
                }
            }
        } else {
            interaction.reply('Kurs z PLN na PLN = 1 :)');
        }

        function interactionReply(data) {
            interaction.reply(`Kod waluty: ${data.code}\nNazwa waluty: ${data.currency}\nKurs: ${data.rates[0].mid}\n${howMuch}` + ` ` + `${data.currency} = ` + Math.round((howMuch * data.rates[0].mid) * 100) / 100 + ` PLN\nKurs z dnia: ${data.rates[0.].effectiveDate}`);
        };

    }
}