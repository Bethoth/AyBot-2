const { version } = require("discord.js");
const Discord = require("discord.js");
const config = require("../informations/config.json");
const fs = require("fs");
const chalk = require("chalk");

module.exports.run = async (client, message, args) => {
	try {
		if(err) return console.log(err);

		let embed = new Discord.RichEmbed();
		embed.setAuthor(client.user.username,client.user.displayAvatarURL)
		embed.addField(`Informations :`,`
		- Créateur : Ayfri#0453
		- Version : ${config.version}
		- Date de création : 23/01/2019
		- Date de mise à jour : ${config.dateVersion}`)

	embed.addField("Statistiques :",`
		- Usage de la mémoire : ${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)} MB
		- Serveurs : ${client.guilds.size.toLocaleString()}
		- Discord.js : v${version}`)
		embed.setColor("#4b5afd")
		message.channel.send(embed);
	} catch(e) {
		console.log(chalk.red("== ERREUR == \n\nFichier : "+__filename.slice(__dirname.length + 1)+"\n"+e+"\n"));
	}
}
module.exports.config = {
	category: "informations",
	name: "botinfo",
	aliases: ["bi","boti","binfo"]
}

module.exports.help = {
	description: "Permet d'avoir des informations sur le bot.",
	utilisations: `botinfo`,
	exemples: ``
}