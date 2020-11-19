const Canvas = require('canvas')
const { MessageAttachment } = require('discord.js')
const path = require('path')
const { getChannelId } = require('../commands/misc/setwelcome')

module.exports = (client) => {
  client.on('guildMemberAdd', async (member) => {
    const { guild } = member

    const channelId = getChannelId(guild.id)
    if (!channelId) {
      return
    }

    const channel = guild.channels.cache.get(channelId)
    if (!channel) {
      return
    }

    const canvas = Canvas.createCanvas(650, 365)
    const ctx = canvas.getContext('2d')

    const background = await Canvas.loadImage(
      path.join(__dirname, '../startrekcanvas.png')
    )
    let x = 0
    let y = 0
    //ctx.drawImage(background, x, y)

    const pfp = await Canvas.loadImage(
      member.user.displayAvatarURL({
        format: 'png',
      })
    )
    x = 60
    y = 25
    // Pick up the pen
	ctx.beginPath();
	ctx.arc(canvas.width * .5, canvas.height * .5, canvas.width * .5, 0, Math.PI * 2, true);
	ctx.closePath();
	ctx.clip();
    ctx.drawImage(pfp, x, y, 50*2, 50*2)

    // ctx.fillStyle = '#ffffff'
    // ctx.font = '35px sans-serif'
    // let text = `Welcome ${member.user.tag}`
    // x = canvas.width / 2 - ctx.measureText(text).width / 2
    // ctx.fillText(text, x, 60 + pfp.height)

    // ctx.font = '30px sans-serif'
    // text = `Member #${guild.memberCount}`
    // x = canvas.width / 2 - ctx.measureText(text).width / 2
    // ctx.fillText(text, x, 100 + pfp.height)

    const attachment = new MessageAttachment(canvas.toBuffer())
    channel.send('Welcome To The Server!', attachment)
  })
}