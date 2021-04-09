const scheduledSchema = require('../../schemas/scheduledSchema');
const territorySchema = require('../../schemas/territorySchema');
const momentTimezone = require('moment-timezone')
const discord = require('discord.js');

module.exports = {
    name: 'schedule',
    description: 'Allows a user to schedule messages to be sent as certain times',
    category: 'Util',
    minArgs: 1,
    maxArgs: 1,

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
      let questions = ['What is the territory name?'];
      let arr = [];
      
      let filter = m => m.author.id === message.author.id;
      channelId = args[0];
      channelId = channelId.substring(
          channelId.lastIndexOf("#") + 1,
          channelId.lastIndexOf(">")
      );

      ScheduleCollector();

      function ScheduleCollector() {

          let counter = 0;
          const collector = new discord.MessageCollector(message.channel, filter, {
              max: questions.length,
              time: 1000 * 45 // 45 seconds per answer?
          });            
          message.channel.send(questions[counter++]);
          collector.on('collect', m => {    
              if (counter < questions.length) {
                  m.channel.send(questions[counter++])
              }
          });
          
          collector.on('end', async collected => {
              collected.forEach((value) => {
                  arr.push(value.content);
              });
              console.log(`Collected ${collected.size} messages`)
              console.log(arr);

              StoreData();

          });
  
      }

      async function StoreData() {
        let system = arr[0];
        const results = await territorySchema.findOne({
          system
        });
        content = `@everyone We have a territory event in ${results.system} in 30 minutes. Please hold off on armadas and prepare to send ships. This event will last ${results.duration}.`
        const timeZone = 'Etc/UTC';
        const currentDate = momentTimezone.utc().format('YYYY/MM/DD');
        console.log(`CURRENT DATE AND TIME IS: ${currentDate}`);
        //console.log(`CURRENT DATE AND TIME IN CST IS: ${momentTimezone.tz('America/Chicago').format()}`);

        let targetDate = momentTimezone.tz(
          `${currentDate} ${results.timeUTC} ${results.clockType}`,
          'YYYY-MM-DD HH:mm A',
          'America/Chicago'
          //timeZone
        );

        console.log(`HERE IS THE STORED TARGET DATE: ${targetDate}`);
        //targetDate = targetDate.subtract(1, 'hour');
        
        await new scheduledSchema({
          date: targetDate.valueOf(),
          guildId: guildId,
          channelId: channelId,
          content: content,
        }).save()
      }

  }

}