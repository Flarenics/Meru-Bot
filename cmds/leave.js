const { getVoiceConnection } = require("@discordjs/voice");

module.exports = {
   name: "leave",
   aliases: [],
   async execute(message) {
      const connection = getVoiceConnection(message.guild.id);
      connection.destroy();
   },
};
