const { test } = require('../../../config.json');
const getAppCommands = require('../../util/getAppCommands');
const getLocCommands = require('../../util/getLocCommands');
const areCommandsDifferent = require('../../util/areCommandsDifferent');

module.exports = async(bot) => {
    try {
        const localCommands = getLocCommands();
        const appCommands = await getAppCommands(bot, test);

        for (const localCommand of localCommands) {
            const { name, description, options } = localCommand;

            const existingCommand = await appCommands.cache.find((cmd) => cmd.name === name);

            if (existingCommand) {
                if (localCommand.deleted) {
                    console.log(`🗑 Deleted command "${name}".`);
                    await appCommands.delete(existingCommand.id);
                    continue;
                }

                if (areCommandsDifferent(existingCommand, localCommand)) {
                    await appCommands.edit(existingCommand.id, {
                        name,
                        description,
                        options,
                    });
                    console.log(`Edited command "${name}"`)
                }
            } else {
                if (localCommand.deleted) {
                    console.log(`skipped registering "${name}"`);
                    continue;
                }
                if (!name) {
                    console.log(`Skipping command registration due to missing name`);
                    continue;
                }

                await appCommands.create({
                    name,
                    description,
                    options,
                });
                console.log(`registered "${name}"`);
            }
        }
    } catch (error) {
        console.log(`OOPSIE WOOPSIE!! Uwu We make a fucky wucky!! A wittle fucko boingo! The code monkeys at our headquarters are working VEWY HAWD to fix this! \n ${error}`);
    }

};