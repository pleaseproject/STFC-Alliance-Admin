const DiscordJS = require('discord.js');
const WOKCommands = require('wokcommands');
require('dotenv').config();
const mongo = require('./mongo');

const client = new DiscordJS.Client({
    partials: ['MESSAGE', 'REACTION'],
})

client.on('ready', async () => {
    console.log('READY');

    await mongo();

    new WOKCommands(client, {
        commandsDir: 'commands',
        featureDir: 'features',
        messagesPath: 'messages.json',
        showWarns: true,
    })
        .setMongoPath(process.env.MONGO_URI)
        .setBotOwner(['139858712801181697'])
        .setCategorySettings([
            {
                name:'Alliance',
                emoji: '🔫'
            },
            {
                name: 'Drink',
                emoji: '🍺'
            },
            {
                name: 'Fun',
                emoji: '🎮'
            },
            {
                name: 'Util',
                emoji: '💻'
            },
            {
                name: 'Misc',
                emoji: '❓'
            },
            {
                name: 'Admin Testing',
                hidden: true
            }
        ])

});

client.login(process.env.TOKEN);