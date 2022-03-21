module.exports = {
   name: "ping",
   aliases: [],
   async execute(message) {
      message.reply(`🏓Latency is ${message.createdTimestamp - Date.now()}ms`);
   },
};
