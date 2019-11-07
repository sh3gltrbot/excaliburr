const Discord = require('discord.js');
const ayarlar = require('../ayarlar.json');

var prefix = ayarlar.prefix;

exports.run = (client, message, params) => {
  const embedyardim = new Discord.RichEmbed()
  .setThumbnail("https://media.giphy.com/media/iDUM51yficY8Fdmrig/giphy.gif")
  .setTitle("**Eğlence!**")
  .setDescription('')
  .setColor(0x00ffff)
  .addField("<a:bum:620286452802256896> **Eğlence Komutları:** ", `------`)
  .addField("**x!özlüsöz = Şakir Bir Özlü Söz Söyler.**", `**x!sunucubilgi = Sunucu Bilgisini Verir**`)
  .addField("**x!geldim/x!afk** = **AFK Moduna Girmenizi-Çıkmanızı Sağlar**", `**x!kullanıcıbilgim = Kullanıcı Bilginizi Verir.**`) 
.addField("**x!gif = Rastgele Gifler**", `**x!atatürk** = **Atatürk Resimleri Gösterir.**`) 
  .addField("**-----------**", `**- The Event - Bots -**`) 

  if (!params[0]) {
    const commandNames = Array.from(client.commands.keys());
    const longest = commandNames.reduce((long, str) => Math.max(long, str.length), 0);
    message.channel.send(embedyardim);
  } else {
    let command = params[0];
    if (client.commands.has(command)) {
      command = client.commands.get(command);
      message.author.send('asciidoc', `= ${command.help.name} = \n${command.help.description}\nDoğru kullanım: ` + prefix + `${command.help.usage}`);
    }
  }
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['e', 'eğ', '1'],
  permLevel: 0
};

exports.help = {
  name: 'eğlence',
  description: 'Eğlence komutlarını gösterir.',
  usage: 'eğlence'
};
