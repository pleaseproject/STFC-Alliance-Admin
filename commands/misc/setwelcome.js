
const welcomeSchema = require('../../schemas/welcomeSchema')

const cache = new Map()

const loadData = async () => {
  const results = await welcomeSchema.find()

  for (const result of results) {
    cache.set(result.guildId, result.channelId)
  }
}
loadData()

module.exports = {
  requiredPermissions: ['ADMINISTRATOR'],
  run: async (message) => {
    const { guild, channel } = message

    await welcomeSchema.findOneAndUpdate(
      {
        guildId: guild.id,
      },
      {
        guildId: guild.id,
        channelId: channel.id,
      },
      {
        upsert: true,
      }
    )

    cache.set(guild.id, channel.id)

    message.reply('Welcome channel set!')
  },
}

module.exports.getChannelId = (guildId) => {
  return cache.get(guildId)
}