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
        let status;
        let reason;
        let allianceStatus;

        let filter = (message) => !message.author.bot;
        let options = {
            max: 1,
            time: 15000
        };
        let collectorOne = message.channel.createMessageCollector(filter, options);
        let collectorTwo = message.channel.createMessageCollector(filter, options);

        message.reply(`Please provide ${allianceId}'s status.`);
        await collectorOne.on('collect', (m) => {
            message.reply(`Alliance ${allianceId}'s new status: ${m.content}`);               
        });
        await collectorOne.on('end', (collected) => {
            status = collected.content;
            console.log(`Alliance ${allianceId}'s new status: ${collected.status}`);               
        });

        message.reply(`Please provide ${allianceId}'s status.`);
        await collectorTwo.on('collect', (m) => {
            message.reply(`Alliance ${allianceId}'s new status reason: ${m.content}`);               

        });
        await collectorTwo.on('end', (collected) => {
            reason = collected.content;
            console.log(`Alliance ${allianceId}'s new status reason: ${reason}`);
            allianceStatus = {
                allianceTag: allianceId,
                allianceStatus: status,
                reason: reason,
                lastUpdated: new Date().getTime(),    
            }              
        });

        await drinkSchema.findOneAndUpdate({
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