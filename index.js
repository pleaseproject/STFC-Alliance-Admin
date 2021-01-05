const DiscordJS = require('discord.js');
const WOKCommands = require('wokcommands');
require('dotenv').config();
const mongo = require('./mongo');

const client = new DiscordJS.Client({
    partials: ['MESSAGE', 'REACTION'],
})

client.on('ready', async () => {
    console.log('READY');
    const messagesPath = '';

    await mongo();

    new WOKCommands(client, {
        commandsDir: 'commands',
        featureDir: 'features',
        messagesPath,
        showWarns: true,
    })
        .setMongoPath(process.env.MONGO_URI)
        .setBotOwner(['139858712801181697'])
        .setDisplayName('STFCAA Commands')
        .setCategoryEmoji('Alliance', '🔫')
        .setCategoryEmoji('Drink', '🍺')
        .setCategoryEmoji('Fun', '🎮')
        .setCategoryEmoji('Util', '💻')
        .setCategoryEmoji('Misc', '❓')

});

client.login(process.env.TOKEN);