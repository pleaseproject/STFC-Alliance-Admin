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
        let counter = 0;
        let collector = new discord.MessageCollector(message.channel, filter);
        collector.on('collect', (message, col) => {
            console.log('Collecting Alliance Status information.')
            counter++;
            if(counter == 2) collector.stop();
        });

        collector.on('end', collected => {
            console.log('Collected Data:');
            console.log(`${collected}`);
        })
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