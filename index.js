const Discord = require("discord.js");
const Enmap = require("enmap");
const fs = require("fs");
const chalk = require("chalk");

const client = new Discord.Client();
const configBOT = require("./informations/config");

client.login(configBOT.token);

let numberFiles = 0;
let events;
let commands;

fs.readdir("./informations/", (err, files) => {
	console.log(chalk.red.bold("\n\nLancement du bot.\n\n"));
	if(err) return console.error(err);
	files.forEach(file => {
		console.log(chalk.white(`Fichier externe : `)+chalk.redBright(`${file}`));
	});
	numberFiles+=files.length;
});
fs.readdir("./images/", (err,files) => {
	if(err) return console.error(err);
	files.forEach(file => {
		console.log(chalk.white(`Fichier externe : `)+chalk.redBright(`${file}`));
	});
	numberFiles+=files.length;
});
fs.readdir("./fonctions/", (err,files) => {
	if(err) return console.error(err);
	console.log("");
	files.forEach(file => {
		console.log(chalk.white(`Fonction externe : `)+chalk.redBright(`${file}`));
	});
	numberFiles+=files.length;
});

fs.readdir("./events/", (err, files) => {
	if(err) return console.error(err);
	console.log(`\nÉvènements : (`+chalk.magenta.bold(`${files.length}`)+")");
	events = files.length;
	files.forEach(file => {
		if(!file.endsWith(".js")) return;
		const event = require(`./events/${file}`);
		let eventName = file.split(".")[0];
		client.on(eventName, event.bind(null, client));
		delete require.cache[require.resolve(`./events/${file}`)];
		console.log(chalk.white(`Chargement de l'évènement : `)+chalk.redBright(`${eventName}`));
	});
	numberFiles+=files.length;
});

client.commands = new Enmap();
client.aliases = new Enmap();

fs.readdir("./commands/", (err, files) => {

	if(err) return console.error(err);
	console.log(`\nCommandes : (`+chalk.magenta.bold(`${files.length}`)+")");
	commands = files.length;
	if(files.length <= 0) return console.log(chalk.red("== ERREUR ==\n\n Fichier : index.js \nAucun fichiers de commandes n'a été trouvé."));
	files.forEach(file => {
		
		if(!file.endsWith("js")) return;
		let props = require(`./commands/${file}`);
		let commandName = props.config.name;
		client.commands.set(commandName, props);
		props.config.aliases.forEach(alias => {
			client.aliases.set(alias, props.config.name);
		});
	
		let aliases = props.config.aliases.map(e=>e.toString()).join(", ");
		console.log(chalk.white(`Chargement de la commande : `)+chalk.redBright(`${commandName}`));
		console.log(chalk.white(`Raccourcis : `)+chalk.cyan(`${aliases}\n`));
	});

	numberFiles+=files.length;
	console.log(chalk.white(`Chargement total de `)+chalk.magenta.bold(`${numberFiles}`)+chalk.white(` fichiers dont ${chalk.magenta.bold(commands)} commandes et ${chalk.magenta.bold(events)} évènements.`));
});

