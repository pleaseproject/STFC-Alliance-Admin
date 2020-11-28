const xpignoreSchema = require('../../schemas/xpignoreSchema')

module.exports = {
    name: 'xpignore',
    aliases: ['xpi'],
    description: 'Sets channels to be ignored for XP gain.',
    category: 'Util',
    minArgs: 1,
    maxArgs: 1,

    run: (message, args) => {

        const guildId = message.guild.id;
        const channelId = message.mentions.channels.first();

        await xpignoreSchema.findOneAndUpdate(
            {
              guildId: guildId,
              channelId: channelId,
            },
            {
              guildId: guildId,
              channelId: channelId,
            },
            {
              upsert: true,
            }
        )

        message.reply(`Channel ${channelId} has been added to the XP ignore list.`);

    },
};