const mongo = require('../../mongo');
const allianceSchema = require('../../schemas/allianceSchema');
const Discord = require('discord.js');

module.exports = {
    name: 'alliancestatus',
    aliases: ['status', ],
    description: 'Returns most current status of specified alliance to the user.',
    minArgs: 1,
    maxArgs: 1,

    run: async (message, args, text) => {

        const guildId = message.guild.id;
        const allianceId = args[0].toLowerCase();

        let embedPoll = new Discord.MessageEmbed()

        const results = await allianceSchema.findOne({
            guildId,
            allianceId,
        })

        let reply = [];

        for (const status of results.allianceStatus) {
            const {
                allianceTag,
                allianceStatus,
                reason,
                lastUpdated
            } = status

            let embedStatus = new Discord.MessageEmbed()
                .setTitle('Alliance Status:')
                .setDescription(`Below is the returned Status with alliance **[${allianceTag}]**`)
                .addFields({
                    name: "Alliance Tag",
                    value: `${allianceTag}`
                })
                .addFields({
                    name: "Status with our alliance",
                    value: `${allianceStatus}`
                })
                .addFields({
                    name: "Reason",
                    value: `${reason}`
                })
                .addFields({
                    name: "Last Updated",
                    value: `${new Date(lastUpdated).toLocaleDateString()}`
                })
                .setColor('BLUE')

            reply.push(embedStatus);
        }

        message.channel.send(reply[reply.length - 1]);
    }
}