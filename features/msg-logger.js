module.exports = (client) => {
    client.on("message", (message) => {
      console.log(
        `${message.guild.name} => ${message.channel.name} => ${message.author.username}: ${message.content}`
      );
    });
  };
  