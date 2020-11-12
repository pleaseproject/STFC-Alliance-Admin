module.exports = {

    name: 'simleave',
    description: 'Tests',
    minArgs: 1,
    maxArgs: 1,

    run: (message) => {

        this.client.emit('guildMemberLeave', message.member)

    }

}