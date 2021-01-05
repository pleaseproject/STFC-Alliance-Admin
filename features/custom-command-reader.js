module.exports = (client, instance, isEnabled, prefix) => {

    client.on('message', (message) => {

        //console.log(`${message.guild.name} => ${message.channel.name} => ${message.author.username}: ${message.content}`);
        console.log(prefix);
    })



}