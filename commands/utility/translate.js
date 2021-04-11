const Discord = require("discord.js");
const translate = require("@k3rn31p4nic/google-translate-api");

module.exports = {
  name: "translate",
  description: "Translates users sentence to specified language.",
  category: "util",

  run: async ({ message, args, client }) => {
    let language = args[0];
    let text = args.slice(1).join(" ");

    if (!language)
      return message.reply("What language am I supposed to translate to?");
    if (language.length !== 2)
      return message.reply(
        "Language must be 2 letter alias. E.g `English > en`"
      );
    if (!text) return message.reply("What am I supposed to translate?");

    const result = await translate(text, { to: language });

    const embed = new Discord.MessageEmbed()
      .setDescription(result.text)
      .setTitle("Translation")
      .setTimestamp()
      .setFooter(message.author.username)
      .setColor("RED");

    message.channel.send(embed);
  },
};
