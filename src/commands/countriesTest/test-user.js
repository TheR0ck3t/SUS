module.exports = {
    name: 'test',
    description: 'Test command',
    type: 3,
    flags: 6,

    callback: async(bot, interaction) => {
        const user = interaction.user;
        await interaction.reply({
            content: `Hello <@${user.id}>!`,
            ephemeral: true
        });
        await interaction.followUp({
            content: 'PENIS!'
        });
    }
}