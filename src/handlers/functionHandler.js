const { TextChannel, MessageEmbed } = require("discord.js");

module.exports = async (client) => {
  TextChannel.prototype.error = async function (message, text) {
    const theark = await client.users.fetch("350976460313329665");
    const embed = new MessageEmbed()
      .setColor("RED")
      .setAuthor(message.member.displayName, message.author.avatarURL({ dynamic: true, size: 2048 }))
      .setFooter("Developed by Theark", theark.avatarURL({ dynamic: true }));
    this.send(embed.setDescription(text)).then((x) => { if (x.deletable) x.delete({ timeout: 10000 }); });
  };

  Array.prototype.random = function () {
    return this[Math.floor((Math.random() * this.length))];
  };
};
