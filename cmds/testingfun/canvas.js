const Discord = require("discord.js");

module.exports = {
   name: "canvas",
   aliases: [],
   execute: async (message) => {
      const Canvas = require("canvas");

      const canvas = Canvas.createCanvas(400, 400);
      const ctx = canvas.getContext("2d");
      const icon = await Canvas.loadImage(
         "https://images.pexels.com/photos/1170986/pexels-photo-1170986.jpeg"
      );

      ctx.drawImage(icon, -285, -250, 625 / 0.8, 939 / 0.8);
      // Write "Awesome!"
      ctx.font = "30px Impact";
      ctx.rotate(0.1);
      ctx.fillText("Catto!", 125, 75);
      ctx.textAlign = "center";

      const attachment = new Discord.MessageAttachment(
         canvas.toBuffer(),
         "cat.png"
      );

      return message.channel.send({ files: [attachment] });
   },
};
