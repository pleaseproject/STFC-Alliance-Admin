const allianceSchema = require('../../schemas/allianceSchema');
const Discord = require('discord.js');

module.exports = {

    category: 'Alliance',
    name: 'alliancestatus',
    aliases: ['status', ],
    description: 'Returns most current status of specified alliance to the user.',
    minArgs: 1,
    maxArgs: 1,

    run: async (message, args) => {

        const guildId = message.guild.id;
        const allianceId = args[0].toLowerCase();
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
                .setAuthor(`Executed By: ${message.author.username}`, message.author.avatarURL())
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
                .setTimestamp(Date.now())

            reply.push(embedStatus);
        }

        message.channel.send(reply[reply.length - 1]);
    }
}