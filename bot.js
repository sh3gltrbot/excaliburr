//consts (for glitch)
// GEREKLİ YERLER
const express = require("express");
const app = express();
const http = require("http");
app.get("/", (request, response) => {
  console.log(
    ` az önce pinglenmedi. Sonra ponglanmadı... ya da başka bir şeyler olmadı.`
  );
  response.sendStatus(200);
});
app.listen(process.env.PORT);
setInterval(() => {
  http.get(`http://${process.env.PROJECT_DOMAIN}.glitch.me/`);
}, 280000);
// GEREKLİ YERLER
// -------------------------------------------------------------
const Discord = require("discord.js");
const client = new Discord.Client();
const ayarlar = require("./ayarlar.json");
const chalk = require("chalk");
const fs = require("fs");
const moment = require("moment");
const Jimp = require("jimp");
const db = require("quick.db");
require("./util/eventLoader")(client);

var prefix = ayarlar.prefix;

const log = message => {
  console.log(`[${moment().format("YYYY-MM-DD HH:mm:ss")}] ${message}`);
};

client.commands = new Discord.Collection();
client.aliases = new Discord.Collection();
fs.readdir("./komutlar/", (err, files) => {
  if (err) console.error(err);
  log(`${files.length} komut yüklenecek.`);
  files.forEach(f => {
    let props = require(`./komutlar/${f}`);
    log(`Yüklenen komut: ${props.help.name}.`);
    client.commands.set(props.help.name, props);
    props.conf.aliases.forEach(alias => {
      client.aliases.set(alias, props.help.name);
    });
  });
});

client.reload = command => {
  return new Promise((resolve, reject) => {
    try {
      delete require.cache[require.resolve(`./komutlar/${command}`)];
      let cmd = require(`./komutlar/${command}`);
      client.commands.delete(command);
      client.aliases.forEach((cmd, alias) => {
        if (cmd === command) client.aliases.delete(alias);
      });
      client.commands.set(command, cmd);
      cmd.conf.aliases.forEach(alias => {
        client.aliases.set(alias, cmd.help.name);
      });
      resolve();
    } catch (e) {
      reject(e);
    }
  });
};

client.load = command => {
  return new Promise((resolve, reject) => {
    try {
      let cmd = require(`./komutlar/${command}`);
      client.commands.set(command, cmd);
      cmd.conf.aliases.forEach(alias => {
        client.aliases.set(alias, cmd.help.name);
      });
      resolve();
    } catch (e) {
      reject(e);
    }
  });
};

client.unload = command => {
  return new Promise((resolve, reject) => {
    try {
      delete require.cache[require.resolve(`./komutlar/${command}`)];
      let cmd = require(`./komutlar/${command}`);
      client.commands.delete(command);
      client.aliases.forEach((cmd, alias) => {
        if (cmd === command) client.aliases.delete(alias);
      });
      resolve();
    } catch (e) {
      reject(e);
    }
  });
};

client.on("message", message => {
  const dmchannel = client.channels.find(x => x.name === "dw-log"); // 'notechdm' yazan yeri sunucunuzda bi' kanalin ismini yazýn. bota özelden yazýlanlar oradan görülecektir.
  if (message.channel.type === "dm") {
    if (message.author.id === client.user.id) return;
    dmchannel.sendMessage("", {
      embed: {
        color: 3447003,
        title: `Yazan: ${message.author.tag} ID: ${message.author.id}`,
        description: `${message.content}`
      }
    });
  }
  if (message.channel.bot) return;
});

client.on("message", msg => {
  if (msg.content === "sa") {
  }
});

client.on("message", async msg => {
  if (msg.content.toLowerCase() === "sa") {
    await msg.react("🇦");
    msg.react("🇸");
  }
});

client.on("message", message => {
  if (message.content === "<@334490425408749570>") {
    const embed = new Discord.RichEmbed()
      .setTitle("ben SH3G:")
      .setDescription("ne var lan")
      .setColor("RANDOM");
    message.reply(embed);
  }
});

client.on("message", async msg => {
  if (msg.content.toLowerCase() === "sa") {
    await msg.react("<:as:503505311248941086>");
    msg.react("<:HG:503505409999372288>");
  }
});

const snekfetch = require("snekfetch");
let points = JSON.parse(fs.readFileSync("./xp.json", "utf8"));

var f = [];
function factorial(n) {
  if (n == 0 || n == 1) return 1;
  if (f[n] > 0) return f[n];
  return (f[n] = factorial(n - 1) * n);
}
function clean(text) {
  if (typeof text === "string")
    return text
      .replace(/`/g, "`" + String.fromCharCode(8203))
      .replace(/@/g, "@" + String.fromCharCode(8203));
  else return text;
}

client.on("message", async message => {
  if (message.channel.type === "dm") return;

  if (message.author.bot) return;

  var user = message.mentions.users.first() || message.author;
  if (!message.guild) user = message.author;

  if (!points[user.id])
    points[user.id] = {
      points: 0,
      level: 0
    };

  let userData = points[user.id];
  userData.points++;

  let curLevel = Math.floor(0.1 * Math.sqrt(userData.points));
  if (curLevel > userData.level) {
    userData.level = curLevel;
    var user = message.mentions.users.first() || message.author;
    message.channel.send(
      `🆙 **| ${user.username} Tebrikler! Level atladın ${userData.level}**`
    );
  }

  fs.writeFile("./xp.json", JSON.stringify(points), err => {
    if (err) console.error(err);
  });

  if (
    message.content.toLowerCase() === prefix + "level" ||
    message.content.toLowerCase() === prefix + "profil"
  ) {
    const level = new Discord.RichEmbed()
      .setTitle(`${user.username}`)
      .setDescription(
        `**Seviye:** ${userData.level}\n**EXP:** ${userData.points}`
      )
      .setColor("RANDOM")
      .setFooter(``)
      .setThumbnail(user.avatarURL);
    message.channel.send(
      `📝 **| ${user.username} Adlı Kullanıcının Profili Burada!**`
    );
    message.channel.send(level);
  }
});

client.on("message", msg => {
  if (msg.content.toLowerCase() === prefix + "say") {
    const embed = new Discord.RichEmbed()
      .setColor("RANDOM")
      .setTitle(
        " Sunucuda " +
          client.guilds
            .reduce((a, b) => a + b.memberCount, 0)
            .toLocaleString() +
          " Kullanıcı var!"
      );
    msg.channel.send({ embed });
  }
});

client.on("message", message => {
  if (message.content === prefix + "bilgi") {
    const embed = new Discord.RichEmbed()

      .addField("Bot Sahibi", `@SH3GLTR`, true)

      .addField("Version", "1.1.5", true)

      .addField("Kitaplık Türü", "Glitch")

      .setColor(0x000001);

    return message.channel.sendEmbed(embed);
  }
});

client.on("channelCreate", async channel => {
  var logs = channel.guild.channels.find(c => c.name === "dw-log");
  if (!logs) return console.log("#mod-log Kanalı Bulunamadı!");
  const cembed = new Discord.RichEmbed()
    .setTitle("Kanal Oluşturuldu! ⚠")
    .setColor("RANDOM")
    .setDescription(`**${channel.name}** Kanalı Oluşturuldu! ✅`)
    .setTimestamp(new Date());
  logs.send(cembed);
});

client.on("channelDelete", async channel => {
  var logs = channel.guild.channels.find(c => c.name === "dw-log");
  if (!logs) return console.log("#mod-log Kanalı Bulunamadı!");
  const cembed = new Discord.RichEmbed()
    .setTitle("Kanal Silindi! ⚠")
    .setColor("RANDOM")
    .setDescription(`**${channel.name}** Kanalı Silindi ✖`)
    .setTimestamp(new Date());
  logs.send(cembed);
});

client.on("message", async message => {
  var user = message.mentions.users.first() || message.author;
  if (message.content.toLowerCase() === prefix + "wasted") {
    message.channel.startTyping();
    var user = message.mentions.users.first() || message.author;
    if (!message.guild) user = message.author;

    Jimp.read(user.avatarURL, (err, image) => {
      image.resize(295, 295);
      image.greyscale();
      image.gaussian(3);
      Jimp.read(
        "https://cdn.glitch.com/b18a2fa6-68cb-49d5-9818-64c50dd0fdab%2F1.png?1529363616039",
        (err, avatar) => {
          avatar.resize(295, 295);
          image
            .composite(avatar, 4, 0)
            .write(`./img/wasted/${client.user.id}-${user.id}.png`);
          setTimeout(function() {
            message.channel.send(
              new Discord.Attachment(
                `./img/wasted/${client.user.id}-${user.id}.png`
              )
            );
          }, 1000);
          message.channel.stopTyping();
        }
      );
    });
  }
});

//////////////////////////becerdim

client.on("message", message => {
  if (message.content.toLowerCase() === prefix + "özlüsöz") {
    var sans = [
      "Affetmek geçmişi değiştirmez ama geIeceğin önünü açar",
      "İnsanIar seninIe konuşmayı bıraktığında, arkandan konuşmaya başIarIar",
      "Hayattan korkmayın çocuklar;iyi ve doğru bir şeyler yaptığınız zaman hayat öyle güzel ki",
      "Mutluluğu tatmanın tek çaresi, onu paylaşmaktır.",
      "Küçük şeylere gereğinden çok önem verenler, elinden büyük iş gelmeyenlerdir.",
      "Bize yeni düşmanlar lazım. Eskileri hayranımız oldular.",
      "Asla vazgeçmeyin, kaybedenler yalnızca vazgeçenlerdir.",
      "10 kilitli kapıdan daha güvenlidir babanın evde oluşu.",
      "Sevmek için “yürek” sürdürmek için “emek” gerek.",
      "Bir insanın, bir insana verebileceği en güzel hediye; ona ayırabileceği zamandır.",
      " Benim neden kardeşim yok baba  Seni görünce ikincisine cesaret edemedik.",
      "Kendini Ne Kadar Büyük Görürsen Gör. Bende Sadece Gözümün Gördüğü Kadarsın. Ötesi yok.",
      "Mutlu olmayı yarına bırakmak, karşıya geçmek için nehrin durmasını beklemeye benzer ve bilirsin, o nehir asla durmaz.– Grange"
    ];
    var sonuc = sans[Math.floor(Math.random() * sans.length)];
    const embed = new Discord.RichEmbed()
      .addField(`¡ ¡ ¡ ¡ ¡ `, `${sonuc}`)
      .setColor("RANDOM");
    return message.channel.sendEmbed(embed);
  }
});

////////////////////////

const GIFEncoder = require("gifencoder");
client.on("message", async message => {
  var user = message.mentions.users.first() || message.author;
  if (message.content.toLowerCase() === prefix + "trigger") {
    const options = {
      size: 256,

      frames: 16
    };

    message.channel
      .send("İşleniyor.. Lütfen bekleyiniz. ⏲")
      .then(m => m.delete(1000));

    function getRandomInt(min, max) {
      return Math.floor(Math.random() * (max - min + 1)) + min;
    }
    const args = message.content.split(" ").slice(1);
    let member = message.mentions.users.first();
    if (args[0] === undefined) member = message.author;
    let avatarurl = member.avatarURL;
    if (
      ["jpg", "jpeg", "gif", "png", "webp"].some(x =>
        args.join(" ").includes(x)
      )
    ) {
      avatarurl = args.join(" ").replace(/gif|webp/g, "png");
    }
    const base = new Jimp(options.size, options.size);
    const avatar = await Jimp.read(avatarurl);
    const text = await Jimp.read(
      "https://cdn.glitch.com/a7d3b6b8-9b7a-4aab-9ee4-1db0c07ef1eb%2Ftriggered.png?1526842782410"
    );
    const tint = await Jimp.read(
      "https://cdn.glitch.com/5fed2789-b430-43c5-bf1b-a8dd32d46b97%2Fred.png?1527082445373"
    );
    avatar.resize(320, 320);
    tint.scaleToFit(base.bitmap.width, base.bitmap.height);
    tint.opacity(0.2);
    text.scaleToFit(280, 60);
    const frames = [];
    const buffers = [];
    const encoder = new GIFEncoder(options.size, options.size);
    const stream = encoder.createReadStream();
    let temp;
    stream.on("data", async buffer => await buffers.push(buffer));
    stream.on("end", async () => {
      return await message.channel.send({
        files: [
          {
            name: "notechtriggered.gif",
            attachment: Buffer.concat(buffers)
          }
        ]
      });
    });
    for (let i = 0; i < options.frames; i++) {
      temp = base.clone();
      if (i === 0) {
        temp.composite(avatar, -16, -16);
      } else {
        temp.composite(
          avatar,
          -32 + getRandomInt(-16, 16),
          -32 + getRandomInt(-16, 16)
        );
      }
      temp.composite(tint, 0, 0);
      if (i === 0) temp.composite(text, -10, 200);
      else
        temp.composite(
          text,
          -12 + getRandomInt(-8, 8),
          200 + getRandomInt(-0, 12)
        );
      frames.push(temp.bitmap.data);
    }
    encoder.start();
    encoder.setRepeat(0);
    encoder.setDelay(20);
    for (const frame of frames) {
      encoder.addFrame(frame);
    }
    encoder.finish();
  }
});

client.on("guildCreate", async guild => {
  const girismesaj = [
    "**SH3GLTR** sunucunuza eklendi.",
    "Bu bot **<@334490425408749570> - SH3GLTR** tarafından geliştirilmektedir.",
    "Botun Giriş - Çıkış Mesajlarını Göndermesi İçin giriş-çıkış Adında Bir Kanal Açmanız Gerekmektedir ",
    "**www.instagram.com/efe.gktg06**"
  ];
  guild.owner.send(girismesaj);
  console.log(`LOG: ${guild.name}. sunucuya katıldım!`);
});

client.on("message", msg => {
  const uyarıembed = new Discord.RichEmbed()
    .setColor(0x00ae86)
    .setDescription(
      "" +
        msg.author +
        "  Reklam yapma, Ban Yiyeceksin. <a:carpi:638700103577632768> <@&633282408250081300>  "
    );

  const dmembed = new Discord.RichEmbed().setTitle(
    "**Sunucunda** " + msg.author.tag + " **reklam** yapıyor!"
  );

  if (
    msg.content
      .toLowerCase()
      .match(/(discord\.gg\/)|(discordapp\.com\/invite\/)/g) &&
    msg.channel.type === "text" &&
    msg.channel
      .permissionsFor(msg.guild.member(client.user))
      .has("MANAGE_MESSAGES")
  ) {
    if (msg.member.hasPermission("BAN_MEMBERS")) {
      return;
    } else {
      msg
        .delete(30)
        .then(deletedMsg => {
          deletedMsg.channel.send(uyarıembed);
          msg.guild.owner.send(dmembed).catch(e => {
            console.error(e);
          });
        })
        .catch(e => {
          console.error(e);
        });
    }
  }
});

//////////////////
client.elevation = message => {
  if (!message.guild) {
    return;
  }
  let permlvl = 0;
  if (message.member.hasPermission("BAN_MEMBERS")) permlvl = 2;
  if (message.member.hasPermission("ADMINISTRATOR")) permlvl = 3;
  if (message.author.id === ayarlar.sahip) permlvl = 4;
  return permlvl;
};

var regToken = /[\w\d]{24}\.[\w\d]{6}\.[\w\d-_]{27}/g;

client.on("warn", e => {
  console.log(chalk.bgYellow(e.replace(regToken, "that was redacted")));
});

client.on("error", e => {
  console.log(chalk.bgRed(e.replace(regToken, "that was redacted")));
});

//////////////////////////////////////otorol

///////////////////////////// Buranın Aşağısını Silmeyin

client.login(ayarlar.token);

client.on("messageDelete", async (message, channel) => {
  if (message.author.bot || message.channel.type === "dm") return;

  if (message.author.bot) return;

  var user = message.author;

  let sChannel2 = message.guild.channels.find(c => c.name === "dw-log");
  const embed = new Discord.RichEmbed()
    .setColor("RANDOM")
    .setAuthor(`Mesaj silindi.`, message.author.avatarURL)
    .addField("Kullanıcı Tag", message.author.tag, true)
    .addField("Kanal Adı", message.channel.name, true)
    .addField("Silinen Mesaj", "```" + message.content + "```")
    .setThumbnail(message.author.avatarURL)
    .setFooter(
      `Bilgilendirme  • bügün saat ${message.createdAt.getHours() +
        3}:${message.createdAt.getMinutes()}`,
      `${client.user.displayAvatarURL}`
    );
  sChannel2.send(embed);
});

client.on("messageUpdate", async (oldMessage, newMessage) => {
  if (newMessage.author.bot || newMessage.channel.type === "dm") return;
  let sChannel3 = newMessage.guild.channels.find(c => c.name === "dw-log");
  if (oldMessage.content == newMessage.content) return;
  let embed = new Discord.RichEmbed()
    .setColor("BLUE")
    .setAuthor(`Mesaj Düzenlendi`, newMessage.author.avatarURL)
    .addField("Kullanıcı", newMessage.author)
    .addField("Eski Mesaj", oldMessage.content, true)
    .addField("Yeni Mesaj", newMessage.content, true)
    .addField("Kanal Adı", newMessage.channel.name, true)
    .setThumbnail(newMessage.author.avatarURL)
    .setFooter(
      `Bilgilendirme  • bügün saat ${newMessage.createdAt.getHours() +
        3}:${newMessage.createdAt.getMinutes()}`,
      `${client.user.displayAvatarURL}`
    );
  sChannel3.send(embed);
});
module.exports = async (member, client) => {
  let tag = await db.fetch(`tag_${member.guild.id}`);
  let tagyazi;
  if (tag == null) tagyazi = member.setNickname(`${member.user.username}`);
  else tagyazi = member.setNickname(`${tag} | ${member.user.username}`);
};

client.on("message", message => {
  if (!message.channel.guild) return;
  if (message.content.startsWith(prefix + "kacbot")) {
    if (message.author.bot) return;
    let i = 1;
    const botssize = message.guild.members
      .filter(m => m.user.bot)
      .map(m => `${i++} - <@${m.id}>`);
    const embed = new Discord.RichEmbed()
      .setAuthor(message.author.tag, message.author.avatarURL)
      .setDescription(
        `**Sunucuda ${
          message.guild.members.filter(m => m.user.bot).size
        } adet bot var**
${botssize.join("\n")}`
      )
      .setFooter(client.user.username, client.user.avatarURL)
      .setTimestamp();
    message.channel.send(embed);
  }
});

client.on("ready", () => {
  console.log(`Bot Aktif`);
  setInterval(function() {
    let kanal = client.channels.get("636683378086641674");
    if (kanal) {
      kanal.send("**Ekibimize katılmak istersen adına  `৳`  ekleyebilirsin.**");
    }
  }, 1200000);
});

client.login(ayarlar.token);

client.on("message", msg => {
  if (msg.content.toLowerCase() === "tag") {
    msg.channel.sendMessage("৳");
  }
});

client.on("message", msg => {
  if (msg.content.toLowerCase() === "tagı at") {
    msg.channel.sendMessage("৳");
  }
});

client.on("message", msg => {
  if (msg.content.toLowerCase() === "tagı ver") {
    msg.channel.sendMessage("৳");
  }
});

client.on("message", msg => {
  if (msg.content.toLowerCase() === "tagı tükür") {
    msg.channel.sendMessage("৳");
  }
});

client.on("message", msg => {
  if (msg.content.toLowerCase() === "Tag") {
    msg.channel.sendMessage("৳");
  }
});


    client.on("guildMemberAdd", member => {
  if (member.guild.id !== "633282305246625792") return; //tırnak işareti arasına sunucu id
  let eskiNick = member.user.username;
  const id = "633282443079712784"; //Kanal id
  const channel = member.guild.channels.get(id);
    channel.send("<a:geldi:638700077145260042>  <@" + member.user.id +"> Merhaba, **DarkWorld** e Hoşgeldin.\n\n<a:purplesh3g:638700080777396247>  Lütfen **Ses Teyit** Odalarına girerek teyitinizi veriniz.\n\n<a:purplesh3g:638700080777396247>  Eğer **Ses Teyit** Kanallarında Teyitci Yoksa **<@&633282410187980801>**  Etiket Atarak Görmelerini Sağlayınız ..\n\n<a:bluediscord:638700076725960714>  Güncel Kişi Sayımız: **" +  member.guild.members.size +"** \n\n <@&638690569270591499>\nhttps://media.giphy.com/media/gg88q3MQis3m1Ami1n/giphy.gif"  );
});

client.on("userUpdate", async(old, nev) => {
  if(old.username !== nev.username) {
  if(!nev.username.includes("৳") && client.guilds.get("633282305246625792").members.get(nev.id).roles.has("633282414403125269")) {
     client.guilds.get("633282305246625792").members.get(nev.id).removeRole("633282414403125269")
     client.channels.get('633282456107352074').send(`**${nev}, "৳" tagını çıkardığı için DarkWorld tarafından <@&633282414403125269> rolü alındı!**`)
    } 
     if(nev.username.includes("৳") && !client.guilds.get("633282305246625792").members.get(nev.id).roles.has("633282414403125269")) {
      client.channels.get('633282456107352074').send(`**${nev}, "৳" tagını aldığı için DarkWorld tarafından <@&633282414403125269> rolü verildi!**`) 
      client.guilds.get("633282305246625792").members.get(nev.id).addRole("633282414403125269")
     }
  }
  })


client.on("message",message => {
  if(!message.author.bot) return;
  db.fetch(`usohbet_${message.channel.id}`).then(usdurum => {
    if(!usdurum || usdurum === 'pasif') return;
    else {
      message.delete(10000)
    }
})})