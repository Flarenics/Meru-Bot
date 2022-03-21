const meruEmojiList = [
   `<:B_:699387192921030708>`,
   `<a:HYPERWOAH:748575410408784056>`,
   `<a:MeruBongo:949647695948173312>`,
   `<a:MeruPolice:949651430376095825>`,
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
   `<a:grabby:949804668048015450>`,
   `<:hahacringe:822229929453420604>`,
   `<:hands:699387193931726949>`,
   `<:happthink:699387191016685640>`,
   `<:headpat:699387193835257957>`,
   `<:honk:699387195240218664>`,
   `<:hyperchamp:699387195295006781>`,
   `<:impurethoughts:699387195311783977>`,
   `<:itstimetostop:699387195248607292>`,
   `<:lul:699387194225328149>`,
   `<a:meruAmongus:949645932083957790>`,
   `<a:meruBongoHype:949647560178561055>`,
   `<a:meruCheer:949647467534762024>`,
   `<:zzz:699387194917257318>`,
   `<a:meruClap:949646674891001876>`,
   `<:meruD8:949805275290959892>`,
   `<a:meruDrool:949646083204739153>`,
   `<a:meruDroolDeadeyes:949645633579548763>`,
   `<a:meruDroolHypno:949644883440832513>`,
   `<a:meruLongPerorero:949646382887735386>`,
   `<a:meruNoH:949677854264811520>`,
   `<:meruomegalul:699387194489569311>`,
   `<a:merupatnocrypls:753394204918546473>`,
   `<:merusad:949805126988746753>`,
   `<:merusip:699387195168915527>`,
   `<:merussr:699387193311101040>`,
   `<a:meruyay:949645176580734977>`,
   `<a:mewwuluv:949645176580734977>`,
   `<:monkaS:699387194468728852>`,
   `<:monkaSdistort:699387195307458610>`,
   `<a:morecoffee:952910055232126977>`,
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
   `<a:veryangysuccping:758865892301471774>`,
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
      try {
         message.reply("<a:meruroller:955481121255219270>").then((msg) => {
            setTimeout(function () {
               msg.edit(emoji);
            }, Math.floor(Math.random() * 7000));
         });
      } catch (err) {
         console.log(err);
      }
   },
};
