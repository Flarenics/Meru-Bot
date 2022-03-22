const ytdl = require("ytdl-core");
const {
   AudioPlayerStatus,
   StreamType,
   createAudioPlayer,
   createAudioResource,
   joinVoiceChannel,
} = require("@discordjs/voice");
const { VoiceConnectionStatus, entersState } = require("@discordjs/voice");

module.exports = {
   async musicPlayer(message, videoId) {
      // variables
      const queue = message.client.queue.get(message.guildId);
      const videoInfo = await ytdl.getInfo(videoId);

      //set up connection
      const connection = joinVoiceChannel({
         channelId: message.member.voice.channel.id,
         guildId: message.guildId,
         adapterCreator: message.guild.voiceAdapterCreator,
      });

      //set up stream
      const stream = ytdl(videoId, {
         filter: videoInfo.videoDetails.isLiveContent ? null : null,
         quality: videoInfo.videoDetails.isLiveContent ? null : "highestaudio",
         liveBuffer: 1000,
         highWaterMark: 1 << 25,
         isHLS: videoInfo.videoDetails.isLiveContent,
      });

      //create audio resource from stream
      const resource = createAudioResource(stream, {
         inputType: StreamType.Arbitrary,
         inlineVolume: true,
      });

      resource.volume.setVolume(0.1);

      //create audio player
      const player = createAudioPlayer();

      try {
         // make player play to audioresource(stream)
         player.play(resource);

         // subscripe voice connection to player
         connection.subscribe(player);
      } catch (err) {
         console.log(err);
      }


      //If song finished, cycle to the next song
      player.on(AudioPlayerStatus.Idle, async () => {
         //if last song
         if (queue.songs.length == 1) {
            queue.channel.send("❌ No more songs in queue");
            message.client.queue.delete(message.guildId);
            return;
         }

         //check if loop
         if (queue.loop) {
            let lastSong = queue.songs.shift();
            queue.songs.push(lastSong);
         } else {
            queue.songs.shift();
         }

         try {
            player.stop();

            let newResource = createAudioResource(
               ytdl(queue.songs[0].url, {
                  filter: videoInfo.videoDetails.isLiveContent ? null : null,
         quality: videoInfo.videoDetails.isLiveContent ? null : "highestaudio",
         liveBuffer: 1000,
                  isHLS: queue.songs[0].live,
               }),
               {
                  inputType: StreamType.Arbitrary,
                  inlineVolume: true,
               }
            );

            newResource.volume.setVolume(0.1);

            //play new audio resource
            player.play(newResource);
         } catch (err) {
            console.log(err);
         }
         queue.channel.send(`🎵 Now playing ${queue.songs[0].title} 🎵`);
      });

      //if skip command is received
      message.client.on("commandSkip", async (message) => {
         try {
            message.reply(`⏩ Skipped ${queue.songs[0].title} ⏩ `);

            //If last song in queue
            if (queue.songs.length == 1) {
               message.client.queue.delete(message.guildId);
               player.stop();
               return;
            }

            //check if loop
            if (queue.loop) {
               let lastSong = queue.songs.shift();
               queue.songs.push(lastSong);
            } else {
               queue.songs.shift();
            }
            try {
               player.stop();

               let newResource = createAudioResource(
                  ytdl(queue.songs[0].url, {
                     filter: videoInfo.videoDetails.isLiveContent ? null : null,
         quality: videoInfo.videoDetails.isLiveContent ? null : "highestaudio",
         liveBuffer: 1000,
                     isHLS: queue.songs[0].live,
                  }),
                  {
                     inputType: StreamType.Arbitrary,
                     inlineVolume: true,
                  }
               );

               newResource.volume.setVolume(0.1);
               //play new resource
               player.play(newResource);
            } catch (err) {
               console.log(err);
            }
            queue.channel.send(`🎵 Now playing ${queue.songs[0].title} 🎵`);
         } catch (error) {
            console.log(error);
         }
      });

      //disconnect handling
      connection.on(
         VoiceConnectionStatus.Disconnected,
         async (oldState, newState) => {
            try {
               await Promise.race([
                  entersState(
                     connection,
                     VoiceConnectionStatus.Signalling,
                     5_000
                  ),
                  entersState(
                     connection,
                     VoiceConnectionStatus.Connecting,
                     5_000
                  ),
               ]);
               // Seems to be reconnecting to a new channel - ignore disconnect
            } catch (error) {
               // Seems to be a real disconnect which SHOULDN'T be recovered from
               message.client.queue.delete(message.guildId);
               connection.destroy();
               player.stop;
            }
         }
      );
   },
};
