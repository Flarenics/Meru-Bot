const { joinVoiceChannel } = require("@discordjs/voice");

module.exports = {
   name: "join",
   aliases: [],
   async execute(message) {
      const connection = joinVoiceChannel({
         channelId: message.member.voice.channel.id,
         guildId: message.guildId,
         adapterCreator: message.guild.voiceAdapterCreator,
      });
   },
};
