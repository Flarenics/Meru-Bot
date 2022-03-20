const { MessageEmbed } = require("discord.js");

function embedGenerator(title, text) {
   return (embed = new MessageEmbed()
      .setColor("#b73739")
      .addFields({ name: title, value: text })
      .setFooter({
         text: "Meru ",
         iconURL:
            "https://cdn.discordapp.com/emojis/949651430376095825.gif?size=96&quality=lossless",
      }));
}

module.exports = {
   name: "activity",
   aliases: [],
   async execute(message, args) {
      if (message.author.id === "612440265327771678") {
         message.client.user.setActivity(args.join(" "));
         message.reply({
            embeds: [
               embedGenerator(
                  "Success!",
                  `Succesfully set status to ${args.join(" ")}`
               ),
            ],
         });
      } else {
         message.reply({
            embeds: [
               embedGenerator(
                  "Failed",
                  `Only the developer can run this command.`
               ),
            ],
         });
      }
   },
};
