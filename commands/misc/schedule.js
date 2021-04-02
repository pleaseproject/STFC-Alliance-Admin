module.exports = {
    name: 'schedule',
    description: 'Allows a user to schedule messages to be sent as certain times',
    category: 'Util',
    minArgs: 0,

    run: async ({ message, args }) => {
        const guildId = message.guild.id;
        let iterations;
        const question = `How many scheduled messages?`
        const repeatedQuestions = [
            `What is the location for this TC event?`,
            `What time will this event occur?`,
        ]
        let counter = 0;
        let filter = m => m.author.id === message.author.id;

        const collector = new discord.MessageCollector(message.channel, filter, {
            max: questions.length,
            time: 1000 * 45 // 45 seconds per answer?
        })

        message.channel.send(question)
        collector.on('collect', m => {
        
        })

        collector.on('end', async collected => {
            console.log(`Collected ${collected.size} messages`)
            collected.forEach((value) => {
                console.log(question, value.content)
                iterations= value.content;
            })

        })

        message.channel.send(`Question Asked: ${question} Iterations Received: ${iterations}`);


        // message.channel.send(questions[counter++])
        // collector.on('collect', m => {
        //     if (counter < questions.length) {
        //         m.channel.send(questions[counter++])
        //     }
        // })

        // collector.on('end', async collected => {
        //     console.log(`Collected ${collected.size} messages`)

        //     let counter = 0
        //     collected.forEach((value) => {
        //         console.log(questions[counter++], value.content)
        //         arr.push(value.content);
        //     })

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

        // })
    }
};