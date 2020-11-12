module.exports = {

    name: 'simleave',
    description: 'Tests',
    minArgs: 0,
    maxArgs: 1,

    run: (message, client) => {

        client.emit('guildMemberLeave', message.member)

    }

}