module.exports = {

    name: 'simjoin',
    description: 'Tests welcome message',
    requiredPermissions: ['ADMINISTRATOR'],
    category: 'Admin Testing',
    minArgs: 0,
    maxArgs: 1,

    run: ({ message, client }) => {

        client.emit('guildMemberAdd', message.member)

    }

}