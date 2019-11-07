const Discord = require('discord.js');

exports.run = async (client, message, args) => {

  if(!message.member.roles.has("633282410187980801")) return message.channel.send(`Bu komutu kullanabilmek için **ላ | Teyit Sorumlusu** rolüne sahip olmalısınız`)
  let member = message.mentions.members.first()
  let isim = args.slice(1).join(" ")
  if (!member) return message.channel.send('Bir üye etiketlemelisin')
  member.addRole('633282417318297625')
  member.removeRole('638690569270591499')
    const embed = new Discord.RichEmbed()
  .setDescription(`${member.user} kullanıcısına **♀ | Woman** rolü verildi. `)
  .setFooter(`Komutu kullanan yetkili : ${message.author.username}`)  
  .setThumbnail(client.user.avatarURL)
  message.channel.send(embed)
};

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: ['kız'],
  permLevel: 0
}
exports.help = {
  name: 'kız',
  description: "Birinin nickini değiştirir.",
  usage: 'kız'
}
 