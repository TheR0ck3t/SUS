module.exports = {
    name: 'ping',
    description: 'Pong!',

    callback: (bot, interaction) => {
        interaction.reply(`Pong! ${bot.ws.ping}ms`);
    }
}