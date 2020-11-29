const profilesSchema = require('../schemas/profilesSchema')
const xpignoreSchema = require('../schemas/xpignoreSchema');

module.exports = (client) => {
    client.on('message', (message) => {
        const {
            guild,
            member
        } = message
        let channel = message.channel.id;
        let guildID = message.guild.id;
        console.log(channel);
        if (message.author.bot) return; // Ignores bot messages
        if (xpignoreSchema.find(
            {

                channelId: 
                {
                    $exists: channel,
                }
            }
        )) return console.log(`This channel is on the XP ignore list.`);
        //if (xpignoreSchema.find({channelId: channel}).count() > 0) return console.log(`This channel is on the XP ignore list.`);
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