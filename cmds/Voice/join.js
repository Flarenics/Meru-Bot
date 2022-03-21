const { joinVoiceChannel } = require("@discordjs/voice");
const embeds = require("../../tools/embeds");

module.exports = {
   name: "join",
   aliases: [],
   async execute(message) {
      if (message.channel.type === "DM") {
         message.reply({
            embeds: [
               embeds.errorEmbed("error!", "Unable to play music in DM's!"),
            ],
         });
         return;
      }

      if (!message.member.voice.channelId) {
         message.reply("❌ Please join a voice channel first. ");
         return;
      }
      const connection = joinVoiceChannel({
         channelId: message.member.voice.channel.id,
         guildId: message.guildId,
         adapterCreator: message.guild.voiceAdapterCreator,
      });
   },
};
