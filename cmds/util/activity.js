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
      if (!message.author.id === "612440265327771678") {
         message.reply({
            embeds: [
               embedGenerator(
                  "Failed",
                  `Only the developer can run this command.`
               ),
            ],
         });
      }

      if (message.author.id === "612440265327771678" && args[2]) {
         console.log(
            `${message.author.tag} set status to: ${
               args[0].toUpperCase() === "LISTENING"
                  ? "Listening to"
                  : args[0].toUpperCase()
            } | ${args.slice(1, args.length).join(" ")} | @Meru Bot help`
         );
         message.client.user.setActivity(args.slice(1, args.length).join(" ") + ' | meru help', {
            type: args[0].toUpperCase(),
         });
         message.reply({
            embeds: [
               embedGenerator(
                  "Success!",
                  `Succesfully set status to ${args.join(" ")}`
               ),
            ],
         });
      } else {
         if (!args[2]) {
            message.reply({
               embeds: [
                  embedGenerator(
                     "Failed",
                     `Message must contain a valid string.`
                  ),
               ],
            });
         }
      }
   },
};
