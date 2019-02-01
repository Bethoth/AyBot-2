const chalk = require("chalk");
module.exports.run = async (client, message, args, err) => {
	try {
		if(err) return console.log(err);
		if(!args || args.size < 1) return message.channel.send("Vous devez mettre une commande à recharger.");
		let commandNameFind = args[0];

		if(client.commands.get(client.aliases.has(!commandNameFind))) {
			return message.channel.send("Cette commande n'a pas été trouvée.");
		}

		if(commandNameFind == "all" || commandNameFind == "a") {
			let nbrcmds = client.commands.size;
			let count = 0;
			let arrayCommands = Array.from(client.commands.keys());
			console.log(chalk.green(`\n${__filename.slice(__dirname.length + 1)}`)+chalk.reset(` : Rechargement de toutes les commandes en cours.\n`));
			arrayCommands.forEach(commande => {
				count+=1;
				const props = require(`./${commande}.js`);
				let command = props.config.name;
				delete require.cache[require.resolve(`./${command}.js`)];
				client.commands.delete(command);
				client.commands.set(command, props);
				console.log(`Rechargement de la commande : ${chalk.redBright(command)}`);
				process.stdout.write(chalk.green(chalk.reset(`Raccourcis : `)));
				props.config.aliases.forEach(raccourci => {
					client.aliases.set(raccourci, props.config.name);
					process.stdout.write(chalk.cyan(raccourci)+" ");
				});
				console.log("\n");
				if(count >= nbrcmds) return;
			});
			message.channel.send("Toutes les commandes ont été rechargées.");
			console.log(chalk.greenBright(`${__filename.slice(__dirname.length + 1)}`)+chalk.reset(` : Toutes les commandes ont bien été rechargées.`));
			return false;
		}

		let commandName;
		if(client.commands.has(commandNameFind)) {
			commandName = commandNameFind;
		}
		else if(!client.commands.has(commandNameFind) || client.commands.get(client.commands.has(commandNameFind))) {
			commandName = client.commands.get(client.aliases.get(commandNameFind)).config.name;
		}
		if(client.commands.has(commandName) || client.commands.get(client.aliases.has(commandName))) {
			delete require.cache[require.resolve(`./${commandName}.js`)];
			client.commands.delete(commandName);
			const props = require(`./${commandName}.js`);

			props.config.aliases.forEach(raccourcis => {
				client.aliases.set(raccourcis, props.config.name);
			});

			client.commands.set(commandName, props);
			message.channel.send(`La commande ${commandName} a été rechargée.`);
			console.log(chalk.greenBright(`${__filename.slice(__dirname.length + 1)}`)+chalk.reset(` : Rechargement de la commande ${chalk.cyan(commandName)}.`));
		}
	} catch(e) {
		console.log(chalk.red("== ERREUR == \n\nFichier : "+__filename.slice(__dirname.length + 1)+"\n"+e+"\n"));
		return message.channel.send("Cette commande n'a pas été trouvée.");
	}
}
module.exports.config = {
	category: "owner",
	name: "reload",
	aliases: ["rload","rld","rl"]
}

module.exports.help = {
	description: "Permet de recharger le fichier d'une [commande] ou de toutes.",
	utilisations: `reload [commande]`,
	exemples: ``
}