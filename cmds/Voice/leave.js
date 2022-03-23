const { getVoiceConnection } = require("@discordjs/voice");
const embeds = require("../../tools/embeds");

module.exports = {
   name: "leave",
   aliases: ["disconnect"],
   async execute(message) {
      if (message.channel.type === "DM") {
         message.reply({
            embeds: [
               embeds.errorEmbed("error!", "Unable to play music in DM's!"),
            ],
         });
         return;
      }
      const connection = getVoiceConnection(message.guild.id);

      if (connection) {
         try {
            connection.destroy();
            message.client.queue.delete(message.guildId);
         } catch (err) {
            console.log(err);
         }
      }
   },
};
