module.exports = async(bot, message) => {
    try {
        // Ignore messages from bots
        if (message.author.bot) return;

        // Handle different message content
        switch (message.content) {
            case 'gay':
            case 'Gay':

                message.reply('[SEX](https://pornhub.com/gayporn)😱🤯');
                break;;
            case 'stupid bot':
                {
                    message.reply('Fuck off :heart:');
                    break;
                };
            case 'hyatt':
                {
                    message.reply('big gai top');
                    break;
                };
            case 'penis':
                {
                    message.reply('https://media.discordapp.net/attachments/573180594159091712/1080599927073280041/9C531AD0-0198-43DA-88B2-75AF99451847.gif?ex=65f2181b&is=65dfa31b&hm=b621e9fdaadf653289463baf3d73019e67371f185e1e8bde932e5ec71a82fbb6&');
                    break;
                };
            case 'test':
                {
                    message.reply('<@&1291859529318793278> P E N I S');
                    break;
                };

            case 'cum':
                {
                    message.reply('yes daddy');
                    break;
                };
        }
    } catch (error) {
        console.error('No i chuj no i cześć', error);
    }
};