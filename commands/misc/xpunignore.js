const xpignoreSchema = require('../../schemas/xpignoreSchema')

module.exports = {
    name: 'xpunignore',
    aliases: ['xpr', 'xpu'],
    description: 'Removes channels from the ignored list for XP gain.',
    category: 'Util',
    minArgs: 1,
    maxArgs: 1,

    run: async (message) => {

        const guildId = message.guild.id;
        const channelId = message.mentions.channels.first();

        await xpignoreSchema.update(
            {
              guildId: guildId,
            },{
            $pull: {
                channelId: channelId,
            }
        }, function(err, doc) {
            if (doc === null) {
                message.reply(`Channel: ${message.mentions.channels.name.first()} is not an XP ignored channel!`);
            } else {
                message.reply(`Channel: ${message.mentions.channels.name.first()} has been removed from the XP ignore list!`);
            }
        });

    },
};