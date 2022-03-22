const { joinVoiceChannel } = require("@discordjs/voice");
const embeds = require("../../tools/embeds");

module.exports = {
   name: "join",
   aliases: [],
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
      //If member is not in voice channel, error
      if (!message.member.voice.channelId) {
         message.reply("❌ Please join a voice channel first. ");
         return;
      }
      //else connect to voice channel
      const connection = joinVoiceChannel({
         channelId: message.member.voice.channel.id,
         guildId: message.guildId,
         adapterCreator: message.guild.voiceAdapterCreator,
      });
   },
};
