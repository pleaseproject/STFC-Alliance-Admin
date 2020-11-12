module.exports = {

    name: 'simleave',
    description: 'Tests',
    requiredPermissions: ['ADMINISTRATOR'],
    minArgs: 0,
    maxArgs: 1,

    run: (message, args, text, client) => {

        client.emit('guildMemberLeave', message.member)

    }

}