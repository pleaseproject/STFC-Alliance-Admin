const mongo = require('../../mongo');
const allianceSchema = require('../../schemas/allianceSchema');
const Discord = require('discord.js');

module.exports = {
    name: 'alliancehistory',
    aliases: ['statushistory', 'statush', 'history', ],
    description: 'Returns all history of an alliance',
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

        if (!results) {
            console.log(`no such alliance`);
            message.reply(`There is no such alliance as **\`\`${args[0]}\`\`** in the database!`);
            return;
        }

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

        let k = 0;
        for (i = (reply.length - 1); i >= 0; i--) {

            if (k > 2) {
                break;
            }

            k++;
            message.channel.send(reply[i]);
        }
    }
}