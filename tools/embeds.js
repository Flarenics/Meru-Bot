const { MessageEmbed } = require("discord.js");

function answerEmbed(title, text) {
   return (embed = new MessageEmbed()
      .setColor("#b73739")
      .addFields({ name: title, value: text })
      .setFooter({
         text: "Meru ",
         iconURL:
            "https://cdn.discordapp.com/emojis/949651430376095825.gif?size=96&quality=lossless",
      }));
}

function errorEmbed(title, text) {
   return (embed = new MessageEmbed()
      .setTitle(title)
      .setThumbnail(
         "https://cdn.discordapp.com/attachments/954775942750937178/955450378856574996/sign-error-icon.png?size=4096"
      )
      .setColor("#b73739")
      .addFields({ name: "\u200b", value: text })
      .setFooter({
         text: "Meru ",
         iconURL:
            "https://cdn.discordapp.com/emojis/949651430376095825.gif?size=96&quality=lossless",
      }));
}

exports.errorEmbed = errorEmbed;
exports.answerEmbed = answerEmbed;
