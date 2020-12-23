module.exports = {
    name: 'slap',
    description: 'Slaps mentioned user to get their attention',
    aliases: ['ninjakick',],
    category: 'Fun',
    cooldown: '5s',
    minArgs: 1,
    maxArgs: -1,
    expectedArgs: "<Target user's @>",

    run: (message, args) => {

        const sender = message.author.username;
        const target = message.mentions.users.first();

        if (message.mentions.users.first() == null) 
        {
            message.reply(`Please be sure to mention a user when performing this command.`);
        }
        else 
        {
            //var commandCheck = message.content.
            if (message.content.startsWith('ninjakick'))
            {
                console.log('ninjakick successful');
            }
            message.channel.send(`${target}, you have been slapped by ${sender}.`)
        }

    }
}