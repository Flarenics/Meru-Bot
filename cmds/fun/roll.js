const { Permissions } = require("discord.js");
const bitPermissions = new Permissions(268550160n);

const meruEmojiList = [
   `<:B_:699387192921030708>`,
   `<:WHOA:699387194108018700>`,
   `<:ayyyy:949805452059885619>`,
   `<:blanket:949804834406686740>`,
   `<:catface:699387191947690045>`,
   `<:choke:699387194317733958>`,
   `<:concern:699387192807522364>`,
   `<:dab:699387193365626951>`,
   `<:death:699387194095173652>`,
   `<:duuude:699387193629868111>`,
   `<:fiteme:699387194950942801>`,
   `<:goodsh:699387193461833729>`,
   `<:hahacringe:822229929453420604>`,
   `<:hands:699387193931726949>`,
   `<:happthink:699387191016685640>`,
   `<:headpat:699387193835257957>`,
   `<:honk:699387195240218664>`,
   `<:hyperchamp:699387195295006781>`,
   `<:impurethoughts:699387195311783977>`,
   `<:itstimetostop:699387195248607292>`,
   `<:lul:699387194225328149>`,
   `<:zzz:699387194917257318>`,
   `<:meruD8:949805275290959892>`,
   `<:meruomegalul:699387194489569311>`,
   `<:merusad:949805126988746753>`,
   `<:merusip:699387195168915527>`,
   `<:merussr:699387193311101040>`,
   `<:monkaS:699387194468728852>`,
   `<:monkaSdistort:699387195307458610>`,
   `<:mouthbreather:699387194812399708>`,
   `<:nobully:699387194221002805>`,
   `<:nyehehe:949805644423254066>`,
   `<:pogchamp:822230021707530240>`,
   `<:pouty:949806191423397928>`,
   `<:shrug:949805821263495218>`,
   `<:shy:949804930129096764>`,
   `<:smirk:699387192371445900>`,
   `<:squeee:699387195194343444>`,
   `<:sweat:949805953040121926>`,
   `<:thinking:699387192077713450>`,
   `<:visibleconfusion:822229857555054622>`,
   `<:wall:699387194401488966>`,
   `<:wow:699387195181629471>`,
   `<:wtfamilookingat:949805019769733130>`,
   `<:zoomedcatface:927225589415411754>`,
];

module.exports = {
   name: "roll",
   aliases: [],
   async execute(message) {
      let emoji = meruEmojiList[Math.floor(Math.random() * 64) - 1];
      if (
         message.member.permissions.has(Permissions.FLAGS.USE_EXTERNAL_EMOJIS)
      ) {
         try {
            message.reply("<a:meruroller:955481121255219270>").then((msg) => {
               setTimeout(function () {
                  msg.edit(emoji);
               }, Math.floor(Math.random() * 7000));
            });
         } catch (err) {
            console.log(err);
         }
      } else
         message.reply("I do not not have permission to use external emojis!");
   },
};