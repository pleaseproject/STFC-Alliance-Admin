module.exports = {
    name: 'slap',
    description: 'Performs a violent action against the mentioned user to get their attention',
    aliases: ['ninjakick', 'bodyslam',],
    category: 'Fun',
    cooldown: '5s',
    minArgs: 1,
    maxArgs: -1,
    expectedArgs: "<Target user's @>",

    run: (message, args, text, client, prefix) => {

        const sender = message.author.username;
        const target = message.mentions.users.first();

        if (message.mentions.users.first() == null) 
        {
            message.reply(`Please be sure to mention a user when performing this command.`);
        }
        else 
        {
            if (message.content.startsWith(`${prefix}ninjakick`))
            {
                message.channel.send(`${target}, you have been ninja kicked by ${sender}.`)
            }
            else if (message.content.startsWith(`${prefix}bodyslam`))
            {
                message.channel.send(`${target}, you have been body slammed by ${sender}.`)
            }
            else
            {
                message.channel.send(`${target}, you have been slapped by ${sender}.`)
            }
        }

    }
}