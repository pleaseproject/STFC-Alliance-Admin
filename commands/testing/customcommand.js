module.exports = {

    run: ({ message, client, prefix }) => {

        client.on('message', (msg) => {

            //console.log(`${message.guild.name} => ${message.channel.name} => ${message.author.username}: ${message.content}`);
            if(msg.content.startsWitch(prefix)) {
                console.log('THE MESSAGE HAS PROPERLY BEEN LOGGED!!!');
            } 
    
        })
    

    }
}