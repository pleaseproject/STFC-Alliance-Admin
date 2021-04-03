const discord = require('discord.js');

module.exports = {
    name: 'schedule',
    description: 'Allows a user to schedule messages to be sent as certain times',
    category: 'Util',
    minArgs: 0,

    run: async ({ message, args }) => {
        const guildId = message.guild.id;
        let iterations;
        let iterationCounter = 1;
        let arr = [];
        const iterationsQuestion = `How many scheduled messages?`
        const questions = [
            `What is the location for this TC event?`,
            `What time will this event occur?`,
        ]
        let counter = 0;
        let filter = m => m.author.id === message.author.id;

        const iterationCollector = new discord.MessageCollector(message.channel, filter, {
            max: 1,
            time: 1000 * 45 // 45 seconds per answer?
        });

        const collector = new discord.MessageCollector(message.channel, filter, {
            //max: questions.length,
            time: 1000 * 45 // 45 seconds per answer?
        });

        message.channel.send(iterationsQuestion)
        iterationCollector.on('collect', m => {
            iterations = m.content;
        });

        iterationCollector.on('end', collected => {
            console.log(`Question Asked: ${iterationsQuestion} Iterations Received: ${iterations}`);
            message.channel.send(questions[0]);
            collector.on('collect', m => {
                if (iterationCounter <= iterations) {
                    arr.push(m.content);
    
                    m.channel.send(questions[1]);
                    arr.push(m.content);
                    message.channel.send(questions[0]);
                    iterationCounter++;
                }
            });
            collector.on('end', async collected => {
                console.log(`Collected ${collected.size} messages`)
                console.log(arr);
            });
        });



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