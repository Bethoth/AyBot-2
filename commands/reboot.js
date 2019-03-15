const chalk = require("chalk");
const { exec } = require('child_process');
const config = require("../informations/config.json");
const fs = require("fs");
module.exports.run = async (client, message, args) => {
	if(!message.guild) config.cacheChannel = message.author.id; else config.cacheChannel = message.channel.id;
	config.cacheAction = "reboot";

	if(args[0] == "maintenance") {
		client.channels.get("547182921300181013").setName("STATUT ALPHA : MAINTENANCE");
		config.statut = "maintenance";
		fs.writeFile("./informations/config.json", JSON.stringify(config,null, '\t'), (err) => { if (err) console.log(err); });
		await message.channel.send("Mise en maintenance du bot en cours.");
		console.log(chalk.greenBright(`${__filename.slice(__dirname.length + 1)}`)+chalk.reset(` : Mise en maintenance du bot en cours. ${chalk.grey("(relancement pour les applications)")}`));
		

		return process.exit(1);
	}
	if(args[0] == "stop") {
		client.channels.get("547182921300181013").setName("STATUT ALPHA : ÉTEINT");
		config.statut = "stopped";
		fs.writeFile("./informations/config.json", JSON.stringify(config,null, '\t'), (err) => { if (err) console.log(err); })
		await message.channel.send("Arrêt du bot en cours.");
		console.log(chalk.greenBright(`${__filename.slice(__dirname.length + 1)}`)+chalk.reset(` : Arrêt du bot en cours.`));
		client.user.setPresence({
			status: 'offline'
		});

		try { exec('pm2 stop 0');} catch(e) {}
		return process.kill(process.pid); 
	}
	client.channels.get("547182921300181013").setName("STATUT ALPHA : RELANCEMENT");
	config.statut = "stopped";
	fs.writeFile("./informations/config.json", JSON.stringify(config,null, '\t'), (err) => { if (err) console.log(err); })
	await message.channel.send("Relancement du bot en cours.");
	console.log(chalk.greenBright(`${__filename.slice(__dirname.length + 1)}`)+chalk.reset(` : Relancement du bot en cours.`));

	process.exit(1);
}
module.exports.config = {
	category: "owner",
	name: __filename.slice(__dirname.length + 1, __filename.length - 3),
	aliases: ["rebt", "rb"],
	serverForced: false
}

module.exports.help = {
	description: "Permet de relancer le bot ou de l'arrêter complètement ou de passer en maintenance.",
	utilisations: `reboot\nreboot stop\nreboot maintenance`,
	exemples: ``
}