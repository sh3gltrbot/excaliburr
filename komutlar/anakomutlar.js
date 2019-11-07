const Discord = require('discord.js');
const ayarlar = require('../ayarlar.json');

var prefix = ayarlar.prefix;

exports.run = (client, message, params) => {
  const embedyardim = new Discord.RichEmbed()
  .setThumbnail("https://media.giphy.com/media/VCPKCmtdZNIkHaMn7N/giphy.gif")
  .setTitle("**Ana**")
  .setDescription('')
  .setColor(0x00ffff)
.addField("**:scales: :Ana Komutlar: :scales:**", ` d!reklamtaraması = Oynuyor Yerinde Reklam Yapanları Bulur. \n d!yardım = Bot komutlarını atar. \n d!bilgi = Bot kendisi hakkında bilgi verir. \n d!ping = Bot gecikme süresini söyler. \n x!istatistik = Bot istatistiklerini söyler. `)  
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
  aliases: ['ana', 'ak', '3'],
  permLevel: 0
};

exports.help = {
  name: 'anakomutlar',
  description: 'Ana komutları gösterir.',
  usage: 'anakomutlar'
};
