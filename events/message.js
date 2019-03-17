const config = require("../informations/config");
const userdata = require("../informations/userdata.json");
const servconfig = require("../informations/servconfig.json");
const blacklist = require("../informations/blacklist.json");
const colorchalk = require("chalk");
const Discord = require("discord.js");
const chalk = new colorchalk.constructor({level: 3});
const fs = require("fs");
const moment = require("moment");
const talkedRecently = new Set();

module.exports = async (client, message, Datas) => {

	if(message.author.bot) return;
	let guildPrefix;
	if(!message.guild || !servconfig[message.guild.id]) guildPrefix = "b?"; else if(servconfig[message.guild.id]) guildPrefix = servconfig[message.guild.id].prefix;
	const prefixes = [config.prefix,guildPrefix,`<@537534757668651009>`];
	let prefix = false;
	for(const thisPrefix of prefixes) {
		if(message.content.startsWith(thisPrefix)) prefix = thisPrefix;
	}

	if(message.guild != null && !userdata.hasOwnProperty(message.guild.id)) {
		userdata[message.guild.id] = {};
		userdata[message.guild.id][message.author.id] = {};
	}
	fs.writeFile("./informations/userdata.json", JSON.stringify(userdata, null, '\t'), (err) => {if(err) console.log(err)});

	if(message.guild != null && !userdata[message.guild.id].hasOwnProperty(message.author.id) && !message.author.bot) userdata[message.guild.id][message.author.id] = {};
	fs.writeFile("./informations/userdata.json", JSON.stringify(userdata, null, '\t'), (err) => {if(err) console.log(err)});

	const args = message.content.slice(prefix.length).trim().split(/ +/g);
	const command = args.shift().toLowerCase();

	let cmd = client.commands.get(command) || client.commands.get(client.aliases.get(command));
	
	if(cmd && prefix != false) {
		if(message.guild && blacklist.guilds.includes(`${message.guild.id}`) && message.guild.id != "515322595063627776") {message.delete(); return message.channel.send("Ce serveur est sur la liste noir, tout ses membres n'ont donc pas accès aux commandes."); }
		if(blacklist.members.includes(`${message.author.id}`) && !config.owners.includes(message.author.id)) {message.delete(); return message.channel.send("Vous êtes sur la liste noir et n'avez pas accès aux commandes."); }
		
		if(!config.owners.includes(message.author.id)) {
			if(config.statut == "maintenance") {
				message.channel.send("Le bot est en maintenance, toutes les commandes sont donc désactivées, pour plus d'informations contactez le créateur.\nCréateur : Ayfri#0453")
				return console.log(chalk.greenBright(cmd.config.name+".js")+chalk.reset(" : ")+chalk.yellowBright(message.author.tag)+chalk.reset(` a essayé la commande ${chalk.cyanBright(cmd.config.name)} sur le serveur ${chalk.magenta(message.guild.name)} pendant une maintenance du bot.`));
			}
			if(cmd.config.category == "owner") {
				message.channel.send("Vous n'êtes ni Ayfri ni Skariie_.");
				return console.log(chalk.greenBright(cmd.config.name+".js")+chalk.reset(" : ")+chalk.yellowBright(message.author.tag)+chalk.reset(` a essayé la commande ${chalk.cyanBright(cmd.config.name)} sur le serveur ${chalk.magenta(message.guild.name)}.`));
			}
			if(cmd.config.category == "stopped") {
				return console.log(chalk.greenBright(cmd.config.name+".js")+chalk.reset(" : ")+chalk.yellowBright(message.author.tag)+chalk.reset(` a essayé la commande en maintenance ${chalk.cyanBright(cmd.config.name)} sur le serveur ${chalk.magenta(message.guild.name)}.`));
			}
			if(cmd.config.category == "maintenance") {
				message.channel.send("La commande est en cours de modifications internes ce qui la rend non stable, elle est donc désactivée temporairement. Contactez le créateur pour plus d'informations.\nCréateur : Ayfri#0453");
				return console.log(chalk.greenBright(cmd.config.name+".js")+chalk.reset(" : ")+chalk.yellowBright(message.author.tag)+chalk.reset(` a essayé la commande en maintenance ${chalk.cyanBright(cmd.config.name)} sur le serveur ${chalk.magenta(message.guild.name)}.`));
			}
			if(cmd.config.category == "not-ready") {
				message.channel.send("La commande n'est pas prête au public. Contactez le créateur pour plus d'informations.\nCréateur : Ayfri#0453")
				return console.log(chalk.greenBright(cmd.config.name+".js")+chalk.reset(" : ")+chalk.yellowBright(message.author.tag)+chalk.reset(` a essayé la commande en développement ${chalk.cyanBright(cmd.config.name)} sur le serveur ${chalk.magenta(message.guild.name)}.`));
			}
		}
		else {
			if(message.guild) {
				console.log(`${chalk.greenBright(__filename.slice(__dirname.length + 1))} : ${chalk.yellowBright(message.author.tag)} a fait la commande ${chalk.cyanBright(cmd.config.name)} sur le serveur ${chalk.magenta(message.guild.name)}.`); 
			} else {
				if(cmd.config.serverForced) {
					message.channel.send("La commande est uniquement disponible sur un serveur.");
					return console.log(`${chalk.greenBright(__filename.slice(__dirname.length + 1))} : ${chalk.yellowBright(message.author.tag)} a essayé la commande ${chalk.cyanBright(cmd.config.name)} uniquement disponible sur serveur mais en privé.`);
				}
				console.log(`${chalk.greenBright(__filename.slice(__dirname.length + 1))} : ${chalk.yellowBright(message.author.tag)} a fait la commande ${chalk.cyanBright(cmd.config.name)} en privé au bot.`);
			}
			return(cmd.run(client, message, args, async function(error){
				let embed = new Discord.RichEmbed();
				embed.setAuthor("Erreur sur les arguments : ");
				embed.setDescription(error);
				embed.addField("Syntaxe de la commande :",`\`${cmd.help.utilisations}\``);
				embed.setColor("#ee2200");
				embed.setFooter(`AyBot • `+moment().format('LT'),client.user.displayAvatarURL);
				message.channel.send(embed);
				//argsError function ^

			}).catch(warning=>{
				let embed = new Discord.RichEmbed();
				embed.setDescription("Une erreur a eu lieu avec la commande : **"+cmd.config.name+"**.");
				embed.addField('Erreur :', warning);
				embed.setFooter(`${client.user.username} • `+moment().format('LT'),client.user.displayAvatarURL);
				embed.setColor("#dd0000");
				message.channel.send(embed);
				console.log(chalk.red(`Une petite erreur a été faite quelque part avec la commande ${chalk.cyanBright(cmd.config.name)}. \nHeure : `+moment().format('LLLL')+
				"\nErreur : "+warning.stack));
			}));
		}
		
		if(message.guild) {
			if(cmd.config.category == "administration" && !message.member.permissions.has("ADMINISTRATOR", true)) {
				message.channel.send("Vous n'êtes pas adminsitrateur sur le serveur donc vous n'avez pas le droit d'utiliser cette commande.");
				return console.log(chalk.greenBright(cmd.config.name+".js")+chalk.reset(" : ")+chalk.yellowBright(message.author.tag)+chalk.reset(` n'a pas la permission d'administrateur pour faire la commande ${chalk.cyanBright(cmd.config.name)} sur le serveur ${chalk.magenta(message.guild.name)}.`));
			}
			if(cmd.config.category == "modération" && !message.member.permissions.has("KICK_MEMBERS", true)) {
				message.channel.send("Vous n'êtes pas modérateur sur le serveur donc vous n'avez pas le droit d'utiliser cette commande.");
				return console.log(chalk.greenBright(cmd.config.name+".js")+chalk.reset(" : ")+chalk.yellowBright(message.author.tag)+chalk.reset(` n'a pas la permission de modérateur pour faire la commande ${chalk.cyanBright(cmd.config.name)} sur le serveur ${chalk.magenta(message.guild.name)}.`));
			}
		}
		if(message.guild) console.log(`${chalk.greenBright(__filename.slice(__dirname.length + 1))} : ${chalk.yellowBright(message.author.tag)} a fait la commande ${chalk.cyanBright(cmd.config.name)} sur le serveur ${chalk.magenta(message.guild.name)}.`); else {
			if(cmd.config.serverForced) {
				message.channel.send("La commande est uniquement disponible sur un serveur.");
				return console.log(`${chalk.greenBright(__filename.slice(__dirname.length + 1))} : ${chalk.yellowBright(message.author.tag)} a essayé la commande ${chalk.cyanBright(cmd.config.name)} uniquement disponible sur serveur mais en privé.`);
			}
			console.log(`${chalk.greenBright(__filename.slice(__dirname.length + 1))} : ${chalk.yellowBright(message.author.tag)} a fait la commande ${chalk.cyanBright(cmd.config.name)} en privé au bot.`);
		}
		if(talkedRecently.has(message.author.id) && cmd.config.hasOwnProperty('cooldown')) return message.channel.send("Vous avez déjà fait cette commande trop récemment.\nTemps d'attente : "+cmd.config.cooldown+" secondes.");
		return(cmd.run(client, message, args).then(t => {
			
			if(cmd.config.hasOwnProperty("cooldown")) {
				talkedRecently.add(message.author.id);
				setTimeout(() => {
					talkedRecently.delete(message.author.id);
				}, 1000*cmd.config.cooldown);
			}
		}).catch(warning=>{
			let embed = new Discord.RichEmbed();
				embed.setDescription("Une erreur a eu lieu avec la commande : **"+cmd.config.name+"**.");
				embed.addField('Erreur :', warning);
				if(message.content.length < 512) embed.addField("Commande tappée :",message.content);
				else embed.addField("Commande tappée :","Plus de 512 caractères.");
				embed.addField("Commande tappée par :",message.author+" "+message.author.id);
				if(message.guild != null) embed.addField("Salon : ",message.channel.id);
				embed.setFooter(`${client.user.username} • `+moment().format('LT'),client.user.displayAvatarURL);
				embed.setColor("#dd0000");
			client.channels.get('544130287894790154').send(embed);
			message.channel.send("Il semblerait qu'il y ait une erreur avec cette commande."+
			"\nL'erreur a été averti au créateur.");
			console.log(chalk.red(`Une petite erreur a été faite quelque part avec la commande ${chalk.cyanBright(cmd.config.name)}. \nHeure : `+moment().format('LLLL')+
				"\nErreur : "+warning.stack));
		}));
		
	}
};