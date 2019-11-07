const Discord = require('discord.js');

exports.run = async (client, message) => {
 
  if (client.guilds.size < 1) return message.reply("Bot `10` tane sunucuda bulunmuyor!")
  
const top = client.guilds.sort((a,b)=>a.memberCount-b.memberCount).array().reverse()
message.channel.send(`1. **${top[0].name}**: ${top[0].memberCount}\n\n2. **${top[1].name}**: ${top[1].memberCount}\n\n3. **${top[2].name}**: ${top[2].memberCount}\n\n4. **${top[3].name}**: ${top[3].memberCount}\n\n5. **${top[4].name}**: ${top[4].memberCount}\n\n6. **${top[5].name}**: ${top[5].memberCount}\n\n7. **${top[6].name}**: ${top[6].memberCount}\n\n8. **${top[7].name}**: ${top[7].memberCount}\n\n9. **${top[8].name}**: ${top[8].memberCount}\n\n10. **${top[9].name}**: ${top[9].memberCount}`)
  
}

exports.conf = {
enabled: true,
aliases: [],
permLevel: 0
};

exports.help = {
name: "ttop10",
description: "Top10 listesi.",
usage: "ttop10"
};