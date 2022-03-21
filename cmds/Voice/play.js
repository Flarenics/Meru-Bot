const embeds = require("../../tools/embeds");
const ytdl = require("ytdl-core");
const { musicPlayer } = require("../../tools/musicPlayer");
const { getVoiceConnection } = require("@discordjs/voice");
const ytpl = require("ytpl");

module.exports = {
   name: "play",
   aliases: [],
   async execute(message, args) {
      //Convenience variables
      const url = args[0];
      const serverQueue = message.client.queue.get(message.guildId);

      if (message.channel.type === "DM") {
         message.reply({
            embeds: [
               embeds.errorEmbed("error!", "Unable to play music in DM's!"),
            ],
         });
         return;
      } else {
         //Regex stuff for matching
         const videoPattern =
            /^(https?:\/\/)?(www\.)?(m\.)?(youtube\.com|youtu\.?be)\/.+$/gi;
         const playlistPattern = /^.*(list=)([^#\&\?]*).*/gi;

         //check if user is actually in a voice channel
         if (!message.member.voice.channelId) {
            message.reply("❌ Please join a voice channel first. ");
            return;
         }

         //Check if link is valid
         const urlValid = videoPattern.test(url);
         if (!urlValid) {
            message.reply("❌ Please provide a valid youtube link");
            return;
         }

         //check if user and client are in the same voice channel
         if (getVoiceConnection(message.guildId)) {
            let testStatus = getVoiceConnection(message.guildId).packets.state
               .channel_id;
            if (testStatus !== message.member.voice.channelId) {
               message.reply(
                  "❌ Meru is currently being used in another channel ❌"
               );
               return;
            }
         }

         //setting up serverQueue
         const queueConstruct = {
            songs: [],
            loop: false,
            playing: true,
            channel: message.channel,
         };

         // Generate song object to push into serverQueue
         const isPlaylist = playlistPattern.test(url);

         if (urlValid) {
            if (isPlaylist) {
               try {
                  const playlistInfo = await ytpl(url);
                  for (x of playlistInfo.items) {
                     song = {
                        title: x.title,
                        url: x.shortUrl,
                        duration: x.durationSec,
                        live: x.isLive,
                     };
                     queueConstruct.songs.push(song);
                  }
               } catch (err) {
                  console.log(err);
               }
            }
            if (!isPlaylist) {
               try {
                  const videoInfo = await ytdl.getInfo(url);

                  song = {
                     title: videoInfo.videoDetails.title,
                     url: videoInfo.videoDetails.video_url,
                     duration: videoInfo.videoDetails.lengthSeconds,
                     live: videoInfo.videoDetails.isLiveContent,
                  };
               } catch (err) {
                  console.log(err);
                  message.reply(
                     "❌ Due to recent changes to youtube's EULA, age restricted videos are not available"
                  );
                  return;
               }
            }
         }
         //If serverQueue exists, add song to end of playlist
         if (serverQueue && !isPlaylist) {
            serverQueue.songs.push(song);
            message.reply(`🎶 Added ${song.title} to the queue! 🎶`);
            serverQueue.channel = message.channel;
            return;
         }

         //If serverqueue exists and link is playlist
         if (serverQueue && isPlaylist) {
            for (y of queueConstruct.songs) {
               serverQueue.songs.push(y);
            }
            message.reply(
               `🎶 Added ${queueConstruct.songs.length} songs to the Queue!🎶`
            );
            serverQueue.channel = message.channel;
            return;
         }

         //If serverQueue doesn't exist, start player
         queueConstruct.songs.push(song);
         message.client.queue.set(message.guildId, queueConstruct);
         try {
            musicPlayer(message, queueConstruct.songs[0].url);
         } catch (error) {
            message.reply(
               "❌ An unknown error has ocurred, Most likely i don't have permissions to join your channel "
            );
         }
         if (isPlaylist) {
            message.reply(
               `🎶 Added ${queueConstruct.songs.length} songs to the Queue!🎶`
            );
         }
         if (!isPlaylist) {
            message.reply(
               `🎵 Added ${queueConstruct.songs[0].title} to the queue! 🎵`
            );
         }
         message.channel.send(
            `🎵 Now playing ${queueConstruct.songs[0].title} 🎵`
         );
      }
   },
};
