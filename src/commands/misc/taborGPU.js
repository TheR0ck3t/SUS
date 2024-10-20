try {
    module.exports = {
        name: 'gpucalc',
        description: 'Tabor GPU Calc',
        options: [{
            name: 'gpu',
            description: 'number of GPUs',
            type: 4,
            required: true,
        }, {
            name: 'generator',
            description: 'generator level',
            type: 4,
            required: true,
        }, {
            name: 'utility',
            description: 'utility level',
            type: 4,
            required: true,
        }],
        callback: (bot, interaction) => {
            let gpu = interaction.options.get('gpu').value;
            let generator = interaction.options.get('generator').value;
            let utility = interaction.options.get('utility').value;
            let resultWGas1h, resultWGas24h, resultWOGas1h, resultWOGas24h, gasFull, gasEmpty, utlityLV, genLV, gas;
            gasFull = 4885;
            gasEmpty = 1994;

            if (generator >= 4) {
                generator = 3;
            };
            if (utility >= 4) {
                utility = 3;
            };
            switch (generator) {
                case 1:
                    {
                        genLV = 1;
                        gas = (gasFull * 2) - (gasEmpty * 2);
                        break;
                    };
                case 2:
                    {
                        genLV = 1.5;
                        gas = (gasFull * 1.5) - (gasEmpty * 1.5);
                        break;
                    };
                case 3:
                    {
                        genLV = 2;
                        gas = gasFull - gasEmpty;
                        break;
                    };
            }
            switch (utility) {
                case 1:
                    {
                        utlityLV = 1.5;
                        break;
                    };
                case 2:
                    {
                        utlityLV = 2;
                        break;
                    };
                case 3:
                    {
                        utlityLV = 2.5;
                        break;
                    };
            }
            resultWOGas1h = (gpu * utlityLV) * 60;
            resultWOGas24h = resultWOGas1h * 24;
            resultWGas24h = resultWOGas24h - gas;
            resultWGas1h = resultWGas24h / 24;
            koronasPerMinute = gpu * utlityLV;
            interaction.reply(`Koronas per minute: ${koronasPerMinute} \nResult 24h: ${resultWOGas24h}(${resultWOGas1h}/1h)kr\nResult 24h(with gas): ${resultWGas24h}(${resultWGas1h}/1h) kr`);
        }
    }

} catch (error) {
    console.log('No i chuj no i cześć', error);
}