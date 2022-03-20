const { MessageEmbed } = require("discord.js");

const date = "Sunday 3/20";

const dailyMessage = `Working on development of integration with a waifu API...`;

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
