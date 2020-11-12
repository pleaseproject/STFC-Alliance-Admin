module.exports = {

    name: 'simjoin',
    description: 'Tests welcome message',
    minArgs: 1,
    maxArgs: 1,

    run: (message) => {

        this.client.emit('guildMemberAdd', message.member)

    }

}