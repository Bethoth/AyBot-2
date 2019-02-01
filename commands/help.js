const Discord = require("discord.js");
const chalk = require("chalk");
module.exports.run = async (client, message, args) => {
	try {
		let categories = ['owner','administration','modération','utiles','informations','fun'];
		let arrayCmd = Array.from(client.commands.keys());
		let command = args[0];
		if(!args || args < 1){
			let embed = new  Discord.RichEmbed();
			embed.setTitle("Liste de toute les commandes.");
			categories.forEach(category => {
				let categ = {'name':category,'values':[]};
				arrayCmd.forEach(commande =>
				{
					const props = require(`./${commande}.js`);
					if(props.config.category == categ.name) categ.values.splice(categ.size, 0, commande);
				});
				categ.values.sort();
				let categCmds = "`"+categ.values.join("`, `")+"`";
				if(categCmds.length != 2) embed.addField(`Commandes ${categ.name} : `,categCmds)
			});
			embed.setDescription("**help <catégorie>** : Pour juste afficher la liste des commandes d'une catégorie. ")
			embed.setColor("#4b5afd")
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
			let permission = String(commandName.config.category);
			
			if(commandName.config.category === ("utiles" || "informations" || "fun")) { 
				permission = "membre";
			}
			embed.setAuthor("Aide de la commande : "+commandName.config.name, client.user.displayAvatarURL)
			embed.addField("Description :", commandName.help.description)
			embed.setDescription("**RAPPEL** : Les [arguments] sont obligatoires, les <arguments> non.\nPermission : "+permission)
			embed.addField("Utilisation :", commandName.help.utilisations)
			if(commandName.help.exemples.length > 0) embed.addField("Exemples :",commandName.help.exemples)
			if(commandName.config.aliases.length > 0) embed.addField("Alias :", commandName.config.aliases.join(", "))
			embed.setColor("#4b5afd")
			return message.channel.send(embed);
		}

		if(categories.includes(command)){
			let cat = command;
			let embed = new Discord.RichEmbed();
			embed.setTitle("Aide de la catétorie : "+cat)
			let categ = {'name':cat,'values':[]};
			arrayCmd.forEach(commande =>
			{
				const props = require(`./${commande}.js`);
				if(props.config.category == categ.name) {
					categ.values.splice(categ.size, 0, commande);
				}
			});

			categ.values.sort();
			let categCmds = "`"+categ.values.join("`, `")+"`";
			embed.addField("Commandes :",categCmds)
			embed.setColor("#4b5afd")
			return message.channel.send(embed);

		} else if(command == ("catégories") || ("categories") || ("categ") || ("cat")) {
			let embed = new Discord.RichEmbed();
			let categs;
			categories.forEach(category => {
				let categ = [{'name':category}]
				categories.sort();
				categs = "`"+categories.join("`\n`")+"`";
			});
			embed.setTitle("Liste des catégories.")
			if(categs.length !== 2) embed.addField("Catégories : ",categs)
			embed.setColor("#4b5afd")
			return message.channel.send(embed);
		} else {
			return message.channel.send("Commande inconnue."); 
		}

	} catch(e) {
		console.log(chalk.red("== ERREUR == \n\nFichier : "+__filename.slice(__dirname.length + 1)+"\n"+e+"\n"));
	}
}
module.exports.config = {
	category: "utiles",
	name: "help",
	aliases: ["hlp","aide"]
}

module.exports.help = {
	description: "Permet d'avoir de l'aide sur une <commande> ou une <catégorie>.",
	utilisations: `help <commande ou catégorie>`,
	exemples: `help couleur\nhlp owner\naide catégories`
}