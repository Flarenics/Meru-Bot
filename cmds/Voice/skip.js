const { getVoiceConnection } = require("@discordjs/voice");

module.exports = {
   name: "skip",
   aliases: [],
   async execute(message) {
      //If client is not connected to voice channel, ignore command
      if (!getVoiceConnection(message.guildId)) {
         message.reply("❌ Player is currently not playing anything");
         return;
      }

      //If client is in a different voice channel or user is not in a voice channel, ignore command
      if (getVoiceConnection(message.guildId)) {
         let testStatus = getVoiceConnection(message.guildId).packets.state
            .channel_id;

         if (testStatus !== message.member.voice.channelId) {
            message.reply(
               "❌ Meru is currently being used in another channel ❌"
            );
            return;
         }
      }

      //If Queue is empty
      const queue = await message.client.queue.get(message.guildId);

      if (!queue) {
         message.reply("❌ There are no more songs in the queue to skip to.");
         return;
      }

      // Send emit to player.js with relevant data
      message.client.emit("commandSkip", message);
   },
};
