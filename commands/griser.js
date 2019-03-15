const Discord = require("discord.js");
const jimp = require("jimp");
const moment = require("moment");
module.exports.run = async (client, message, args) => {
	let image = message.attachments.size > 0 ? message.attachments.first().url : message.author.displayAvatarURL;
	jimp.read(image).then(image =>{
		image.greyscale();
		image.write("./images/greyImage.png");
	}).then(image =>{
		let embed = new Discord.RichEmbed();
		embed.setAuthor("Grisassion d'image.");
		embed.attachFile("./images/greyImage.png");
		embed.setColor("#4b5afd");
		embed.setFooter(`AyBot 2 • `+moment().format('LT'),client.user.displayAvatarURL);
		message.channel.send(embed);
	});

}
module.exports.config = {
	category: "fun",
	name: __filename.slice(__dirname.length + 1, __filename.length - 3),
	aliases: [],
	serverForced: false
}

module.exports.help = {
	description: "Permet de rendre en noir et blanc votre avatar ou l'image que vous avez attaché au message.",
	utilisations: `griser`,
	exemples: ``
}