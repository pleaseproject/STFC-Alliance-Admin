module.exports = {

    name: 'simjoin',
    description: 'Tests welcome message',
    requiredPermissions: ['ADMINISTRATOR'],
    category: 'Admin Testing',
    minArgs: 0,
    maxArgs: 1,

    run: (message, args, text, client) => {

        client.emit('guildMemberAdd', message.member)

    }

}