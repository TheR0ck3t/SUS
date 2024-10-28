const { ActivityType } = require('discord.js')

module.exports = async(bot) => {
    const customStatus = [{
            name: 'Reading nhentai',
            type: ActivityType.Streaming,
            url: 'https://www.youtube.com/watch?v=4feUSTS21-8'
        },
        {
            name: 'Reading nhentai',
            type: ActivityType.Streaming,
            url: 'https://www.youtube.com/watch?v=bO-NaEj2dQ0'
        },
        {
            name: 'Reading nhentai',
            type: ActivityType.Streaming,
            url: 'https://www.youtube.com/watch?v=cNgyuHtBBW8'
        },
        {
            name: 'Reading nhentai',
            type: ActivityType.Streaming,
            url: 'https://www.youtube.com/watch?v=K052uRykOJ8'
        },
        {
            name: 'Reading nhentai',
            type: ActivityType.Streaming,
            url: 'https://www.youtube.com/watch?v=K052uRykOJ8'
        },
        {
            name: 'Reading e621',
            type: ActivityType.Streaming,
            url: 'https://www.youtube.com/watch?v=Ie57fr8pCko'
        },
        {
            name: 'Reading e621',
            type: ActivityType.Streaming,
            url: 'https://www.youtube.com/watch?v=EIgToU0m4Pc'
        }
    ]

    setInterval(() => {
        let random = Math.floor(Math.random() * customStatus.length);
        bot.user.setActivity(customStatus[random]);
    }, 10000);
}