const prefix = '!';
const customCommandSchema = require('../schemas/customCommandSchema.js');
let commandName = '';

module.exports = (client) => {
    client.on('message', (message) => {
        if (message.content.startsWith(prefix)) {
            console.log(message.content.substring(1));
        }
    })

    client.on('message', async (message) => {
        //console.log(`${message.guild.name} => ${message.channel.name} => ${message.author.username}: ${message.content}`);
        if (message.content.startsWith(prefix)) {
            const guildId = message.guild.id;
            console.log(commandName);
            const results = await customCommandSchema.findOne({
                guildId: guildId,
                commandName: message.content.substring(1, message.content.indexOf(' '))
            })

            if (!results) {
                console.log(`No custom command such as ${message.content.substring(1, message.content.indexOf(' '))}.`);
                return;
            }

            message.reply(`${results.response}`);
    
        }
    })
}

