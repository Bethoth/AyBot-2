const userdata = require("../../informations/userdata.json");
const argsError = require("../../functions/argsError");
const fs = require("fs");
const Discord = require("discord.js");
const moment = require("moment");
module.exports.run = async (client, message, args) => {
	let person = "Aucune";
	if(message.mentions.members.size > 0) person = message.mentions.members.first();
	if(args.length > 0 && person == "Aucune") person = message.guild.members.get(args[0]);
	if(person == "Aucune" || person == undefined) return message.channel.send(argsError("Veuillez mettre l'ID ou la mention d'un membre.", "Erreur sur le premier argument.",client.commands.get(__filename.slice(__dirname.length + 1, __filename.length - 3))));
	
	let reason = "Non spécifiée.";
	if(args.length > 1) reason = args.slice(1,args.length).join(" ");

	if(!userdata[message.guild.id].hasOwnProperty(person.user.id) && !message.author.bot) {
		userdata[message.guild.id][person.user.id] = {}
	}
	fs.writeFile("./informations/userdata.json", JSON.stringify(userdata, null, '\t'), (err) => {if(err) console.log(err)});
	if(!userdata[message.guild.id][person.user.id].hasOwnProperty('sanctions')) {
		userdata[message.guild.id][person.user.id] = {'sanctions':[]};
	}
	fs.writeFile("./informations/userdata.json", JSON.stringify(userdata, null, '\t'), (err) => {if(err) console.log(err)});
	
	now = new Date();
	userdata[message.guild.id][person.user.id].sanctions.push({
		"sanction":"warn",
		"reason":reason,
		"date":now.getTime(),
		"case":parseInt(userdata.sanctionsLastNumber)
	});
	userdata.sanctionsLastNumber++;
	fs.writeFile("./informations/userdata.json", JSON.stringify(userdata, null, '\t'), (err) => {if(err) console.log(err)});
	
	let embed = new Discord.RichEmbed();
	embed.setAuthor(`Avertissement (cas ${userdata.sanctionsLastNumber-1}) :`);
	embed.setDescription(`Membre : ${person}\nID : ${person.user.id}\nServeur : \`${message.guild.name}\``);
	embed.addField("Raison : ", reason);
	embed.setColor("#4b5afd");
	embed.setFooter(`AyBot 2 • `+moment().format('LT'),client.user.displayAvatarURL);
	person.user.send(embed);
	message.channel.send(embed);
}
module.exports.config = {
	category: "modération",
	name: __filename.slice(__dirname.length + 1, __filename.length - 3),
	aliases: [],
	serverForced: true
}

module.exports.help = {
	description: "Permet d'ajouter un avertissement à un [membre] du serveur avec une <raison>.",
	utilisations: `warn [ID ou mention de membre] <raison>`,
	exemples: `warn <@277351514475986944> Insultes.`
}