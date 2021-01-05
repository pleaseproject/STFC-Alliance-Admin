const allianceSchema = require('../../schemas/allianceSchema.js');

module.exports = {

    category: 'Alliance',
    name: 'allianceadd',
    aliases: ['alliancea', 'sadd', 'adds', 'allianceupdate', 'supdate', 'updates'],
    description: 'Adds new alliance to the database',
    minArgs: 3,
    maxArgs: -1,

    run: async ({ message, args }) => {

        const guildId = message.guild.id;
        allianceId = args[0].toLowerCase();

        const allianceStatus = {
            allianceTag: args[0],
            allianceStatus: args[1],
            reason: args.slice(2).join(' '),
            lastUpdated: new Date().getTime(),
        }

        await allianceSchema.findOneAndUpdate({
            guildId: guildId,
            allianceId: allianceId,
        }, {

            guildId: guildId,
            allianceId: allianceId,
            $push: {

                allianceStatus: allianceStatus

            }
        }, {
            upsert: true,
        })

        message.reply(`${allianceId} has been added/updated in the database!`);

    }

}