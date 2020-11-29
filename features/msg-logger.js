module.exports = (client) => {

    client.on('message', (message) => {

        console.log(`${message.guild.name} => ${message.member.username}: ${message.content}`);

    });

}