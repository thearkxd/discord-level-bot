const db = require("../schemas/ranks");

module.exports = {
  conf: {
    aliases: ["ranksil"],
    name: "deleterank",
    help: "deleterank [level]"
  },

  /**
   * @param { Client } client
   * @param { Message } message
   * @param { Array<String> } args
   */

  run: async (client, message, args, embed) => {
    if (!args[0]) return message.channel.error(message, "Kaçıncı leveldeki rollerin sıfırlanacağını belirtmelisin!");
    const data = await db.findOne({ guildID: message.guild.id, level: args[0] });
    if (!data) return message.channel.error(message, `**${args[0]}.** levelde verilecek rol(ler) bulunmuyor!`);
    await db.deleteOne({ guildID: message.guild.id, level: args[0] });
    message.channel.send(embed.setDescription(`**${args[0]}.** levelde verilecek roller sıfırlandı!`));
  }
};