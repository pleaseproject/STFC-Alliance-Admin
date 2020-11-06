const profilesSchema = require('../schemas/profilesSchema')

module.exports = (client) => {
    client.on('message', (message) => {
        const {
            guild,
            member
        } = message
        if(message.author.bot) return; // Ignores bot messages
        addXP(guild.id, member.id, 23, message)
    })
}

const getNeededXP = (level) => level * level * 100

const addXP = async (guildId, userId, xpToAdd, message) => {
    const result = await profilesSchema.findOneAndUpdate({
        guildId,
        userId,
    }, {
        guildId,
        userId,
        $inc: {
            xp: xpToAdd,
        },
    }, {
        upsert: true,
        new: true,
    })

    let {
        xp,
        level
    } = result
    const needed = getNeededXP(level)

    if (xp >= needed) {
        ++level
        xp -= needed

        message.reply(
            `You have just advanced to level ${level} with ${xp} experience! You now need ${getNeededXP(
            level
          )} XP to level up again.`
        )

        await profilesSchema.updateOne({
            guildId,
            userId,
        }, {
            level,
            xp,
        })
    }
}

module.exports.addXP = addXP