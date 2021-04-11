module.exports = {
    testOnly: true, // Will now only work on test servers
    name: 'simleave',
    description: 'Tests',
    requiredPermissions: ['ADMINISTRATOR'],
    category: 'Admin Testing',
    minArgs: 0,
    maxArgs: 1,

    run: ({ message, client }) => {

        client.emit('guildMemberLeave', message.member)

    }

}