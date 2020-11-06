const mongo = require('../../mongo');
const drinkSchema = require('../../schemas/drinkSchema.js');

module.exports = {

    name: 'drink',
    description: 'Responds random drink in database',
    minArgs: 0,
    maxArgs: -1,

    run: async (message, args) => {
        const id = message.guild.id;
        const results = await drinkSchema.findOne({
            _id: id
        })

        let reply = []
        let i = 0;

        for (const drinks of results.drink) {

            console.log('Drink:', drinks);
            reply[i] = `${drinks}`;
            i++;

        }

        var tempNum = Math.floor(Math.random() * reply.length);
        if(args.length > 0){
            let mentionTest = args[0].indexOf('@');
            if (mentionTest > 0) {
                let sender = message.author.username;
                let target = message.mentions.users.first();

                message.channel.send(`${target},\n${sender} has purchased you a random drink! Here is your ${reply[tempNum]}!`);
            }
        } else {
            message.reply(`The bartender has searched his collection and found the perfect drink for you! Here is your ${reply[tempNum]}!`);
        }


    }

}