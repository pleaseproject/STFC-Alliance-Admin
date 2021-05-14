const scheduledSchema = require("../../schemas/scheduledSchema");
const territorySchema = require("../../schemas/territorySchema");
const momentTimezone = require("moment-timezone");
const discord = require("discord.js");

module.exports = {
  name: "schedule",
  description: "Allows a user to schedule messages to be sent as certain times",
  category: "Util",
  minArgs: 1,
  maxArgs: 1,

  init: (client) => {
    const checkForPosts = async () => {
      const query = {
        date: {
          $lte: Date.now(),
        },
      };

      const results = await scheduledSchema.find(query);

      for (const post of results) {
        const { guildId, channelId, content } = post;

        const guild = await client.guilds.fetch(guildId);
        if (!guild) {
          continue;
        }

        const channel = guild.channels.cache.get(channelId);
        if (!channel) {
          continue;
        }

        channel.send(content);
      }

      await scheduledSchema.deleteMany(query);

      setTimeout(checkForPosts, 1000 * 10);
    };

    checkForPosts();
  },

  run: async ({ message, args, prefix }) => {
    const guildId = message.guild.id;
    let channelId;
    let content = [];
    let questions = ["What is the territory name?"];
    let arr = [];

    let mentionTest = message.mentions.channels.first();
    console.log(`Here's mentionTest: ${mentionTest}`)
    if (mentionTest == null) {
      message.channel.send(`Please make sure you #channel-name.`);
      return;
    }

    let filter = (m) => m.author.id === message.author.id;
    channelId = args[0];
    channelId = channelId.substring(
      channelId.lastIndexOf("#") + 1,
      channelId.lastIndexOf(">")
    );

    ScheduleCollector();

    function ScheduleCollector() {
      let counter = 0;
      const collector = new discord.MessageCollector(message.channel, filter, {
        max: questions.length,
        time: 1000 * 45, // 45 seconds per answer?
      });
      message.channel.send(questions[counter++]);
      collector.on("collect", (m) => {
        if (counter < questions.length) {
          m.channel.send(questions[counter++]);
        }
      });

      collector.on("end", async (collected) => {
        collected.forEach((value) => {
          arr.push(value.content);
        });
        console.log(`Collected ${collected.size} messages`);
        console.log(arr);

        StoreData();
      });
    }

    async function StoreData() {
      let flagNoSystem;
      let currentDay = momentTimezone.utc().format("dddd");
      let tempSystem = arr[0].toLowerCase();
      let system = tempSystem.charAt(0).toUpperCase() + tempSystem.slice(1);
      const results = await territorySchema.findOne(
        {
          system: system.toLowerCase(),
        },
        function (err, doc) {
          if (doc === null) {
            message.reply(
              `There is not a System stored called \`\`${system}\`\`! Please run the \`\`${prefix}schedule\`\` command again!`
            );
            flagNoSystem = true;
          } else {
            flagNoSystem = false;
          }
        }
      );

      if (!flagNoSystem) {
        content[0] = `@everyone We have a territory event in the System: \`\`${results.system}\`\` in **1 Hour**. 30 Minutes before please hold off on armadas and prepare to send ships. This event will last \`\`${results.duration} Minutes\`\`.`;
        content[1] = `@everyone We have a territory event in the System: \`\`${results.system}\`\` in **30 Minutes**. Please hold off on armadas and begin sending ships. This event will last \`\`${results.duration} Minutes\`\`.`;
        const currentDate = momentTimezone.utc().format("YYYY/MM/DD");
        let timeArr = [];

        console.log(`HERE IS THE CURRENT DAY: ${currentDay}`);
        console.log(`HERE IS THE DAY FROM RESULTS: ${results.day}`);
        if (currentDay != results.day) {
          timeArr.push(
            momentTimezone
              .utc(`${currentDate} ${results.milTimeUTC}`, "YYYY-MM-DD HH:mm A")
              .subtract(1, "hour")
              .add(1, "day")
          );
          timeArr.push(
            momentTimezone
              .utc(`${currentDate} ${results.milTimeUTC}`, "YYYY-MM-DD HH:mm A")
              .subtract(30, "minutes")
              .add(1, "day")
          );
          console.log(`THE DAYS DID NOT MATCH`);
        } else {
          timeArr.push(
            momentTimezone
              .utc(`${currentDate} ${results.milTimeUTC}`, "YYYY-MM-DD HH:mm A")
              .subtract(1, "hour")
          );
          timeArr.push(
            momentTimezone
              .utc(`${currentDate} ${results.milTimeUTC}`, "YYYY-MM-DD HH:mm A")
              .subtract(30, "minutes")
          );
          console.log(`THE DAYS MATCHED`);
        }

        for (var i = 0; i < timeArr.length; i++) {
          await new scheduledSchema({
            date: timeArr[i].valueOf(),
            guildId: guildId,
            channelId: channelId,
            content: content[i],
          }).save(function (err, res) {
            if (err) {
              console.log(`HERE IS THE SCHEDULING ERROR: ${err}`);
              return;
            }
          });
        }
        message.channel.send(
          `Two reminders created for \`\`${results.system}\`\`.`
        );
        // message.channel.send(
        //   `There was an error in scheduling these reminders! Please reach out to the Admin!`
        // );
      }
    }
  },
};