const config = require("../informations/config");
const servconfig = require("../informations/servconfig.json");
const colorchalk = require("chalk");
const chalk = new colorchalk.constructor({level: 3});

module.exports = async (client, message) => {
	if(message.author.bot) return;
	const prefixes = [config.prefix,servconfig[message.guild.id].prefix,`<@537534757668651009>`];
	let prefix = false;
	for(const thisPrefix of prefixes) {
		if(message.content.startsWith(thisPrefix)) prefix = thisPrefix;
		
	}
	const args = message.content.slice(prefix.length).trim().split(/ +/g);
	const command = args.shift().toLowerCase();

	let cmd = client.commands.get(command) || client.commands.get(client.aliases.get(command));

	if(cmd && prefix != false) {
		if(message.author.id == "386893236498857985" || "509726675416645642") {
			console.log(chalk.greenBright("message.js")+chalk.reset(" : ")+chalk.yellowBright(message.author.tag)+chalk.reset(` a fait la commande ${chalk.cyanBright(cmd.config.name)} sur le serveur ${chalk.magenta(message.guild.name)}.`));
			cmd.run(client, message, args); 
			return;
		}
		if(cmd.config.category == "modératation" && !personne.permissions.has("KICK_MEMBERS", true)) {
			message.channel.send("Vous n'avez pas la permission de faire ça.");
			console.log(chalk.greenBright(cmd.config.name+".js")+chalk.reset(" : ")+chalk.yellowBright(message.author.tag)+chalk.reset(` n'a pas la permission de modérateur pour faire la commande ${chalk.cyanBright(cmd.config.name)}.`));
			return;
		}
		if(cmd.config.category == "administration" && !message.member.permissions.has("ADMINISTRATOR", true)) {
			message.channel.send("Vous n'avez pas la permission de faire ça.");
			console.log(chalk.greenBright(cmd.config.name+".js")+chalk.reset(" : ")+chalk.yellowBright(message.author.tag)+chalk.reset(` n'a pas la permission d'administrateur pour faire la commande ${chalk.cyanBright(cmd.config.name)}.`));
			return;
		}
		if(cmd.config.category == "owner") {
			message.channel.send("Vous n'avez pas la permission de faire ça.");
			console.log(chalk.greenBright(cmd.config.name+".js")+chalk.reset(" : ")+chalk.yellowBright(message.author.tag)+chalk.reset(` a essayé la commande ${chalk.cyanBright(cmd.config.name)}.`));
			return;
		}
		console.log(chalk.greenBright("message.js")+chalk.reset(" : ")+chalk.yellowBright(message.author.tag)+chalk.reset(` a fait la commande ${chalk.cyanBright(cmd.config.name)} sur le serveur ${chalk.magenta(message.guild.name)}.`));
		cmd.run(client, message, args); 
		
	}
};