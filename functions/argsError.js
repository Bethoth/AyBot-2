const Discord = require("discord.js");
const index = require("../index");
function argsError(error, title, command) {
	let embed = new Discord.RichEmbed();
	embed.setAuthor(title);
	embed.setDescription(error);
	embed.addField("Syntaxe de la commande :",`\`${command.help.utilisations}\``);
	if(command.help.exemples.lenght > 0) embed.addField("Exemples :",command.help.exemples);
	embed.setColor("#ee2200");
	embed.setFooter(index.client.user.username);
	embed.setTimestamp();
	return embed;
}
module.exports = argsError;

/*

This function get an error, title and the command to convert it into a little help when errors on arguments.

*/