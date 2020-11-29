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
        let memberID = message.member.id;
        if (message.author.bot) return; // Ignores bot messages
        // XP Channel Ignore Checker
        if (xpignoreSchema.find(
            {
                // guildId : 
                // {
                //     $exists: guildID
                // },
                channelId: 
                {
                    $exists: channel,
                }
            }
        )) {
            console.log(`This channel is on the XP ignore list.`);
            return;
        }
        addXP(guildID, memberID, 23, message)
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
    console.log(`${xpToAdd} Has been added to ${userId}!`);
}

module.exports.addXP = addXP