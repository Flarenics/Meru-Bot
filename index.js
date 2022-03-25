const { Client, Intents, Guild, Collection } = require("discord.js");
const keywordCommand = require("./tools/keywords.js");
const { readdirSync } = require("fs");
const { join } = require("path");
const dotenv = require("dotenv").config();
const fg = require("fast-glob");
//const embeds = require("./tools/embeds");

const client = new Client({
   partials: ["MESSAGE", "CHANNEL", "REACTION"],
   intents: [
      Intents.FLAGS.GUILDS,
      Intents.FLAGS.GUILD_MEMBERS,
      Intents.FLAGS.GUILD_BANS,
      Intents.FLAGS.GUILD_EMOJIS_AND_STICKERS,
      Intents.FLAGS.GUILD_INTEGRATIONS,
      Intents.FLAGS.GUILD_WEBHOOKS,
      Intents.FLAGS.GUILD_INVITES,
      Intents.FLAGS.GUILD_VOICE_STATES,
      Intents.FLAGS.GUILD_PRESENCES,
      Intents.FLAGS.GUILD_MESSAGES,
      Intents.FLAGS.GUILD_MESSAGE_REACTIONS,
      Intents.FLAGS.GUILD_MESSAGE_TYPING,
      Intents.FLAGS.DIRECT_MESSAGES,
      Intents.FLAGS.DIRECT_MESSAGE_REACTIONS,
      Intents.FLAGS.DIRECT_MESSAGE_TYPING,
      Intents.FLAGS.GUILD_SCHEDULED_EVENTS,
   ],
});

// Send errors to console
client.on("warn", (info) => console.log(info));
client.on("error", (err) => console.log(err));

//Initial Setup/On startup
client.once("ready", () => {
   console.log(
      `Logged in as ${client.user.tag} and Listening to ${client.guilds.cache.size} servers `
   );
   client.user.setActivity(`in ${client.guilds.cache.size} servers`, {
      type: "PLAYING",
   });
   client.user.setStatus("dnd");
});

client.queue = new Map();

// Load Commands
client.commands = new Collection();
const cmdFiles = fg.sync(["cmds/**/*.js"]);

for (const file of cmdFiles) {
   const command = require(join(__dirname, `${file}`));
   client.commands.set(command.name, command);
   console.log(`Imported command ${command.name} from ${file}`);
}

//on Message event
client.on("messageCreate", (message) => {
   //variables and functions
   const escapeRegex = (str) => str.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

   // Return if message is from bot or a DM
   if (message.author.bot) return;
   if (message.channel.type === "DM") {
      message.reply("You can not run commands in a DM!");
      return;
   }

   //  try {
   //     keywordCommand.messagefunc(message);
   //  } catch (error) {
   //     console.log(error);
   //  }

   //If Message doesn't contain Prefix or Bot mention, return
   const prefixRegex = new RegExp(
      `(<@!?${client.user.id}>|${escapeRegex("meru")})\\s*`
   );
   if (!prefixRegex.test(message.content.toLowerCase())) return;

   // Slice message into useful variables
   const [, matchedPrefix] = message.content.toLowerCase().match(prefixRegex);

   const args = message.content.slice(matchedPrefix.length).trim().split(/ +/);
   const commandName = args.shift().toLowerCase();

   //Check if command exists
   const command =
      client.commands.get(commandName) ||
      client.commands.find(
         (cmd) => cmd.aliases && cmd.aliases.includes(commandName)
      );

   //If command doesn't exist output to console
   if (!command) {
      // If message mentions bot, but isn't a command, react
      if (message.content.includes(`<@!${client.user.id}>`)) {
         message.reply("Hello! Use 'meru help' for a list of commands.");
      }
      console.log(
         `❌ ${message.content} | ${message.author.tag} | ${
            message.channel.type === "DM" ? "DM" : message.guild.name
         } ❌`
      );
      return;
   }

   //output executed commands to console
   console.log(
      `Received ${commandName} | ${message.author.tag} | ${
         message.channel.type === "DM" ? "DM" : message.guild.name
      }`
   );

   //try executing command
   try {
      command.execute(message, args);
   } catch (error) {
      console.log("Catch'ed error: ");
      console.error(error);
      message
         .reply("❌ There was an error while executing this command! ❌")
         .catch(console.error);
   }
});

process.on("uncaughtException", function (err) {
   console.error(err.stack);
   console.log("Node NOT Exiting...");
});

client.login(process.env.TOKEN);
