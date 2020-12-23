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

    new WOKCommands(client, 'commands', 'features')
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