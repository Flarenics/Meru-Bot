const { joinVoiceChannel } = require("@discordjs/voice");

module.exports = {
   name: "join",
   aliases: [],
   async execute(message) {
      if (message.channel.type === "DM") {
         message.reply("HAHAHAHAHAHAHAHAHA \n Fuck you.");
         return;
      }
      const connection = joinVoiceChannel({
         channelId: message.member.voice.channel.id,
         guildId: message.guildId,
         adapterCreator: message.guild.voiceAdapterCreator,
      });
   },
};
