const drinkSchema = require("../../schemas/drinkSchema.js");

module.exports = {
  category: "Drink",
  name: "drinkremove",
  aliases: ["rdrink", "drinkr", "removedrink"],
  description: "Removes specified drink from the database.",
  minArgs: 1,
  maxArgs: 1,
  expectedArgs: "<:Drink Emoji:>",

  run: async ({ message, args }) => {
    const id = message.guild.id;
    const drink = args.join(" ");

    await drinkSchema.update(
      {
        _id: id,
      },
      {
        $pull: {
          drink: drink,
        },
      }
    );

    message.reply(`${drink} has been removed from the database!`);
  },
};
