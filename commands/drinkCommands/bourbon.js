const drinkSchema = require('../../schemas/drinkSchema.js');

// function mentionChecker(mention) {
//     let matches = mention.match('/^<@!?(\d+)>$/');

//     if(matches) {
//         return true;
//     } else {
//         return false;
//     }

// }

module.exports = {

    category: 'Drink',
    name: 'bourbon',
    aliases: ['bourbonme', ],
    description: 'Responds with a bourbon delivery to requesting user or targeted user.',
    minArgs: 0,
    maxArgs: -1,

    run: async (message, args) => {
        
        const id = message.guild.id;
        let flagEmptyList = false;
        const results = await drinkSchema.findOne({
            _id: id
        }, function(err,doc) {
            if (doc === null) {
                message.reply(`The drink list on this server is empty please add drinks with the \`\`!drinkadd\`\` command!`); // Need to change later to work with muti server prefixes.
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

            let bourbon = reply.find(element => element.includes(":bourbon:"));
            if (bourbon != null) {
                if(args.length > 0){
                    let mentionTest = args[0].indexOf('@');
                    let roleMentionTest = args[0].indexOf('&');
                    if (mentionTest > 0 && roleMentionTest < 0) {
                        let sender = message.author.username;
                        let target = message.mentions.users.first();

                        message.channel.send(`${target},\n${sender} has purchased you a ${bourbon}!`);
                    } else {
                        message.reply(`Your ${bourbon} has been delivered!`);
                    }
                } else {
                    message.reply(`Your ${bourbon} has been delivered!`);
                }
            } else {
                message.reply(`It does not appear that bourbon has been added to the drink database!`)
            }

        }
    }

}