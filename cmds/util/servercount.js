const replyHandler = require("../../tools/replyHandler");

module.exports = {
   name: "servercount",
   aliases: [],
   async execute(message) {
      replyHandler.reply(
         message,
         "answer",
         `Hello ${message.author.tag}`,
         `Meru Bot is in ${message.client.guilds.cache.size} servers!`
      );
   },
};
