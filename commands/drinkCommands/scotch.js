const drinkSchema = require("../../schemas/drinkSchema.js");

module.exports = {
  category: "Drink",
  name: "scotch",
  aliases: ["scotchme"],
  description:
    "Responds with a scotch delivery to requesting user or targeted user.",
  minArgs: 0,
  maxArgs: 1,

  run: async ({ message, args, prefix }) => {
    const id = message.guild.id;
    let flagEmptyList = false;
    const results = await drinkSchema.findOne(
      {
        _id: id,
      },
      function (err, doc) {
        if (doc === null) {
          message.reply(
            `The drink list on this server is empty please add drinks with the \`\`${prefix}drinkadd\`\` command!`
          );
          flagEmptyList = true;
        } else {
          flagEmptyList = false;
        }
      }
    );
    if (!flagEmptyList) {
      let reply = [];
      let i = 0;

      for (const drinks of results.drink) {
        console.log("Drink:", drinks);
        reply[i] = `${drinks}`;
        i++;
      }

      let scotch = reply.find((element) => element.includes(":scotch:"));
      if (scotch != null) {
        if (args.length > 0) {
          let mentionTest = args[0].indexOf("@");
          let roleMentionTest = args[0].indexOf("&");
          if (mentionTest > 0 && roleMentionTest < 0) {
            let sender = message.author.username;
            let target = message.mentions.users.first();

            message.channel.send(
              `${target},\n${sender} has purchased you a ${scotch}!`
            );
          } else {
            message.reply(`Your ${scotch} has been delivered!`);
          }
        } else {
          message.reply(`Your ${scotch} has been delivered!`);
        }
      } else {
        message.reply(
          `It does not appear that scotch has been added to the drink database!`
        );
      }
    }
  },
};
