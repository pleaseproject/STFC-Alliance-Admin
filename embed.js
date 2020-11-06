const Discord = require('discord.js');

new Discord.MessageEmbed()
.setTitle('Alliance Status:')
.setDescription(`Below is the returned Status with alliance`)
.addFields({
    name: "Alliance Tag",
    value: `test`
})
.addFields({
    name: "Status with our alliance",
    value: `test`
})
.setColor('BLUE')
