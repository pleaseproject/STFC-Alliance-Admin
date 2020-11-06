module.exports = {

    name: 'ping',
    aliases: ['p',],
    description: 'Responds with \"pong\"',
    minArgs: 1,
    maxArgs: -1, // -1 Means no limit
    //syntaxError: 'Incorrect syntax! Use `{PREFIX}ping` ',
    expectedArgs: "<Target user's @>",

    run: (message, args) => {

        message.reply(`pong`);

    }


}