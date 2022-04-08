const { MessageEmbed } = require("discord.js");

function embedGenerator(title, text) {
   return (embed = new MessageEmbed()
      .setColor("#b73739")
      .addFields({ name: title, value: text })
      .setFooter({
         text: "Meru Vibe Police",
         iconURL:
            "https://cdn.discordapp.com/emojis/949651430376095825.gif?size=96&quality=lossless",
      }));
}

module.exports = {
   name: "vibe",
   aliases: [],
   async execute(message) {
      let vibeRating = Math.round(Math.random() * (10 - 1) + 1);

      if (
         (message.author.id === "687013516451774621") |
         (message.author.id === "612440265327771678") |
         (message.author.id === "317368255649939457")
      ) {
         vibeRating = 10;
      }
      switch (vibeRating) {
         case 1:
            message.reply({
               embeds: [
                  embedGenerator("1/10", "Terrible vibes. Check yourself."),
               ],
            });
            break;
         case 2:
            message.reply({
               embeds: [embedGenerator("2/10", "Bad vibes outta you.")],
            });
            break;
         case 3:
            message.reply({
               embeds: [embedGenerator("3/10", "Your vibes are off...")],
            });
            break;
         case 4:
            message.reply({
               embeds: [
                  embedGenerator(
                     "4/10",
                     "Not too bad I guess... you need to start vibin."
                  ),
               ],
            });
            break;
         case 5:
            message.reply({
               embeds: [
                  embedGenerator("5/10", "Decent vibes, nothing special."),
               ],
            });
            break;
         case 6:
            message.reply({
               embeds: [embedGenerator("6/10", "Okay vibes, keep it up.")],
            });
            break;
         case 7:
            message.reply({
               embeds: [embedGenerator("7/10", "Hey, not bad.")],
            });
            break;
         case 8:
            message.reply({
               embeds: [embedGenerator("8/10", "You got some nice vibes.")],
            });
            break;
         case 9:
            message.reply({
               embeds: [embedGenerator("9/10", "Good vibes man.")],
            });
            break;
         case 10:
            message.reply({
               embeds: [
                  embedGenerator("10/10", "Meru approved top tier vibes."),
               ],
            });
            break;
         default:
            message.reply({
               embeds: [
                  embedGenerator(
                     "ERROR",
                     "There was an error calculating your vibe, please try again later ♥"
                  ),
               ],
            });
      }
   },
};
