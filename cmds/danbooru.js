const dotenv = require("dotenv").config();
const { MessageEmbed } = require("discord.js");
const https = require("https");

module.exports = {
   name: "danbooru",
   aliases: [],
   async execute(message, args) {
      const booruAPIKey = process.env.BOORUTOKEN;
      function embedGenerator(title, text) {
         return (embed = new MessageEmbed()
            .setColor("#b73739")
            .setImage(text)
            .setFooter({
               text: "Meru",
               iconURL:
                  "https://cdn.discordapp.com/emojis/949651430376095825.gif?size=96&quality=lossless",
            }));
      }
      const options = {
         hostname: "danbooru.donmai.us",
         port: 443,
         path: "/posts.json?limit=1&tags=rating:safe+1girl+random:1",
         method: "GET",
      };
      const req = https.get(options, (res) => {
         console.log(`statusCode: ${res.statusCode}`);
         let datastream = [];

         res.on("data", (d) => {
            datastream.push(d);
         });

         res.on("end", () => {
            //let parsedData = JSON.parse(data.join(""));
            try {
               message.reply({
                  embeds: [
                     embedGenerator(
                        "cum!",
                        JSON.parse(datastream.toString())[0].file_url
                     ),
                  ],
               });
               console.log(JSON.parse(datastream.toString())[0].file_url);
            } catch (error) {
               console.log(error);
               message.reply("Please wait!");
            }
         });
      });
      req.on("error", (error) => {
         console.error(error);
      });
   },
};
