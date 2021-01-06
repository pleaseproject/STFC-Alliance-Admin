const prefix = '!';

module.exports = (client) => {

    client.on('message', (message) => {
        //console.log(`${message.guild.name} => ${message.channel.name} => ${message.author.username}: ${message.content}`);
        if (message.content.startsWith(prefix)) {
            console.log(message.content.substring(1, message.content.indexOf(' ')));
        }
    })
}

