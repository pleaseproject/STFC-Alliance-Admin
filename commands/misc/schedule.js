const scheduledSchema = require('../../schemas/scheduleSchema');
const momentTimezone = require('moment-timezone')
const discord = require('discord.js');

module.exports = {
    name: 'schedule',
    description: 'Allows a user to schedule messages to be sent as certain times',
    category: 'Util',
    minArgs: 0,

    init: (client) => {
        const checkForPosts = async () => {
          const query = {
            date: {
              $lte: Date.now(),
            },
          }
    
          const results = await scheduledSchema.find(query)
    
          for (const post of results) {
            const { guildId, channelId, content } = post
    
            const guild = await client.guilds.fetch(guildId)
            if (!guild) {
              continue
            }
    
            const channel = guild.channels.cache.get(channelId)
            if (!channel) {
              continue
            }
    
            channel.send(content)
          }
    
          await scheduledSchema.deleteMany(query)
    
          setTimeout(checkForPosts, 1000 * 10)
        }
    
        checkForPosts()
    },

    run: async ({ message, args }) => {

        const guildId = message.guild.id;
        let channelId;
        let content;

        async function StoreData() {
            const timeZone = 'Etc/UTC';
            clockType = 'PM';
            const currentDate = momentTimezone.utc().format('YYYY/MM/DD');
            console.log(`CURRENT DATE AND TIME IS: ${currentDate}`);
            console.log(`CURRENT DATE AND TIME IN CST IS: ${momentTimezone.tz('America/Chicago').format()}`);

            const targetDate = momentTimezone.tz(
                `${currentDate} ${timeArr[0]} ${clockType}`,
                'YYYY-MM-DD HH:mm A',
                timeZone
            );

            await new scheduledSchema({
                date: targetDate.valueOf(),
                guildId: guildId,
                channelId: channelId,
                content: 'test',
            }).save()
        }


    }

}