module.exports = {

    name: 'simjoin',
    description: 'Tests welcome message',
    minArgs: 0,
    maxArgs: 1,

    run: (message, client) => {

        client.emit('guildMemberAdd', message.member)

    }

}