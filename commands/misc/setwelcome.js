const welcomeSchema = require('../../schemas/welcomeSchema.js');

module.exports = {

    name: 'setwelcome',
    description: 'Sets the welcome channel',
    requiredPermissions: ['ADMINISTRATOR'],
    minArgs: 0,
    maxArgs: 0,

    run: async (message) => {

        const guildId = message.guild.id
        const channelId = message.channel.id

        await welcomeSchema.findOneAndUpdate(
            {
                guildId: guildId,
            },
            {
                guildId: guildId,
                channelId: channelId,
            },
            {
                upsert: true,
            }
        )

        message.reply('Welcome channel has been set!');

    }


}