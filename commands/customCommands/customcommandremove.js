const customCommandSchema = require('../../schemas/customCommandSchema.js');
const discord = require('discord.js');

module.exports = {

    category: 'Fun',
    name: 'customcommandremove',
    aliases: ['ccr',],
    description: 'Removes custom command from the database.',
    minArgs: 1,
    maxArgs: 1,
    expectedArgs: "<Command Name>",

    run: async ({ message, args }) => {

        const guildId = message.guild.id;
        const commandName = args[0].toLowerCase();

        const results = await customCommandSchema.deleteOne({
            guildId: guildId,
            commandName: commandName,
        })

        if (results.n === 0) {
            message.channel.send(`There was an error trying to delete \`\`${commandName}\`\` from the database. This may be because \`\`${commandName}\`\` is not in the database.`);
        } else {
            message.reply(`\`\`${commandName}\`\` has been removed from the database!`);
        }

    }

}