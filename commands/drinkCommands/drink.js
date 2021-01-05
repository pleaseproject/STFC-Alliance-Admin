const drinkSchema = require('../../schemas/drinkSchema.js');

module.exports = {

    category: 'Drink',
    name: 'drink',
    aliases: ['drinkme', ],
    description: 'Responds random drink in database',
    minArgs: 0,
    maxArgs: -1,

    run: async ({ message, args, prefix }) => {
        
        const id = message.guild.id;
        let flagEmptyList = false;
        const results = await drinkSchema.findOne({
            _id: id
        }, function(err,doc) {
            if (doc === null) {
                message.reply(`The drink list on this server is empty please add drinks with the \`\`${prefix}drinkadd\`\` command!`);
                flagEmptyList = true;
            } else {
                flagEmptyList = false;
            }
        });
        if (!flagEmptyList) {
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
                let roleMentionTest = args[0].indexOf('&');
                if (mentionTest > 0 && roleMentionTest < 0) {
                    let sender = message.author.username;
                    let target = message.mentions.users.first();

                    message.channel.send(`${target},\n${sender} has purchased you a random drink! Here is your ${reply[tempNum]}!`);
                } else {
                    message.reply(`The bartender has searched his collection and found the perfect drink for you! Here is your ${reply[tempNum]}!`);
                }
            } else {
                message.reply(`The bartender has searched his collection and found the perfect drink for you! Here is your ${reply[tempNum]}!`);
            }
        }

    }

}