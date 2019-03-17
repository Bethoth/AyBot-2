const Discord = require("discord.js");
const jimp = require("jimp");
const moment = require("moment");
module.exports.run = async (client, message, args) => {
	let image = message.attachments.size > 0 ? message.attachments.first().url : message.author.displayAvatarURL;
	jimp.read(image).then(image =>{
		image.invert();
		image.write("./../images/negative.png");
	}).then(image => {
		let embed = new Discord.RichEmbed();
		embed.setAuthor("Négatif d'image.");
		embed.attachFile("./../images/negative.png");
		embed.setColor("#4b5afd");
		embed.setFooter(`AyBot 2 • `+moment().format('LT'),client.user.displayAvatarURL);
		message.channel.send(embed);
	});
	
}
module.exports.config = {
	category: "fun",
	name: __filename.slice(__dirname.length + 1, __filename.length - 3),
	aliases: ['negatif'],
	serverForced: false
}

module.exports.help = {
	description: "Permet d'avoir le négatif de votre avatar ou l'image que vous avez attaché au message.",
	utilisations: `négatif`,
	exemples: ``
}