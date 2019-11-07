const chalk = require('chalk');
const moment = require('moment');
const Discord = require('discord.js');
const ayarlar = require('../ayarlar.json');

var prefix = ayarlar.prefix;

module.exports = client => {
console.log(`[${moment().format('YYYY-MM-DD HH:mm:ss')}] BOT: Aktif, Komutlar yüklendi!`);
  console.log(`[${moment().format('YYYY-MM-DD HH:mm:ss')}] BOT: ${client.user.username} ismi ile giriş yapıldı!`);
  client.user.setStatus("online");
   var oyun = [
        "Bot Devolper; by SH3GLTR",
     "King is Dark Worlds",
      "İnstagram : @efe.gktg06",
     "৳ D a r k   W o r l d s",
    ];

    setInterval(function() {

        var random = Math.floor(Math.random()*(oyun.length-0+1)+1);
      
      let channel = client.channels.get('633703042461728779');
channel.join()

        client.user.setGame(oyun[random], "https://www.twitch.tv/elanur");
        }, 2 * 700);
}