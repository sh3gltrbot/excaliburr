const Discord = require('discord.js');

exports.run = (client, message, args) => {
    let guild = message.guild
    let duyurular = guild.channels.find('name', 'anketler');
    if (!duyurular) return message.reply('`anketler` kanalÄ±nÄ± bulamÄ±yorum.');
    let mesaj = args.slice(0).join(' ');
    if (mesaj.length < 1) return message.reply('Bir ÅŸey yazmadÄ±nÄ±z.');
    message.delete();
    const embed = new Discord.RichEmbed()
    .setColor(0xD97634)
    .setDescription(`**Anket**\n${mesaj}`)
    return guild.channels.get(duyurular.id).sendEmbed(embed);
    message.react("SH3G’©")
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['duyuru', 'duyuruyap'],
  permLevel: 0
};

exports.help = {
  name: 'anket',
  description: 'Sunucuda Duyuru yapmanÄ±zÄ± saÄŸlar.',
  usage: 'anket [yazÄ±]'
}; 
