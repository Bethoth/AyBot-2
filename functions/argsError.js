const Discord = require("discord.js");
function argsError(error, title, command) {
	let embed = new Discord.RichEmbed();
	embed.setAuthor(title);
	embed.setDescription(error);
	embed.addField("Syntaxe de la commande :",`\`${command.help.utilisations}\``);
	embed.setColor("#ee2200");
	embed.setFooter(`AyBot • `);
	embed.setTimestamp();
	return embed;
}
module.exports = argsError;