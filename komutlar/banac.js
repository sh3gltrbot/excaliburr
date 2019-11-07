const Discord = require('discord.js')

exports.run = function(client, message, args) {
  
let guild = message.guild

if(!message.member.hasPermission("ADMINISTRATOR")) return message.channel.send(`Bu komutu kullanabilmek için "**Allah**" yetkisine sahip olmalısınız.`);
message.guild.fetchBans().then(bans => {
bans.forEach(ban => {
message.guild.unban(ban.id)
})})
};

module.exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [""],
 kategori: "EKSTRA KOMUTLARI",
  permLevel: 0
};

module.exports.help = {
  name: 'unbanall',
  description: 'Botun destek sunucusunu atar.',
  usage: 'destek'
};