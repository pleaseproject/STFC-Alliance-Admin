const DiscordJS = require('discord.js');
const WOKCommands = require('wokcommands');
require('dotenv').config();

// Will revisit mongo connection as it may already be connected.
const mongo = require('./mongo');

const client = new DiscordJS.Client();

client.on('ready', async () => {
    console.log('READY');

    await mongo();

    new WOKCommands(client, 'commands', 'features')
        .setMongoPath(process.env.MONGO_URI)
        .setSyntaxError('Incorrect syntax! Please use {PREFIX}{COMMAND} {ARGUMENTS}')

});

client.login(process.env.TOKEN);