const Discord = require("discord.js");
const moment = require("moment");
module.exports.run = async (client, message, args) => {
	const skariie = client.users.get("509726675416645642");
	let embed = new Discord.RichEmbed();
	embed.setTitle("Informations sur Skariie_");
	embed.setThumbnail(skariie.displayAvatarURL);
	embed.setColor("#4b5afd");
	embed.setDescription(`Hébergeur du bot AyBot 2.\n\nCompte Discord : ${skariie}\n\n`+
							"**Liens utiles :**\n\n"+
							"[Twitter](https://twitter.com/SkariieOff)\n"+
							"[Site web](https://skariie.tk)"
	);
	embed.setFooter(`AyBot 2 • `+moment().format('LT'),client.user.displayAvatarURL);
	message.channel.send(embed);
}
module.exports.config = {
	category: "informations",
	name: __filename.slice(__dirname.length + 1, __filename.length - 3),
	aliases: ["skr","host"],
	serverForced: false
}

module.exports.help = {
	description: "Permet de voir des informations sur Skariie_#0001 l'hébergeur du bot.",
	utilisations: `skariie`,
	exemples: ``
}