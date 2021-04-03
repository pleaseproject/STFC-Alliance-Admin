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
        var i;
        const iterationsQuestion = `How many scheduled messages?`
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
                for (i = 0; i < iterations; i++) {
                    questions.push(`What is the location for this TC event?`);
                    questions.push(`What time will this event occur?`);
                    console.log(questions[i]);
                }
                //ScheduleCollector();
            })
            .catch((err) => console.log(err));
            console.log(questions)
        function ScheduleCollector() {

            let counter = 0;
            const collector = new discord.MessageCollector(message.channel, filter, {
                max: iterations * 2,
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
            });
    
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