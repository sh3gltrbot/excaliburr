const Discord = require('discord.js');

exports.run = async (client, message, args) => {

  if(!message.member.roles.has("619990558395465750")) return message.channel.send(`Bu komutu kullanabilmek için **⚡️ | Commanders** rolüne sahip olmalısınız`)
  let member = message.mentions.members.first()
  let isim = args.slice(1).join(" ")
  if (!member) return message.channel.send('Bir üye etiketlemelisin')
  if (!isim) return message.channel.send('Bir isim yazmalısın')
  member.setNickname(`${isim}`)
  const embed = new Discord.RichEmbed()
  .setDescription(`${member.user} kullanıcısı kayıt edildi ve kullanıcı adı ${isim} olarak ayarlandı`)
  .setFooter(`Komutu kullanan yetkili : ${message.author.username}`)  
  .setThumbnail(client.user.avatarURL)
  message.channel.send(embed)
};

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: ['kayıt'],
  permLevel: 0
}
exports.help = {
  name: 'kayıt',
  description: "Birinin nickini değiştirir.",
  usage: 'kayıt'
}
 