require('dotenv').config();
const { IntentsBitField, Client, ActivityType } = require('discord.js');
const eventHandler = require('./handlers/eventHandler');

const bot = new Client({
    intents: [
        IntentsBitField.Flags.Guilds,
        IntentsBitField.Flags.GuildMembers,
        IntentsBitField.Flags.GuildMessages,
        IntentsBitField.Flags.MessageContent,

    ]
});

eventHandler(bot);

bot.login(process.env.Token);