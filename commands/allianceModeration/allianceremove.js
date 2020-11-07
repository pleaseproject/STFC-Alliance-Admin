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
        })

        message.reply(`${allianceId} has been removed from the database!`);

    }

}