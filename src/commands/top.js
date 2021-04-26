const db = require("../schemas/level");

module.exports = {
  conf: {
    aliases: ["leveltop"],
    name: "top",
    help: "top"
  },

  /**
   * @param { Client } client
   * @param { Message } message
   * @param { Array<String> } args
   */

  run: async (client, message, args, embed) => {
    let guildData = await db.find({ guildID: message.guild.id }).sort({ totalXP: -1 });
    if (!guildData.length) return message.channel.error(message, "Bu sunucuda level verisi bulunamadı!");
    const rank = guildData.map((x) => x.userID).indexOf(message.author.id) + 1;

    const list = guildData
      .filter((x) => message.guild.members.cache.has(x.userID))
      .splice(0, 10)
      .map((x, index) => `${x.userID === message.author.id ? `**${index + 1}. <@${x.userID}> - ${x.level} Level - ${x.totalXP} XP**` : `**${index + 1}.** <@${x.userID}> - ${x.level} Level - ${x.totalXP} XP`}`)
      .join("\n");

    const data = await db.findOne({ guildID: message.guild.id, userID: message.author.id });
    if (rank < 10) {
      embed.setDescription(list);
      message.channel.send(embed);
    } else {
      embed.setDescription(`${list} \n... \n**${index}. ${message.author} ${data.level} Level - ${data.totalXP} XP**`);
      message.channel.send(embed);
    }
  }
};
