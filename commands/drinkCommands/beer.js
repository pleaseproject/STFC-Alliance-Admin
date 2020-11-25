const drinkSchema = require('../../schemas/drinkSchema.js');

module.exports = {

    name: 'beer',
    aliases: ['beerme', ],
    description: 'Responds with a beer delivery to requesting user or targeted user.',
    category: 'Drink',
    minArgs: 0,
    maxArgs: 1,

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

        let beer = reply.find(element => element.includes(":beer:"));
        if (beer != null) {
            if(args.length > 0){
                let mentionTest = args[0].indexOf('@');
                let roleMentionTest = args[0].indexOf('&');
                if (mentionTest > 0 && roleMentionTest < 0) {
                    let sender = message.author.username;
                    let targetUser = message.mentions.users.first();
                    message.channel.send(`${targetUser},\n${sender} has purchased you a ${beer}!`);
                } else {
                    message.reply(`Your ${beer} has been delivered!`);
                }
            } else {
                message.reply(`Your ${beer} has been delivered!`);
            }
        } else {
            message.reply(`It does not appear that beer has been added to the drink database!`)
        }

    }

}