const Discord = require("discord.js");
const jimp = require("jimp");
const moment = require("moment");
module.exports.run = async (client, message, args) => {
	let image = message.attachments.size > 0 ? message.attachments.first().url : message.author.displayAvatarURL;
	jimp.read(image).then(image =>{
		image.sepia();
		image.write("./../images/sepia.png");
	}).then(image =>{
		let embed = new Discord.RichEmbed();
		embed.setAuthor("Couleurs sépia d'image.");
		embed.attachFile("./../images/sepia.png");
		embed.setColor("#4b5afd");
		embed.setFooter(`AyBot 2 • `+moment().format('LT'),client.user.displayAvatarURL);
		message.channel.send(embed);
	});

}
module.exports.config = {
	category: "fun",
	name: __filename.slice(__dirname.length + 1, __filename.length - 3),
	aliases: ['sepia'],
	serverForced: false
}

module.exports.help = {
	description: "Permet d'avoir un sépia de votre avatar ou l'image que vous avez attaché au message.",
	utilisations: `sépia`,
	exemples: ``
}