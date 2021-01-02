const { DiscordAPIError } = require('discord.js');
const drinkSchema = require('../../schemas/allianceSchema.js');
const discord = require('discord.js');

module.exports = {

    category: 'Alliance',
    name: 'testaa',
    aliases: [''],
    description: 'Adds new alliance to the database.',
    minArgs: 1,
    maxArgs: 1,

    run: async (message, args) => {
        const guildId = message.guild.id;
        allianceId = args[0].toLowerCase();
        var arr = new Array(2);
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

        collector.on('end', collected => {
            console.log(`Collected ${collected.size} messages`)

            let counter = 0
            collected.forEach((value) => {
                console.log(questions[counter++], value.content)
                arr.push(value.content);
            })
        })
        console.log(arr);
        // const allianceStatus = {
        //     allianceTag: allianceId,
        //     allianceStatus: await status,
        //     reason: await reason,
        //     lastUpdated: new Date().getTime(),
        // }

        // await drinkSchema.findOneAndUpdate({
        //     guildId: guildId,
        //     allianceId: allianceId,
        // }, {

        //     guildId: guildId,
        //     allianceId: allianceId,
        //     $push: {

        //         allianceStatus: allianceStatus

        //     }
        // }, {
        //     upsert: true,
        // })

        // message.reply(`${allianceId} has been added/updated in the database!`);

    }

}