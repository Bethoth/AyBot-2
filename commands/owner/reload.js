const argsError = require("../../functions/argsError");
const chalk = require("chalk");
module.exports.run = async (client, message, args) => {
	if(!args || args.length < 1) return await argsError("Vous devez mettre une commande à recharger.");
	let commandNameFind = args[0], props;
	
	const dirs = ["./wip","./owner","./administration","./moderation","./information","./utility","./fun"];

	if(commandNameFind == "all" || commandNameFind == "a") {
		let nbrcmds = client.commands.size;
		let count;
		let arrayCommands = client.commands.array();
		console.log(chalk.green(`${__filename.slice(__dirname.length + 1)}`)+chalk.reset(` : Rechargement de toutes les commandes en cours.\n`));
		arrayCommands.forEach(commande => {
			count+=1;

			let command = commande.config.name;
			dirs.forEach(directory => {
				try {
					delete require.cache[require.resolve(`.${directory}/${command}.js`)];
					client.commands.delete(command);
					props = require(`.${directory}/${command}.js`);
				} catch(e) {}
			});
			
			console.log(`Rechargement de la commande : ${chalk.redBright(command)}`);
			process.stdout.write(chalk.green(chalk.reset(`Raccourcis : `)));
			props.config.aliases.forEach(raccourci => {
				client.aliases.set(raccourci, props.config.name);
				process.stdout.write(chalk.cyan(raccourci)+" ");
			});
			client.commands.set(command, props);
			console.log("\n");
			if(count >= nbrcmds) return;
		});
		if(message.guild.me.hasPermission('MANAGE_MESSAGES', true)) message.delete();
		message.channel.send("Toutes les commandes ont été rechargées.");
		console.log(chalk.greenBright(`${__filename.slice(__dirname.length + 1)}`)+chalk.reset(` : Toutes les commandes ont bien été rechargées.`));
		return false;
	}
	try {
		let commandName;
		if(client.commands.has(commandNameFind)) {
			commandName = commandNameFind;
		}
		else if(!client.commands.has(commandNameFind) || client.commands.get(client.commands.has(commandNameFind))) {
			commandName = client.commands.get(client.aliases.get(commandNameFind)).config.name;
		}
		if(client.commands.has(commandName) || client.commands.get(client.aliases.has(commandName))) {
			dirs.forEach(directory => {
				try {
					delete require.cache[require.resolve(`.${directory}/${commandName}.js`)];
					client.commands.delete(commandName);
					props = require(`.${directory}/${commandName}.js`);		
				} catch(e) {}
			});

			props.config.aliases.forEach(raccourcis => {
				client.aliases.set(raccourcis, props.config.name);
			});

			client.commands.set(commandName, props);
			if(message.guild.me.hasPermission('MANAGE_MESSAGES', true)) message.delete();
			message.channel.send(`La commande \`${commandName}\` a été rechargée.`);
			return console.log(chalk.greenBright(`${__filename.slice(__dirname.length + 1)}`)+chalk.reset(` : Rechargement de la commande ${chalk.cyan(commandName)}.`));
		} else console.log("oui");
	} catch(e) {
		if(e.message == `Cannot read property 'config' of undefined`) {
			return message.channel.send(argsError("Cette commande n'a pas été trouvée.", "Erreur sur l'argument.",client.commands.get(__filename.slice(__dirname.length + 1, __filename.length - 3))));
		}
		console.log(e);
	}
		//return await argsError("Cette commande a une erreur importante dans son code et a été déchargée à cause de ça. \n**Relancement du bot requis.**"); }
}
module.exports.config = {
	category: "owner",
	name: __filename.slice(__dirname.length + 1, __filename.length - 3),
	aliases: ["rload","rld","rl","rel"],
	serverForced: false
}

module.exports.help = {
	description: "Permet de recharger le fichier d'une [commande] ou de toutes.",
	utilisations: `reload [commande]`,
	exemples: ``
}