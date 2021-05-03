const db = require("../schemas/levelCard");

module.exports = {
  conf: {
    aliases: ["opacity", "saydam"],
    name: "saydamlık",
    help: "saydamlık [1/2/3/4/5]"
  },

  /**
   * @param { Client } client
   * @param { Message } message
   * @param { Array<String> } args
   */

  run: async (client, message, args, embed) => {
    if (!args[0]) return message.channel.error(message, "Saydamlığı ayarlamak istediğin dereceyi belirtmelisin! (`1`, `2`, `3`, `4` ya da `5`)");

    if (["sıfırla", "sil", "reset"].includes(args[0])) {
      const data = await db.findOne({ guildID: message.guild.id, userID: message.author.id });
      if (!data || !data.color) return message.channel.error(message, "Level kart saydamlığı ayarlanmamış!");
      data.opacity = undefined;
      await data.save();
      return message.channel.send(embed.setDescription("Level kartının saydamlığı başarıyla sıfırlandı!"));
    }

    if (!["1", "2", "3", "4", "5"].includes(args[0])) return message.channel.error(message, "Saydamlığı ayarlamak istediğin dereceyi belirtmelisin! (`1`, `2`, `3`, `4` ya da `5`)");
    const opacity = args[0].replace("1", "40").replace("2", "30").replace("3", "20").replace("4", "10").replace("5", "0");
    await db.findOneAndUpdate({
      guildID: message.guild.id,
      userID: message.author.id
    }, { $set: { opacity } }, { upsert: true });

    await embed.setTitle("Level kartı saydamlığı değiştirildi!").setDescription(`Level kartının saydamlık derecesi **${args[0]}** olarak ayarlandı!`);
    await message.channel.send(embed);
  }
};