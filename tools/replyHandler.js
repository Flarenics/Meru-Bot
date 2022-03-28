const { Permissions } = require("discord.js");
const embeds = require("./embeds");

async function replyHandler(
   messageObject,
   replyType,
   replyTitle,
   replyContent
) {
   const channelPermissions = messageObject.channel.permissionsFor(
      messageObject.guild.me,
      true
   );

   //check if bot has permissios to send messages and embeds in a given channel
   if (!channelPermissions.has(Permissions.FLAGS.SEND_MESSAGES)) {
      try {
         const dmChannel = await messageObject.author.createDM();
         dmChannel.send({
            embeds: [
               embeds.errorEmbed(
                  "error",
                  `I do not have permissions to send messages in that channel, \nif you believe this is an error contact a server administrator`
               ),
            ],
         });
         return;
      } catch (err) {
         console.log(err);
      }
   }
   //if bot has permissios to send messages and embeds

   //switch statement for different replytypes
   switch (replyType) {
      case "answer":
         messageObject.reply({
            embeds: [embeds.answerEmbed(replyTitle, replyContent)],
         });
         break;
      case "error":
         messageObject.reply({
            embeds: [embeds.errorEmbed(replyTitle, replyContent)],
         });
         break;

      default:
   }

   // message.reply uknown error
   //console.log(unkown reply type)

   //message.reply({embeds: []})
}

exports.reply = replyHandler;
