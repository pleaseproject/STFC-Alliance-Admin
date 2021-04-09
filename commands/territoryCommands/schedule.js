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
      let content = [];
      let timeArr = [];
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
        let tempSystem = arr[0].toLowerCase();
        let system = tempSystem.charAt(0).toUpperCase() + tempSystem.slice[1];
        const results = await territorySchema.findOne({
          system
        });
        console.log(`HERE IS THE SYSTEM: ${system}`);
        content[0] = `@everyone We have a territory event in the System: \`\`${results.system}\`\` in 1 Hour. 30 Minutes before please hold off on armadas and prepare to send ships. This event will last \`\`${results.duration} Minutes\`\`.`;
        content[1] = `@everyone We have a territory event in the System: \`\`${results.system}\`\` in 30 Minutes. Please hold off on armadas and begin sending ships. This event will last \`\`${results.duration} Minutes\`\`.`;
        const currentDate = momentTimezone.utc().format('YYYY/MM/DD');

        let targetDate = momentTimezone.utc(
          `${currentDate} ${results.milTimeUTC}`,
          'YYYY-MM-DD HH:mm A'
        );
        let timeArr = [
          momentTimezone.utc(
            `${currentDate} ${results.milTimeUTC}`,
          'YYYY-MM-DD HH:mm A'
          ).subtract(1, 'hour'),
          momentTimezone.utc(
            `${currentDate} ${results.milTimeUTC}`,
          'YYYY-MM-DD HH:mm A'
          ).subtract(30, 'minutes')
        ]
        console.log(timeArr);
        for (var i = 0; i < timeArr.length; i++) {
          await new scheduledSchema({
            date: timeArr[i].valueOf(),
            guildId: guildId,
            channelId: channelId,
            content: content[i],
          }).save();
        }
      }

  }

}