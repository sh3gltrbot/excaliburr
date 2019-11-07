const Discord = require('discord.js');

exports.run = (client, message, args) => {
  message.delete();
  let mesaj = args.slice(0).join(' ');
  let user = message.mentions.users.first();
  if (message.mentions.users.size < 1) return message.reply('Kime dm atmam gerekiyor amk').catch(console.error).then(m => m.delete(9000));
  message.reply('Belirtilen kişiye `DM` attım sürtük').then(m => m.delete(3000));
  const embed = new Discord.RichEmbed()
  .setColor('#000001')
  .setDescription('**' + mesaj + '**');
  return user.send(embed);
};

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: ['dm'],
  permlevel: 3
};

exports.help = {
  name: 'dmat',
  description: 'Belirtilen kullanıcıya DM atar',
  usage: 'dmat <@kişi> <Mesaj>'
};