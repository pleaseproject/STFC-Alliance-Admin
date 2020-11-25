const DiscordJS = require('discord.js');
const WOKCommands = require('wokcommands');
require('dotenv').config();
const mongo = require('./mongo');

const client = new DiscordJS.Client();

client.on('ready', async () => {
    console.log('READY');

    await mongo();

    new WOKCommands(client, 'commands', 'features')
        .setMongoPath(process.env.MONGO_URI)
        .setSyntaxError('Incorrect syntax! Please use {PREFIX}{COMMAND} {ARGUMENTS}')
        .setDisplayName('STFCAA Commands')
        .setCategoryEmoji('Alliance', '🔫')
        .setCategoryEmoji('Drink', ':beer:')
        //.setCategoryEmoji('Fun', '🎮')
        //.setCategoryEmoji('Util', '💻')
        //.setCategoryEmoji('Misc', '❓')

});

client.login(process.env.TOKEN);