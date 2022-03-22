const { MessageEmbed, MessageMentions } = require("discord.js");

const defaultColor = 0xb63535;

module.exports = {
   name: "avatar",
   aliases: [],
   async execute(message) {
      const mentionedUser = await message.mentions.users.first();

      // response embed function
      function avatarEmbed(userObject) {
         return new MessageEmbed()
            .setColor(userObject.accentColor || defaultColor)
            .setImage(
               userObject.avatarURL({
                  format: userObject.avatar.startsWith("a") ? "gif" : "png",
                  size: 4096,
               })
            );
      }

      //If no user is mentioned, return avatar of message author
      if (!mentionedUser) {
         const authorUserObject = await message.client.users.fetch(
            message.author.id,
            {
               force: true,
            }
         );
         message.channel.send({ embeds: [avatarEmbed(authorUserObject)] });
         return;
      }

      //If a user is mentioned return avatar mentioned user
      if (mentionedUser) {
         const mentionedUserObject = await message.client.users.fetch(
            mentionedUser,
            {
               force: true,
            }
         );
         message.channel.send({ embeds: [avatarEmbed(mentionedUserObject)] });
      }
   },
};
