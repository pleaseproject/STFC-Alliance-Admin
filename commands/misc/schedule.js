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
        let iterations;
        let channelId;
        let arr = [];
        let locationArr = [];
        let timeArr = [];
        const iterationsQuestion = `How many scheduled messages?`;
        const channelQuestion = `What channel should these messages be posted in?`;
        let questions = [];
        
        let filter = m => m.author.id === message.author.id;

        message.channel.send(iterationsQuestion)
        message.channel
            .awaitMessages(filter,  
                {max: 1, 
                time: 1000 * 45,
                errors: [`time`] 
            })
            .then((collected) => {
                iterations = collected.first();
                for (var i = 0; i < iterations.content; i++) {
                    questions.push(`What is the location for this TC event?`);
                    questions.push(`What time will this event occur?`);
                    console.log(questions[i]);
                }
                message.channel.send(channelQuestion)
                message.channel
                    .awaitMessages(filter,  
                        {max: 1, 
                        time: 1000 * 45,
                        errors: [`time`] 
                    })
                    .then((collect) => {
                        channelId = collect.first()
                        channelId = channelId.content.substring(
                            channelId.content.lastIndexOf("#") + 1,
                            channelId.content.lastIndexOf(">")
                        );
                        console.log(`HERE IS THE CHANNEL ID: ${channelId}`)
                        ScheduleCollector();
                    })
                    .catch((err) => console.log(err));
            })
            .catch((err) => console.log(err));
            console.log(channelId);

        function ScheduleCollector() {

            let counter = 0;
            const collector = new discord.MessageCollector(message.channel, filter, {
                max: questions.length,
                time: 1000 * 45 // 45 seconds per answer?
            });
            console.log(`Question Asked: ${iterationsQuestion} Iterations Received: ${iterations}`);
            
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

                ArraySplit();

                StoreData();

            });
    
        }

        function ArraySplit() {

            for (var i = 0; i < arr.length; i++) {
                if ((i + 2) % 2 == 0) {
                    locationArr.push(arr[i]);
                } else {
                    timeArr.push(arr[i]);
                }
            }

            console.log(`HERE IS THE LOCATION ARRAY: ${locationArr}`);
            console.log(`HERE IS THE TIME ARRAY: ${timeArr}`);

        }

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
        // collector.on('end', async collected => {
        //     console.log(`Collected ${collected.size} messages`)
        //     console.log(arr);
        //     // let counter = 0
        //     // collected.forEach((value) => {
        //     //     console.log(questions[counter++], value.content);
        //     //     arr.push(value.content);
        //     // });

        //     // if (arr[0] != null && arr[1] != null) {
        //     //     const allianceStatus = {
        //     //         allianceTag: allianceId,
        //     //         allianceStatus: arr[0],
        //     //         reason: arr[1],
        //     //         lastUpdated: new Date().getTime(),
        //     //     }
        
        //     //     await allianceSchema.findOneAndUpdate({
        //     //         guildId: guildId,
        //     //         allianceId: allianceId,
        //     //     }, {
        
        //     //         guildId: guildId,
        //     //         allianceId: allianceId,
        //     //         $push: {
        
        //     //             allianceStatus: allianceStatus
        
        //     //         }
        //     //     }, {
        //     //         upsert: true,
        //     //     })

        // });
    }
};