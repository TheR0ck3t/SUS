const { devs, testServer } = require('../../../config.json');
const getLocCommands = require('../../util/getLocCommands');

module.exports = async(client, interaction) => {
    if (!interaction.isChatInputCommand()) return;

    const localCommands = getLocCommands();

    try {
        const commandObject = localCommands.find(
            (cmd) => cmd.name === interaction.commandName
        );

        if (!commandObject) return;


        await commandObject.callback(client, interaction);
    } catch (error) {
        console.log(`There was an error running this command: ${error}`);
    }
};