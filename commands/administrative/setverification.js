const verificationSchema = require("../../schemas/verificationSchema");

const cache = new Map();

const loadData = async () => {
  const results = await verificationSchema.find();

  for (const result of results) {
    cache.set(result._id, result.channelId);
  }
};
loadData();

module.exports = {
  requiredPermissions: ["ADMINISTRATOR"],
  category: "Util",
  name: "setverification",
  aliases: ["sv"],
  minArgs: 2,
  maxArgs: 3,
  description:
    "This will add a reaction to the first message in the channel for user verification. Expected execution of this command. !sv <Emoji> <role>",
  run: async ({ message, args }) => {
    const seconds = 3;
    const { guild, channel } = message;

    let emoji = args[0];
    if (emoji.includes(":")) {
      const split = emoji.split(":");
      const emojiName = split[1];

      emoji = guild.emojis.cache.find((emoji) => {
        return emoji.name === emojiName;
      });
    }
    const roleId = args[1];
    const role = guild.roles.cache.get(
      roleId.substring(roleId.lastIndexOf("&") + 1, roleId.lastIndexOf(">"))
    );

    if (!role) {
      message.reply("That role does not exist").then((message) => {
        message.delete({
          timeout: 1000 * seconds,
        });
      });

      message.delete();
      return;
    }

    message.delete().then(() => {
      channel.messages.fetch().then(async (results) => {
        const firstMessage = results.first(); // Sets to last message in channel. Set to last() to do first sent message
        if (!firstMessage) {
          channel.send("There is no message to react to").then((message) => {
            message.delete({
              timeout: 1000 * seconds,
            });
          });

          return;
        }

        await verificationSchema.findOneAndUpdate(
          {
            _id: guild.id,
          },
          {
            _id: guild.id,
            channelId: channel.id,
            roleId: role,
          },
          {
            upsert: true,
          }
        );
        firstMessage.react(emoji);
        console.log(
          `Here is the first message: ${firstMessage} with reaction ${emoji}`
        );
      });

      message.reply("Rule Verification Channel Set!").then((message) => {
        message.delete({
          timeout: 1000 * seconds,
        });
      });
    });
  },
};