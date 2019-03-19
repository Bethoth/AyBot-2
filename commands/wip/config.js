const Discord = require("discord.js");
const fs = require("fs");
const servconfig = require("../../informations/servconfig.json");
const moment = require("moment");
module.exports.run = async (client, message, args) => {
	function saveServConfig() {
		fs.writeFile("./informations/servconfig.json", JSON.stringify(servconfig, null, '\t'), (err) => {if(err) console.log(err)});
	}
	let guildID = message.guild.id;
	
	let subcommand = args[0];
	let action = args[1];
	let value = args.slice(2);

	let embedhelp = new Discord.RichEmbed();
	embedhelp.setAuthor("information sur la sous-commande.",client.user.displayAvatarURL);
	embedhelp.setColor("#4b5afd");
	embedhelp.setFooter(`AyBot • `+moment().format('LT'),client.user.displayAvatarURL);

	switch(subcommand) {
		default: 
			return message.channel.send("Voici la liste des sous-commandes possibles :**\n"+
			//"\n\nauto-modération"+
			"\nauto-roles"+
			//"\narrivée"+
			//"\ndépart"+
			//"\nlogs"+
			//"\nmute"+
			//"\nplugins"+
			"\npréfix"+
			"\nsalonStaff"+
			//"\nsanctions"+
			"\nreset"+
			"\nvoir**");

		case "reset":
			servconfig[guildID] = {
				'id':guildID,
				'prefix':'b?',
				'logschannel':'Aucun',
				'staffchannel':'Aucun',
				'logs':[],
				'joinchannl':'Aucun',
				'quitchannel':'Aucun',
				'sanctionchannel': 'Aucun',
				'joinmessage':'Aucun',
				'quitmessage':'Aucun',
				'rolemute':'Aucun',
				'moneysign':'$',
				'yesemote':'Aucun',
				'noemote':'Aucun',
				'plugins':'Aucun',
				'autoroles':['Aucun']
			}
			saveServConfig();
			message.channel.send("La configuration a été réinitialisée.");

		case "voir":
			let embed = new Discord.RichEmbed();
			embed.setAuthor("Configuration du serveur.",client.user.displayAvatarURL);
			embed.setColor("#4b5afd");
			embed.addField("Nom :",message.guild.name,true);
			embed.addField("ID : ",message.guild.id,true);
			embed.addField("Préfix :",servconfig[guildID].prefix);
			embed.addField("Salon de staff : ",servconfig[guildID].staffchannel,true);
			embed.addField("Salon de logs :",servconfig[guildID].logschannel,true);
			embed.setFooter(`AyBot 2 • `+moment().format('LT'),client.user.displayAvatarURL);
			return message.channel.send(embed);
		case "autorole":
		case "autoroles":
		case "auto-roles":
			switch(action) {
				default:
					return message.channel.send("Actions possibles :\n\n**help\nreset\nset\nvoir**");
				case "help":
					embedhelp.addField("Utilisations", "`help` : Renvoie de l'aide sur la sous-commande."+
					"\n`reset` : Réinitialise les auto-rôles."+
					"\n`set [nom/mention]` : Ajoute un auto-rôle grâce à son [nom] ou sa [mention]."+
					"\n`voir` : Montre la liste des auto-rôles.");
					return message.channel.send(embedhelp);
				case "reset":
					servconfig[guildID].autoroles = ["Aucun"];	
					saveServConfig();
					return message.channel.send("Il n'y a bien "+servconfig[guildID].autoroles[0]+" auto-rôles.");
				case "set":
					let role = "Aucun";
					let roleText = value.join(" ");
					role = message.guild.roles.array().some((role) => {return role.name === roleText}) ? message.guild.roles.array().filter((role) => {return role.name === roleText})[0] : "Aucun";
					if(message.mentions.roles) role = message.mentions.roles.first();
					if(role === "Aucun" || undefined) return message.channel.send("Le rôle n'a pas été trouvé.");
					servconfig[guildID].autoroles.shift();
					servconfig[guildID].autoroles.push(role.id);
					saveServConfig();
					return message.channel.send("Le rôle `"+role.name+"` sera bien donné quand un membre rejoignera le serveur.");
				case "voir":
					let roles = "";
					if(servconfig[guildID].autoroles[0] !== "Aucun") {
						servconfig[guildID].autoroles.forEach(role => {
							let rlfind = message.guild.roles.get(role);
							roles += "`"+rlfind+"`,";
							console.log(roles);
						});
					} else { roles = "Aucun";}
					return message.channel.send("Voici les rôles donnés automatiquement :\n\n"+roles);

			}
		case "logs":
			switch(action) {
				default:
					return message.channel.send("Actions possibles :\n\n**aucun\nhelp\n\nliste\ntous\nsalon")
				case "aucun":
				case "help":
				case "liste":
				case "tous":
				case "salon":
					//let salon = message.
			}
		case "prefix":
		case "préfix":
			switch(action) {
				default :
					return message.channel.send("Actions possibles :\n\n**help\nreset\nset\nvoir**");
				case "help":
					embedhelp.addField("Utilisations", "**`help` : Renvoie de l'aide sur la sous-commande."+
					"\n`reset` : Réinitialise le préfix."+
					"\n`set [préfix]` : Modifie le préfix avec la valeur [préfix]."+
					"\n`voir` : Montre le préfix actuel.");
					return message.channel.send(embedhelp);			
				case "reset":
					servconfig[guildID].prefix = 'b?';
					saveServConfig();
					return message.channel.send("Le préfix a bien été remis sur `b?`.");
				case "set":
					servconfig[guildID].prefix = String(value);
					saveServConfig();
					return message.channel.send("Le préfix a bien été défini sur `"+value+"`.")
				case "voir":
					return message.channel.send("Le préfix actuel est : `"+servconfig[guildID].prefix+"`.");
			}

		case "salonStaff":
			switch(action) {
				default:
					return message.channel.send("Actions possibles :\n\n**help\nreset\nset\nvoir**");
				case "help":
					embedhelp.addField("Utilisations", "`help` : Renvoie de l'aide sur la sous-commande."+
					"\n`reset` : Réinitialise le salon staff."+
					"\n`set [salon]` : Modifie le salon staff avec la valeur [salon]."+
					"\n`voir` : Montre le salon staff actuel actuel.");
					return message.channel.send(embedhelp);
				case "reset":
					servconfig[guildID].staffchannel = "Aucun";
					saveServConfig();
					return message.channel.send("Le salon de staff a bien été réinitialisé.");
				case "set":
					if(message.mentions.channels.size > 0) servconfig[guildID].staffchannel = message.mentions.channels.first().id;
					saveServConfig();
					return message.channel.send("Le salon staff a été défini sur "+message.mentions.channels.first());
				case "voir":
					return message.channel.send(`Le salon de staff est : <#${servconfig[guildID].staffchannel}>`);
			}
		case "sanctions":
			switch(action) {
				default:
					return message.channel.send("Actions possibles :\n\n**help\nset\nreset\nvoir**");
				case "help":
					embedhelp.addField("Utilisations", "`help` : Renvoie de l'aide sur la sous-commande."+
					"\n`reset` : Réinitialise le salon sanctions."+
					"\n`set [salon ou ID de sanction] <raison>` : Modifie le salon sanctions avec la valeur [salon] ou modifie la raison d'une sanction grâce à son ID."+
					"\n`voir <Mention/ID membre ou ID de sanction>` : Montre soit le salon des sanctions actuel (sans arguments) soit les sanctions d'un membre, soit une sanction précise.");
			}
	}
}
module.exports.config = {
	category: "not-ready",
	name: __filename.slice(__dirname.length + 1, __filename.length - 3),
	aliases: ["configuration","cfg"],
	serverForced: true
}

module.exports.help = {
	description: "Permet de modifier la configuration actuelle du bot sur le serveur.",
	utilisations: `config [sous-commande] <action> <valeur>`,
	exemples: ``
}