module.exports = {
    name: 'random',
    description: 'Random nh',
    options: [{
        name: 'x',
        description: '= Amount of links you want to generate (47 is the max due to 2000 characters per message limit)',
        type: 4,
        required: true,
    }, ],
    callback: (bot, interaction) => {
        let amount = interaction.options.get('x').value;
        if (amount > 47) {
            amount = 47
        }
        const odpowiedzi = [];
        let kody = [];
        nh(amount);

        function losowanie() {
            let rng = Math.floor(Math.random() * 498931) + 1;
            kody.push(rng)
        }

        function nh(amount) {
            let nhl = 'https://www.nhentai.net/g/';
            let linki = [];

            for (let i = 0; i < amount; i++) {
                losowanie();
            }
            for (var i = 0; i < kody.length; i++) {
                linki.push(nhl + kody[i]);
            }

            for (let i = 0; i < linki.length; i++) {
                link = linki[i];
                for (let i = 0; i < kody.length; i++) {
                    kod = kody[i];
                }
                odpowiedzi.push(`[${kody[i]}](${linki[i]})`); //
            }
            interaction.reply(`${odpowiedzi}`);
        }
    }
}