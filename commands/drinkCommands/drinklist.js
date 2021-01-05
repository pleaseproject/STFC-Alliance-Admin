const drinkSchema = require('../../schemas/drinkSchema.js');

module.exports = {

    category: 'Drink',
    name: 'drinklist',
    aliases: ['listdrink', 'drinkl', 'dl', ],
    description: 'Returns list of drinks in database',
    minArgs: 0,
    maxArgs: 0,

    run: async ({ message }) => {
        const id = message.guild.id;

        const results = await drinkSchema.findOne({
            _id: id
        })

        let reply = []
        let i = 0;

        for (const drinks of results.drink) {

            console.log('Drink:', drinks);
            reply[i] = `${drinks}\n`;
            i++;

        }

        message.reply(`Here is a list of drinks:\n${reply}`);

    }

}