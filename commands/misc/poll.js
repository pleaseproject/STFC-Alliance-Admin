const Discord = require("discord.js");

module.exports = {
  name: "poll",
  description: "Creates a poll in mentioned channel.",
  category: "Util",
  minArgs: 1,
  maxArgs: -1,

  run: async ({ message, args }) => {
    let pollChannel = message.mentions.channels.first();
    let pollDescription = args.slice(1).join(" ");

    let embedPoll = new Discord.MessageEmbed()
      .setAuthor(
        `Executed By: ${message.author.username}`,
        message.author.avatarURL()
      )
      .setTitle("**New Poll**")
      .setDescription(pollDescription)
      .setColor("RED")
      .setTimestamp(Date.now());
    let msgEmbed = await pollChannel.send(embedPoll);
    await msgEmbed.react("👍");
    await msgEmbed.react("👎");
  },
};
