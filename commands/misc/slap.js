module.exports = {
    name: 'slap',
    description: 'Slaps mentioned user to get their attention',
    category: 'Fun',
    cooldown: '5s',
    minArgs: 1,
    maxArgs: -1, // -1 Means no limit
    expectedArgs: "<Target user's @>",

    run: (message, args) => {

        const sender = message.author.username;
        const target = message.mentions.users.first();
        console.log(sender);
        console.log(target);
        console.log(args[0]);

        if (message.mentions.users.first() == null) 
        {
            message.reply(`Please be sure to mention a user when performing this command.`);
        }
        else 
        {
            message.channel.send(`${target}, you have been slapped by ${sender}.`)
        }

    }
}