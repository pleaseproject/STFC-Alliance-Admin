const Discord = require('discord.js');

module.exports = {

    name: 'poll',
    description: 'Creates a poll in mentioned channel.',
    minArgs: 1,
    maxArgs: -1,

    run: async (message, args) => {

        let pollChannel = message.mentions.channels.first();
        let pollDescription = args.slice(1).join(' ');

        let embedPoll = new Discord.MessageEmbed()
            .setTitle('😲 New Poll! 😲')
            .setDescription(pollDescription)
            .setColor('YELLOW')
        let msgEmbed = await pollChannel.send(embedPoll);
        await msgEmbed.react('👍')
        await msgEmbed.react('👎')

    }

}