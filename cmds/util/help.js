const { MessageEmbed } = require("discord.js");
const helpEmbed = new MessageEmbed()
   .setColor("#b73739")
   .setURL(
      "https://i0.wp.com/www.alittlebithuman.com/wp-content/uploads/2021/07/meru-the-succubus.png?resize=1170%2C700&ssl=1"
   )
   .setAuthor({
      name: "Meru Help Menu",
      url: "https://discordapp.com/users/612440265327771678/",
   })
   .setDescription("Hiya cutie ♥ heres what I can do :)")
   .addFields(
      {
         name: "Avatar",
         value: "Retrieves the avatar of a mentioned user, or your own.",
      },
      {
         name: "Ping",
         value: "Displays current ping to Meru.",
      },
        {
           name: "Roll",
           value: "Spin for a random emoji!",
        },
      //{
      //   name: "Daily",
      //   value: "Gives a daily message.",
     // },
       {
          name: "Activity",
          value: "Sets the bot's activity to your message. [DEV COMMAND]",
       },
      {
         name: "Vibecheck",
         value: "Checks your vibe.",
      },
      {
         name: "Join",
         value: "Joins your voice channel.",
      },
      {
         name: "Play",
         value: "Plays a YouTube video. Ex: Meru Play https://www.youtube.com/watch?v=h7MYJghRWt0",
      },
      {
         name: "Leave",
         value: "Kicks the bot from your current voice channel.",
      },
      {
         name: "Danbooru",
         value: "grabs a random safe for work image from danbooru",
      }
      // { name: "\u200B", value: "\u200B" }
   )
   .setTimestamp()
   .setFooter({
      text: "Meru ♥",
      iconURL:
         "https://media.discordapp.net/attachments/951754874851295296/953806051889799279/B.png",
   });

module.exports = {
   name: "help",
   aliases: [],
   async execute(message) {
      message.channel.send({ embeds: [helpEmbed] });
   },
};
