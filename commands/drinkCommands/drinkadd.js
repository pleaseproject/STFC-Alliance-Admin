const mongo = require('../../mongo');
const drinkSchema = require('../../schemas/drinkSchema.js');

module.exports = {

    name: 'drinkadd',
    aliases: ['adrink', 'drinka', 'adddrink', ],
    description: 'Adds new drink to the database',
    minArgs: 1,
    maxArgs: 1,
    expectedArgs: "<:Drink Emoji:>",

    run: async (message, args) => {

        const id = message.guild.id;
        const drink = args.join(' ');

        await drinkSchema.findOneAndUpdate({
            _id: id,
        }, {

            _id: id,
            $push: {

                drink: drink

            }
        }, {
            upsert: true,
        })

        message.reply(`${drink} has been added to the database!`);

    }

}