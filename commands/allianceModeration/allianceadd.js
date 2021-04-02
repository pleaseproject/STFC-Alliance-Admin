const allianceSchema = require('../../schemas/allianceSchema.js');
const discord = require('discord.js');

module.exports = {

    category: 'Alliance',
    name: 'allianceadd',
    aliases: ['alliancea', 'sadd', 'adds', 'allianceupdate', 'supdate', 'updates'],
    description: 'Adds new alliance to the database',
    expectedArgs: "<Alliance Tag>",
    minArgs: 1,
    maxArgs: 1,

    run: async ({ message, args }) => {
        const guildId = message.guild.id;
        let allianceId = args[0].toLowerCase();
        let arr = [];
        const questions = [
            `What is the status for \`\`${allianceId}\`\`?`,
            `What is the reason for this status?`
        ]
        let counter = 0;
        let filter = m => m.author.id === message.author.id;

        const collector = new discord.MessageCollector(message.channel, filter, {
            max: questions.length,
            time: 1000 * 45 // 45 seconds per answer?
        })

        message.channel.send(questions[counter++])
        collector.on('collect', m => {
            if (counter < questions.length) {
                m.channel.send(questions[counter++])
            }
        })

        collector.on('end', async collected => {
            console.log(`Collected ${collected.size} messages`)

            let counter = 0
            collected.forEach((value) => {
                console.log(questions[counter++], value.content)
                arr.push(value.content);
            })

            if (arr[0] != null && arr[1] != null) {
                const allianceStatus = {
                    allianceTag: allianceId,
                    allianceStatus: arr[0],
                    reason: arr[1],
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
            } else {
                message.reply(`There wasn an error during the adding of \`\`${allianceId}. This may be due to a time out! Please try your request again.`);
            } 

        })
    }

}