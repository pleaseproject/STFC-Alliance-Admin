module.exports = {
    name: 'roll',
    description: 'Rolls a random number between 1 and 100 by default unless specificed by the user.',
    category: 'Fun',
    minArgs: 0,
    maxArgs: 1,

    run: ({ message, args }) => {

        if (args.length < 1) {
            let tempNum = Math.floor(Math.random() * 100 + 1);
            message.reply(`Rolling a random number \`\`between 1-100\`\`! \n You have rolled a: \`\`${tempNum}\`\`!`);
        } else {
            if(!isNaN(args[0])) {
                let x = args[0];
                let tempNum = Math.floor(Math.random() * x + 1);
                message.reply(`Rolling a random number \`\`between 1-${x}\`\`! \n You have rolled a: \`\`${tempNum}\`\`!`);
            } else {
                message.reply(`The arguement \`\`${args[0]}\`\` is not a number. Please try the command again with a number!`);
            }
        }
    },
};