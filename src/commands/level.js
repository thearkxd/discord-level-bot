const db = require("../schemas/level");
const Canvas = require("canvas");
const { registerFont } = require("canvas");
const path = require("path");
registerFont(path.resolve("./src/fonts/arial.ttf"), { family: "Arial" });
const conf = require("../configs/config.json");
const levelCard = require("../schemas/levelCard");
const { getColor } = require("colorthief");
const tinycolor = require("tinycolor2");

module.exports = {
  conf: {
    aliases: [],
    name: "level",
    help: "level"
  },

  /**
   * @param { Client } client
   * @param { Message } message
   * @param { Array<String> } args
   */

  run: async (client, message, args) => {
    const member = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.member;
    const userData = await db.findOne({ guildID: message.guild.id, userID: member.user.id });
    const level = userData ? userData.level : 0;
    const xp = userData ? userData.totalXP : 0;
    const nextLevelXP = (!level ? 1 : level === 1 ? 2 : level) * conf.nextLevelXP;
    const data = await db.find({ guildID: message.guild.id }).sort({ totalXP: -1 });
    const rank = data.map((x) => x.userID).indexOf(member.user.id) + 1;

    const canvas = Canvas.createCanvas(1020, 306);
    const ctx = canvas.getContext("2d");
    const cardData = await levelCard.findOne({ guildID: message.guild.id, userID: member.user.id });
    let backgroundColor = cardData && cardData.background ? await getColor(cardData.background) : [];
    backgroundColor = { r: backgroundColor[0], g: backgroundColor[1], b: backgroundColor[2] };
    const standardColor = cardData && cardData.background ? tinycolor(backgroundColor).isDark() ? "#fff" : "#000" : "#fff";
    const color = cardData && cardData.color ? `#${cardData.color}` : standardColor;

    // background
    ctx.beginPath();
    if (!cardData || !cardData.background) {
      ctx.rect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = cardData && cardData.opacity ? `rgba(0, 0, 0, 0.${cardData.opacity})` : "#000";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
    } else {
      const img = await Canvas.loadImage(cardData.background);
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
    }

    // avatar
    const avatar = await Canvas.loadImage(member.user.avatarURL({ format: "png" }));
    ctx.save();
    roundedImage(ctx, 62, 62, 185, 185, 35);
    ctx.clip();
    ctx.drawImage(avatar, 62, 62, 185, 185);
    ctx.restore();

    // texts
    const username = member.user.username.length > 8 ? member.user.username.slice(0, 8).concat("...") : member.user.username;
    ctx.font = "40px Arial";
    ctx.fillStyle = standardColor;
    ctx.fillText(username, 306, 140);

    const correctX = ctx.measureText(username).width;
    ctx.font = "35px Arial";
    ctx.fillStyle = color;
    ctx.fillText(`#${member.user.discriminator}`, correctX + 306, 140);

    ctx.font = "800 20px Arial";
    ctx.fillStyle = standardColor;
    ctx.textAlign = "center";
    ctx.fillText("LEVEL", 663, 120);

    ctx.font = "800 30px Arial";
    ctx.fillStyle = color;
    ctx.textAlign = "center";
    ctx.fillText(level ? level : 0, 663, 158);

    ctx.font = "800 20px Arial";
    ctx.fillStyle = standardColor;
    ctx.textAlign = "center";
    ctx.fillText("XP", 799, 120);

    ctx.font = "800 30px Arial";
    ctx.fillStyle = color;
    ctx.textAlign = "center";
    ctx.fillText(xp, 799, 158);

    ctx.font = "800 20px Arial";
    ctx.fillStyle = standardColor;
    ctx.textAlign = "center";
    ctx.fillText("RANK", 930, 120);

    ctx.font = "800 30px Arial";
    ctx.fillStyle = color;
    ctx.textAlign = "center";
    ctx.fillText(rank, 930, 158);

    ctx.font = "19px Arial";
    ctx.fillStyle = "#686971";
    ctx.textAlign = "center";
    ctx.fillText(`${userData ? userData.currentXP : 0}/${nextLevelXP}`, 920, 230);

    // progressbar
    ctx.beginPath();
    ctx.moveTo(297 + 8, 237);
    ctx.lineTo(297 + 661 - 8, 237);
    ctx.quadraticCurveTo(297 + 661, 237, 297 + 661, 237 + 8);
    ctx.lineTo(297 + 661, 237 + 18 - 8);
    ctx.quadraticCurveTo(297 + 661, 237 + 18, 297 + 661 - 8, 237 + 18);
    ctx.lineTo(297 + 8, 237 + 18);
    ctx.quadraticCurveTo(297, 237 + 18, 297, 237 + 18 - 8);
    ctx.lineTo(297, 237 + 8);
    ctx.quadraticCurveTo(297, 237, 297 + 8, 237);
    ctx.closePath();
    ctx.fillStyle = "#171717";
    ctx.fill();
    roundRect(ctx, 300, 240, (85 / nextLevelXP) * xp * 7.7, 10, 8, color);

    await message.channel.send({ files: [{ attachment: canvas.toBuffer(), name: "rank.png" }] });
  }
};

function roundedImage(ctx, x, y, width, height, radius) {
  ctx.beginPath();
  ctx.moveTo(x + radius, y);
  ctx.lineTo(x + width - radius, y);
  ctx.quadraticCurveTo(x + width, y, x + width, y + radius);
  ctx.lineTo(x + width, y + height - radius);
  ctx.quadraticCurveTo(x + width, y + height, x + width - radius, y + height);
  ctx.lineTo(x + radius, y + height);
  ctx.quadraticCurveTo(x, y + height, x, y + height - radius);
  ctx.lineTo(x, y + radius);
  ctx.quadraticCurveTo(x, y, x + radius, y);
  ctx.closePath();
}

function roundRect(ctx, x, y, width, height, radius, fill) {
  if (typeof radius === "undefined") {
    radius = 5;
  }

  ctx.beginPath();
  ctx.moveTo(x + radius, y);
  ctx.lineTo(x + width - radius, y);
  ctx.quadraticCurveTo(x + width, y, x + width, y + radius);
  ctx.lineTo(x + width, y + height - radius);
  ctx.quadraticCurveTo(x + width, y + height, x + width - radius, y + height);
  ctx.lineTo(x + radius, y + height);
  ctx.quadraticCurveTo(x, y + height, x, y + height - radius);
  ctx.lineTo(x, y + radius);
  ctx.quadraticCurveTo(x, y, x + radius, y);
  ctx.closePath();

  if (fill) {
    ctx.fillStyle = fill;
    ctx.fill();
  }
}
