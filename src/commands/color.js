const db = require("../schemas/levelCard");
const Canvas = require("canvas");

module.exports = {
  conf: {
    aliases: ["color"],
    name: "renk",
    help: "renk [renk kodu]"
  },

  /**
   * @param { Client } client
   * @param { Message } message
   * @param { Array<String> } args
   */

  run: async (client, message, args, embed) => {
    if (!args[0]) return message.channel.error(message, "Bir renk kodu ya da parametre belirtmelisin!");

    if (["sıfırla", "sil", "reset"].includes(args[0])) {
      const data = await db.findOne({ guildID: message.guild.id, userID: message.author.id });
      if (!data || !data.color) return message.channel.error(message, "Level kart rengi ayarlanmamış!");
      data.color = undefined;
      await data.save();
      return message.channel.send(embed.setDescription("Level kartının rengi başarıyla sıfırlandı!"));
    }

    if (args[0].length < 6) return message.channel.error(message, "6 haneli bir renk kodu belirtmelisin!");
    await db.findOneAndUpdate({
      guildID: message.guild.id,
      userID: message.author.id
    }, { $set: { color: args[0] } }, { upsert: true });

    const canvas = Canvas.createCanvas(150, 150);
    const ctx = canvas.getContext("2d");
    ctx.fillStyle = `#${args[0]}`;
    ctx.fill();
    ctx.fillRect(0, 0, 150, 150);

    await embed.setTitle("Level kartı rengi değiştirildi!").setDescription(`Level kartının rengi **#${args[0]}** olarak ayarlandı!`).setImage("attachment://color.png").setColor(`#${args[0]}`);
    await message.channel.send({ embed, files: [{ attachment: canvas.toBuffer(), name: "color.png" }] });
  }
};