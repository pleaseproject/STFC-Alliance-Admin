const scheduledMessageChannelSchema = require('../../schemas/scheduledMessageChannelSchema');

const cache = new Map();

const loadData = async () => {
    const results = await scheduledMessageChannelSchema.find();

    for (const result of results) {
        cache.set(result._id, result.channelId);
    }
}
loadData();

module.exports = {
    requiredPermissions: ['ADMINISTRATOR'],
    category: 'Util',
    name: 'setScheduledMessageChannel',
    aliases: ['setsch', ],
    run: async (message) => {
        const guildId = message.guild.id;
        const channelId = message.channel.id;
        console.log(`HERE IS THE CHANNEL ID: ${channelId}`)
        await scheduledMessageChannelSchema.findOneAndUpdate(
            {
                _id: guildId,
            },
            {
                _id: guildId,
                channelId: channelId,
            },
            {
                upsert: true,
            });

        cache.set(guildId, channelId);

        message.reply('Scheduled Message Channel Set');
    },
}