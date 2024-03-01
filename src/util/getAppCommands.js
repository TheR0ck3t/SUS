module.exports = async(bot, guild_Id) => {

    let appCommands;


    if (guild_Id) {
        const guild = await bot.guilds.fetch(guild_Id);
        appCommands = guild.commands;
    } else {
        appCommands = await bot.application.commands;
    }

    await appCommands.fetch();
    return appCommands;
}