module.exports = {
    name: 'slap',
    description: 'Slaps mentioned user to get their attention',
    category: 'Fun',
    cooldown: '5s',
    minArgs: 1,
    maxArgs: -1, // -1 Means no limit
    expectedArgs: "<Target user's @>",

    run: (message, args) => {

        const sender = message.author;
        const target = message.mentions.users.first();

        if (args[0] != target) 
        {
            message.reply(`Please be sure to mention a user when performing this command.`);
        }
        else 
        {
            message.channel.send(`${target}, you have been slapped by ${sender}.`)
        }

    }
}