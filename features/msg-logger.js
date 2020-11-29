module.exports = (client) => {

    client.on('message', (message) => {

        console.log(`${message.member.id}: ${message.content}`);

    });

}