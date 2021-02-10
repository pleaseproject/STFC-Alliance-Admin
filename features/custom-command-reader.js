const prefix = '!';
const customCommandSchema = require('../schemas/customCommandSchema.js');
let commandName = '';

module.exports = (client) => {
    client.on('message', async (message) => {
        //console.log(`${message.guild.name} => ${message.channel.name} => ${message.author.username}: ${message.content}`);
        if (message.content.startsWith(prefix)) {
            const guildId = message.guild.id;
            commandName = message.content.slice(message.content.length - (message.content.length - 1)).toLowerCase();
            console.log(commandName);
            const results = await customCommandSchema.findOne({
                guildId: guildId,
                commandName: commandName
            })

            if (!results) {
                console.log(`No custom command such as ${commandName}.`);
                return;
            }

            message.reply(`${results.commandResponse}`);
    
        }
    })
}

