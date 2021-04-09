const scheduledMessageChannelSchema = require('../../schemas/scheduledMessageChannelSchema');

module.exports = {
    requiredPermissions: ['ADMINISTRATOR'],
    category: 'Util',
    aliases: ['setsch', ],
    run: async (message) => {
    const { guild, channel } = message
    console.log(`HERE IS THE CHANNEL ID: ${channel.id}`)
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