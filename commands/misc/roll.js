module.exports = {
    name: 'roll',
    description: 'Rolls a random number between 1 and 100 by default unless specificed by the user.',
    minArgs: 0,
    maxArgs: 1,

    run: (message, args) => {

        if (args.length < 1) {
            let tempNum = Math.floor(Math.random() * 100);
            message.reply(`Rolling a random number between 1-100! \n You have rolled ${tempNum}!`);
        } else {
            if(!args[0].isNaN()) {
                let x = args[0];
                let tempNum = Math.floor(Math.random() * x);
                message.reply(`Rolling a random number between 1-${x}! \n You have rolled ${tempNum}!`);
            }
        }
    },
};