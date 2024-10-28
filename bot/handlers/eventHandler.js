const path = require('path');
const getFiles = require('../util/getFiles');

module.exports = (bot) => {
    const eventFolders = getFiles(path.join(__dirname, '..', 'events'), true);

    for (const eventFolder of eventFolders) {

        const eventFiles = getFiles(eventFolder);
        eventFiles.sort((a, b) => a > b);


        const eventName = eventFolder.replace(/\\/g, '/').split('/').pop();


        bot.on(eventName, async(arg) => {
            for (const eventFile of eventFiles) {
                const eventFuction = require(eventFile);
                await eventFuction(bot, arg);
            }
        })
    }
    bot.on('messageCreate', async(message) => {
        const messageHandler = require('../events/messageCreate');
        await messageHandler(bot, message);
    });



};