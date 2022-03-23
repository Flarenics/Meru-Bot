const { getVoiceConnection } = require("@discordjs/voice");
const embeds = require("../../tools/embeds");

module.exports = {
   name: "leave",
   aliases: ["disconnect"],
   async execute(message) {
      //if messages comes from DM return
      if (message.channel.type === "DM") {
         message.reply({
            embeds: [
               embeds.errorEmbed("error!", "Unable to play music in DM's!"),
            ],
         });
         return;
      }

      //destroy voice connection
      const connection = getVoiceConnection(message.guild.id);
      if (connection) {
         try {
            connection.destroy();
         } catch (err) {
            console.log(err);
         }
      }
   },
};
