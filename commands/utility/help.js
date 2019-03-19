const argsError = require("../../functions/argsError");
const Discord = require("discord.js");
const moment = require("moment");
module.exports.run = async (client, message, args) => {
	const dirs = ["wip","owner","administration","moderation","information","utility","fun"];

	if(message.author.id == ('386893236498857985' || '509726675416645642') && message.channel.id == "546713588740521994" || message.author.id == ('386893236498857985' || '509726675416645642') && args[0] == "toutes") categories = ['owner','administration','modération','utiles','informations','fun'];
	else categories = ['administration','modération','utiles','informations','fun'];
	let arrayCmd = 	client.commands.array();
	let command = args[0];
	if(!args || args < 1 || args[0] == "toutes"){
		let embed = new  Discord.RichEmbed();
		embed.setTitle("Liste de toute les commandes.");
		categories.forEach(category => {
			let categ = {'name':category,'values':[]};
			arrayCmd.forEach(commande =>
			{
				dirs.forEach(directory => {
					try {
						if(message.guild === null) {
							if(!commande.config.serverForced) {
								const props = require(`../${directory}/${commande.config.name}.js`);
								if(props.config.category == categ.name) categ.values.splice(categ.size, 0, commande.config.name);	
							}
						} else {
							const props = require(`../${directory}/${commande.config.name}.js`);
							if(props.config.category == categ.name) categ.values.splice(categ.size, 0, commande.config.name);
						}
					} catch(e) {}
				});
			});
			categ.values.sort();
			let categCmds = "`"+categ.values.join("` **|** `")+"`";
			if(categCmds.length != 2) embed.addField(`Commandes ${categ.name} : `,categCmds)
		});
		if(message.guild === null) embed.setDescription("**help <catégorie/commande>** : Permet d'avoir des informations sur la <catégorie/commande>.\n__Certaines commandes ne sont pas affichées car disponibles que sur serveurs.__");
		else embed.setDescription("**help <catégorie/commande>** : Permet d'avoir des informations sur la <catégorie/commande>. ");
		embed.setFooter(`AyBot 2 • `+moment().format('LT'),client.user.displayAvatarURL);
		embed.setColor("#4b5afd");
		return message.channel.send(embed);
	}

	let commandName;
	if(client.commands.has(command)) commandName = command;
	else if(!client.commands.has(command) || client.commands.get(client.aliases.has(command))) {
		try {commandName = client.commands.get(client.aliases.get(command)).config.name;} catch(e) {}
	}
	if(client.commands.has(commandName) || client.commands.get(client.aliases.has(commandName))) {

		commandName = client.commands.get(commandName) || client.commands.get(commands.aliases.get(command));
		let embed = new  Discord.RichEmbed();
		embed.setFooter(`AyBot 2 • `+moment().format('LT'),client.user.displayAvatarURL);
		let permission = String(commandName.config.category);
		if(commandName.config.category === "not-ready" && message.author.id !== ("386893236498857985" || "509726675416645642")) return;		
		if(commandName.config.category == "utiles" || commandName.config.category == "informations" || commandName.config.category == "fun") { 
			permission = "membre";
		}
		let servForced = "Disponible en privé : **";
		if(commandName.config.serverForced) servForced+="non"; else servForced+="oui";

		embed.setAuthor("Aide de la commande : "+commandName.config.name, client.user.displayAvatarURL);
		embed.setDescription("**RAPPEL** : Les [arguments] sont obligatoires, les <arguments> non.\nPermission : **"+permission+"**\n"+servForced+"**");
		embed.addField("Description :", commandName.help.description);
		embed.addField("Syntaxe :", '`'+commandName.help.utilisations+'`');
		if(commandName.help.exemples.length > 0) embed.addField("Exemples :",commandName.help.exemples);
		if(commandName.config.aliases.length > 0) embed.addField("Alias :", commandName.config.aliases.join(", "));
		embed.setColor("#4b5afd");
		return message.channel.send(embed);
	}

	if(categories.includes(command)){
		let cat = command;
		let embed = new Discord.RichEmbed();
		embed.setFooter(`AyBot 2 • `+moment().format('LT'),client.user.displayAvatarURL);
		embed.setTitle("Aide de la catégorie : "+cat);
		let categ = {'name':cat,'values':[]};
		arrayCmd.forEach(commande =>
		{
			if(message.guild === null) {
				if(!commande.config.serverForced) {
					const props = require(`../commands/${commande.config.name}.js`);
					if(props.config.category == categ.name) categ.values.splice(categ.size, 0, commande.config.name+"`** : "+commande.help.description+`\n`);
				}
			} else {
				const props = require(`../commands/${commande.config.name}.js`);
				if(props.config.category == categ.name) categ.values.splice(categ.size, 0, commande.config.name+"`** : "+commande.help.description+`\n`);
			}
		});
		categ.values.sort();
		let categCmds = "**`"+categ.values.join("**`")+"";
		embed.addField("Commandes :",categCmds);
		if(message.guild === null) embed.setDescription("__Certaines commandes ne sont pas affichées car disponibles que sur serveurs.__");
		embed.setColor("#4b5afd");
		return message.channel.send(embed);
	}
	let categoriesForm = ["catégories","categories","categ","cat"];
	if(command.includes(categoriesForm.some(v => command === v))) {
		return message.channel.send(argsError("Cette commande n'existe pas.", "Erreur sur l'argument.",client.commands.get(__filename.slice(__dirname.length + 1, __filename.length - 3))));
	} else {
		let embed = new Discord.RichEmbed();
		let categs;
		categories.forEach(category => {
			categ = [{'name':category}];
			categories.sort();
			categs = "`"+categories.join("`\n\n`")+"`";
		});
		embed.setTitle("Liste des catégories.")
		if(categs.length !== 2) embed.addField("Catégories : ",categs);
		embed.setColor("#4b5afd")
		message.channel.send(embed);
	}
}
module.exports.config = {
	category: "utiles",
	name: __filename.slice(__dirname.length + 1, __filename.length - 3),
	aliases: ["h","aide","commandes","commands"],
	serverForced: false
}

module.exports.help = {
	description: "Permet d'avoir de l'aide sur une <commande> ou une <catégorie>.",
	utilisations: `help <commande ou catégorie>`,
	exemples: `help couleur\nh fun\naide catégories`
}