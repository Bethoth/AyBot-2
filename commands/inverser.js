const Discord = require("discord.js");
const jimp = require("jimp");
const moment = require("moment");
module.exports.run = async (client, message, args) => {
	let image = message.attachments.size > 0 ? message.attachments.first().url : message.author.displayAvatarURL;
	jimp.read(image).then(image =>{
		image.flip(false,true);
		image.write('./images/inverse.png');
	}).then(image => {
		let embed = new Discord.RichEmbed();
		embed.setAuthor("Inversion d'image.");
		embed.attachFile("./images/inverse.png");
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
	description: "Permet de retourner verticalement votre avatar ou l'image que vous avez attaché au message.",
	utilisations: `inverser`,
	exemples: ``
}