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
    aliases: ['setsch', ],
    run: async (message) => {
    const { guild, channel } = message

    await scheduledMessageChannelSchema.findOneAndUpdate(
      {
        _id: guild.id,
      },
      {
        _id: guild.id,
        channelId: channel.id,
      },
      {
        upsert: true,
      }
    );

    cache.set(guild.id, channel.id);

    message.reply('Scheduled Message Channel Set');
  },
}

module.exports.getChannelId = (guildId) => {
  return cache.get(guildId);
}