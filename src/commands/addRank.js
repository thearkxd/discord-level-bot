const db = require("../schemas/ranks");

module.exports = {
  conf: {
    aliases: ["rankekle"],
    name: "addrank",
    help: "addrank [level] [rol(ler)]"
  },

  /**
   * @param { Client } client
   * @param { Message } message
   * @param { Array<String> } args
   */

  run: async (client, message, args, embed) => {
    if (!args[0]) return message.channel.error(message, "Rol(lerin) kaçıncı levelde verileceğini belirtmelisin!");
    const roles = message.mentions.roles.array();
    if (!roles.length) return message.channel.error(message, `**${args[0]}.** levelde verilecek rol(leri) belirtmelisin!`);
    const data = await db.findOne({ guildID: message.guild.id, level: args[0] });
    if (data) return message.channel.error(message, `**${args[0]}.** levelde verilecek roller zaten ayarlanmış! \n\n${data.roles.map((x) => `<@&${x}>`).join(", ")}`);
    await new db({ guildID: message.guild.id, level: args[0], roles }).save();
    message.channel.send(embed.setDescription(`**${args[0]}.** levelde verilecek roller ${roles.map((x) => x.toString()).join(", ")} olarak ayarlandı!`));
  }
};