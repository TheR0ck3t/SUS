module.exports = async(bot, message) => {
    try {
        // Ignore messages from bots
        if (message.author.bot) return;

        // Handle different message content
        switch (message.content) {
            case 'Gay':
                {
                    message.reply('[SEX](https://pornhub.com/gayporn)😱🤯');
                    break;
                }
            case 'stupid bot':
                {
                    message.reply('Fuck off :heart:');
                    break;
                }
            case 'soup':
                {
                    message.reply('is stinki ~~gae~~ boy >:3');
                    break;
                }
            default:
                {
                    // Handle other messages
                    break;
                }
        }
    } catch (error) {
        console.error('An error occurred while processing a message:', error);
    }
};