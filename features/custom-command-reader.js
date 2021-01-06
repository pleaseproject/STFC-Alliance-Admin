const prefix = '!';
const customCommandSchema = require('../schemas/customCommandSchema.js');

module.exports = async (client) => {

    client.on('message', async (message) => {
        //console.log(`${message.guild.name} => ${message.channel.name} => ${message.author.username}: ${message.content}`);
        if (message.content.startsWith(prefix)) {
            const guildId = message.guild.id;
            let commandName = message.content.substring(1, message.content.indexOf(' '));
            
            const results = await customCommandSchema.findOne({
                guildId: guildId,
                commandName: commandName
            })

            if (!results) {
                console.log(`No custom command such as ${commandName}.`);
                return;
            }

            message.reply(`${results.response}`);
    
        }
    })
}

