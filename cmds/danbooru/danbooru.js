const dotenv = require("dotenv").config();
const { MessageEmbed } = require("discord.js");
const https = require("https");

module.exports = {
   name: "danbooru",
   aliases: [],
   async execute(message, args) {
      const booruAPIKey = process.env.BOORUTOKEN;
      function embedGenerator(title, text, sauce) {
         try {
            return (embed = new MessageEmbed()
               .setColor("#b73739")
               .setImage(text)
               .addField("\u200b", `[Source](${sauce})`)
               .setFooter({
                  text: "Meru",
                  iconURL:
                     "https://cdn.discordapp.com/emojis/949651430376095825.gif?size=96&quality=lossless",
               }));
         } catch (err) {
            console.log(err);
         }
      }
      const options = {
         hostname: `danbooru.donmai.us`,
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
                        JSON.parse(datastream.toString())[0].file_url,
                        JSON.parse(datastream.toString())[0].source
                     ),
                  ],
               });
               console.log(JSON.parse(datastream.toString())[0].file_url);
            } catch (error) {
               console.log(error);
               message.reply("Please wait! This command is on cooldown!");
            }
         });
      });
      req.on("error", (error) => {
         console.error(error);
      });
   },
};

let sampleresponse = [
   {
      id: 4817497,
      created_at: "2021-10-02T00:48:49.961-04:00",
      uploader_id: 454016,
      score: 10,
      source: "https://twitter.com/dorianpanda/status/1441718450242523136",
      md5: "3bf9c5adc48d93c7a0a9af2409d9a757",
      last_comment_bumped_at: "2021-10-02T01:00:01.014-04:00",
      rating: "s",
      image_width: 1421,
      image_height: 2575,
      tag_string:
         "1boy 1girl 4koma absurdres arms_behind_back black_hair blush boxcutter breast_conscious breasts coke-bottle_glasses comic commentary cutting_board dorianpanda double_bun drawing flying_sweatdrops gakuran glasses green_hair hair_ornament highres hololive large_breasts mechanical_pencil open_mouth pencil red_eyes ribbed_sweater school_uniform serafuku shirogane_noel skull_hair_ornament small_breasts smile sweatdrop sweater translated uruha_rushia virtual_youtuber yandere",
      fav_count: 16,
      file_ext: "jpg",
      last_noted_at: "2021-10-02T00:55:33.329-04:00",
      parent_id: null,
      has_children: true,
      approver_id: null,
      tag_count_general: 34,
      tag_count_artist: 1,
      tag_count_character: 2,
      tag_count_copyright: 1,
      file_size: 2121309,
      up_score: 10,
      down_score: 0,
      is_pending: false,
      is_flagged: false,
      is_deleted: false,
      tag_count: 42,
      updated_at: "2021-10-02T15:47:33.045-04:00",
      is_banned: false,
      pixiv_id: null,
      last_commented_at: "2021-10-02T01:00:01.014-04:00",
      has_active_children: true,
      bit_flags: 2,
      tag_count_meta: 4,
      has_large: true,
      has_visible_children: true,
      tag_string_general:
         "1boy 1girl 4koma arms_behind_back black_hair blush boxcutter breast_conscious breasts coke-bottle_glasses comic cutting_board double_bun drawing flying_sweatdrops gakuran glasses green_hair hair_ornament large_breasts mechanical_pencil open_mouth pencil red_eyes ribbed_sweater school_uniform serafuku skull_hair_ornament small_breasts smile sweatdrop sweater virtual_youtuber yandere",
      tag_string_character: "shirogane_noel uruha_rushia",
      tag_string_copyright: "hololive",
      tag_string_artist: "dorianpanda",
      tag_string_meta: "absurdres commentary highres translated",
      file_url:
         "https://cdn.donmai.us/original/3b/f9/3bf9c5adc48d93c7a0a9af2409d9a757.jpg",
      large_file_url:
         "https://cdn.donmai.us/sample/3b/f9/sample-3bf9c5adc48d93c7a0a9af2409d9a757.jpg",
      preview_file_url:
         "https://cdn.donmai.us/preview/3b/f9/3bf9c5adc48d93c7a0a9af2409d9a757.jpg",
   },
];
