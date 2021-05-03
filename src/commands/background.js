const db = require("../schemas/levelCard");

module.exports = {
  conf: {
    aliases: ["background"],
    name: "arkaplan",
    help: "arkaplan [link/resim]"
  },

  /**
   * @param { Client } client
   * @param { Message } message
   * @param { Array<String> } args
   */

  run: async (client, message, args, embed) => {
    if (!args[0] && !message.attachments.first()) return message.channel.error(message, "Bir resim linki ya da resim belirtmelisin!");

    if (["sıfırla", "sil", "reset"].includes(args[0])) {
      const data = await db.findOne({ guildID: message.guild.id, userID: message.author.id });
      if (!data || !data.background) return message.channel.error(message, "Level kart arkaplanı ayarlanmamış!");
      data.background = undefined;
      await data.save();
      return message.channel.send(embed.setDescription("Level kartının arkaplanı başarıyla sıfırlandı!"));
    }

    const regex = /(https?:\/\/.*\.(?:png|jpg|jpeg))/i;
    if (!regex.test(args[0])) return message.channel.error(message, "Geçerli bir resim linki belirtmelisin!");
    const background = message.attachments.first() ? message.attachments.first().url : args[0];
    await db.findOneAndUpdate({
      guildID: message.guild.id,
      userID: message.author.id
    }, { $set: { background } }, { upsert: true });

    await embed.setTitle("Level kartı arkaplanı değiştirildi!").setDescription("Level kartının arkaplanı ayarlandı!").setImage(background);
    await message.channel.send(embed);
  }
};