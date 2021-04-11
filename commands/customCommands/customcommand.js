const customCommandSchema = require("../../schemas/customCommandSchema.js");
const discord = require("discord.js");

module.exports = {
  category: "Fun",
  name: "customcommand",
  aliases: ["cc"],
  description: "Adds new custom command to the database.",
  minArgs: 1,
  maxArgs: 1,
  expectedArgs: "<Command Name>",

  run: async ({ message, args }) => {
    const guildId = message.guild.id;
    const commandName = args[0].toLowerCase();
    let commandResponse = "";
    const questions = [
      `What is the response for command \`\`${commandName}\`\`?`,
    ];
    let counter = 0;
    let filter = (m) => m.author.id === message.author.id;

    const collector = new discord.MessageCollector(message.channel, filter, {
      max: questions.length,
      time: 1000 * 45, // 45 seconds per answer?
    });

    message.channel.send(questions[counter++]);
    collector.on("collect", (m) => {
      if (counter < questions.length) {
        m.channel.send(questions[counter++]);
      }
    });

    collector.on("end", async (collected) => {
      console.log(`Collected ${collected.size} messages`);
      let counter = 0;
      collected.forEach((value) => {
        console.log(questions[counter++], value.content);
        commandResponse = value.content;
      });

      await customCommandSchema.findOneAndUpdate(
        {
          guildId: guildId,
          commandName: commandResponse,
        },
        {
          guildId: guildId,
          commandName: commandName,
          commandResponse: commandResponse,
        },
        {
          upsert: true,
        }
      );

      message.reply(
        `Custom command \`\`${commandName}\`\` has been added to the database!`
      );
    });
  },
};
