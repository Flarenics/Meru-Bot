const replyHandler = require("../../tools/replyHandler");

module.exports = {
   name: "ping",
   aliases: [],
   async execute(message) {
      replyHandler.reply(
         message,
         "answer",
         "Ping",
         `🏓Latency is ${message.createdTimestamp - Date.now()}ms`
      );
   },
};
