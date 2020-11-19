const allianceSchema = require('../../schemas/allianceSchema.js');

module.exports = {

    name: 'allianceremove',
    aliases: ['sremove', 'removealliance', 'statusremove', ],
    description: 'Removes specified alliance from the database.',
    minArgs: 1,
    maxArgs: 1,

    run: async (message, args) => {

        const guildId = message.guild.id;
        allianceId = args[0].toLowerCase();

        await allianceSchema.deleteOne({
            guildId: guildId,
            allianceId: allianceId,
        }, function (err) {
            if (err) {
                return message.send(`There was an error trying to delete ${allianceId} from the database. This may be because ${allianceId} is not in the database. If you are unsure please use the \`\`!alliancelist\`\` command!`);
            } else {
                message.reply(`${allianceId} has been removed from the database!`);
            }
        })


    }

}