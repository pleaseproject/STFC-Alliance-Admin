module.exports = {
    name: 'nickname',
    aliases: ['tag', ],
    description: 'Responds with a beer delivery to requesting user or targeted user.',
    minArgs: 1,
    maxArgs: 2,

    run: (message, args) => {
        const owner = message.guild.owner.id;
        const target = message.mentions.users.first();
        const botRole = message.guild.roles.cache.find(r => r.name === "STFC-Alliance-Admin");
        let mentionTest = args[0].indexOf('@');

        if (mentionTest > 0) {
            let member = message.guild.members.cache.get(target.id)
            if(member == owner) {
                message.reply("The user's nickname I am trying to change is either a higher role than me or a server owner!")
                return;
            }

            args.shift()
            const nickname = args.join(' ')
            let storeUsername = target.username;

            member.setNickname(`[${nickname}] ${storeUsername}`);
            message.reply(`The nickname of ${target.username} has been changed!`)
        } else {
            let member = message.guild.members.cache.get(message.author.id)
            // Need to add check to see if bot's role is higher than commanding user.
            if(member == owner) {
                message.reply("You are the server owner and I can not change your nickname!")
                return;
            }

            args.shift()
            const nickname = args.join(' ')
            let storeUsername = message.author.username;

            member.setNickname(`[${nickname}] ${storeUsername}`);
            message.reply('Your nickname has been changed!')
        }

    }
}