const Discord = require('discord.js');
const ayarlar = require('../ayarlar.json');

var prefix = ayarlar.prefix;

exports.run = (client, message, params) => {
  const embedyardim = new Discord.RichEmbed()
  .setThumbnail("https://media.giphy.com/media/VCPKCmtdZNIkHaMn7N/giphy.gif")
  .setTitle("<a:nlemsh3g:638700077782794240> **Yardım İçin Lütfen Yetkililere Başvurunuz**")
  .setDescription('')
  .setColor(0x00ffff)
  .addField("<a:bluediscord:638700076725960714> Bot Yapımcısı : **SH3G**", `İnstagram: @**efe.gktg06** `)
   
  if (!params[0]) {
    const commandNames = Array.from(client.commands.keys());
    const longest = commandNames.reduce((long, str) => Math.max(long, str.length), 0);
    message.channel.send(embedyardim);
    message.react('✅')
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
  aliases: ['h', 'halp', 'help', 'y'],
  permLevel: 0
};

exports.help = {
  name: 'yardım',
  description: 'Tüm komutları gösterir.',
  usage: 'yardım [komut]'
};
