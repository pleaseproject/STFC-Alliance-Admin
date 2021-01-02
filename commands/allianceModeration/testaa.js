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

        let counter = 1;
        let filter = (message) => !message.author.bot;
        let options = {
            max: 2,
            time: 15000
        };
        let collector = message.channel.createMessageCollector(filter, options);

        collector.on('collect', (m) => {
            // console.log(`collected: ${m.content}`);
            if (x == 1) {
                message.reply(`Please provide ${allianceId}'s status.`);
                console.log(`collected: ${m.content}`);
                counter++;
            } else if (x == 2) {
                message.reply(`Please provide reason for ${allianceId}'s status.`);
                console.log(`collected: ${m.content}`);
                counter++;
            }                
        });
        collector.on('end', (collected) => {
            console.log(`collected ${collected.size} items (${collected.content})`);
        });
        // const allianceStatus = {
        //     allianceTag: allianceId,
        //     allianceStatus: args[1],
        //     reason: args.slice(2).join(' '),
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