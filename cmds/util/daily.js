const { MessageEmbed } = require("discord.js");

const date = "Monday 3/21";

const dailyMessage = `Who needs to integrate with waifu API... WHEN YOU CAN MAKE YOUR OWN WRAPPER????\n\nrun 'meru danbooru' to get a random sofe for work image from danbooru :)`;

function embedGenerator(title, text) {
   return (embed = new MessageEmbed()
      .setColor("#b73739")
      .addFields({ name: title, value: text })
      .setFooter({
         text: "Meru Bot Dev",
         iconURL:
            "https://cdn.discordapp.com/emojis/949651430376095825.gif?size=96&quality=lossless",
      }));
}

module.exports = {
   name: "daily",
   aliases: [],
   async execute(message) {
      message.reply({
         embeds: [embedGenerator(date, dailyMessage)],
      });
   },
};
