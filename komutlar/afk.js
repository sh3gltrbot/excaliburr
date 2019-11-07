exports.run = async (client, msg, args) => {
   if (!args[0]) return msg.channel.send({embed: {
       color: Math.floor(Math.random() * (0xFFFFFF + 1)),
       description: (`<a:pikau2:620191350729605120> **AFK** nedenini gir.`)
 }});
  let name = msg.author.username
  if(msg.author.username.startsWith("[AFK]")){
    msg.reply("<a:pikau2:620191350729605120>  Zaten **AFK**'sın.")
  }
  else {
    msg.reply("<a:tik:620191368697872387>  Artık **AFK**'sın.")
     msg.member.setNickname(`[AFK]${msg.author.username}`);
  }  
}

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: 0
};

exports.help = {
  name: 'afk',
  description: 'AFK olmanızı sağlar.',
  usage: 'x!afk <sebep>'
};