const userdata = require("../../informations/userdata.json");
const fs = require("fs");
const Discord = require("discord.js");
const moment = require("moment");
module.exports.run = async (client, message, args, argsError) => {
	if(argsError);
	
	let person = "Aucune";
	if(message.mentions.members.size > 0) person = message.mentions.members.first();
	if(args.length > 0 && person == "Aucune") person = message.guild.members.get(args[0]);
	if(person == "Aucune") return await argsError("Veuillez mettre [l'ID ou la mention d'un membre].");
	
	let reason = "Non spécifiée.";
	if(args.length > 1) reason = args.slice(1,args.length).join(" ");

	if(!userdata[message.guild.id].hasOwnProperty(person.user.id) && !message.author.bot) {
		userdata[message.guild.id][person.user.id] = {}
	}
	fs.writeFile("./../informations/userdata.json", JSON.stringify(userdata, null, '\t'), (err) => {if(err) console.log(err)});
	if(!userdata[message.guild.id][person.user.id].hasOwnProperty('sanctions')) {
		userdata[message.guild.id][person.user.id] = {'sanctions':[]};
	}
	fs.writeFile("./../informations/userdata.json", JSON.stringify(userdata, null, '\t'), (err) => {if(err) console.log(err)});
	
	now = new Date();
	userdata[message.guild.id][person.user.id].sanctions.push({
		"sanction":"ban",
		"reason":reason,
		"date":now.getTime(),
		"case":parseInt(userdata.sanctionsLastNumber)
	});
	userdata.sanctionsLastNumber++;
	fs.writeFile("./../informations/userdata.json", JSON.stringify(userdata, null, '\t'), (err) => {if(err) console.log(err)});
	
	let embed = new Discord.RichEmbed();
	embed.setAuthor(`Éjection (cas ${userdata.sanctionsLastNumber-1}) :`);
	embed.setDescription(`Membre : ${person}\nID : ${person.user.id}\nServeur : \`${message.guild.name}\``);
	embed.addField("Raison : ", reason);
	embed.setColor("#4b5afd");
	embed.setFooter(`AyBot 2 • `+moment().format('LT'),client.user.displayAvatarURL);
	person.user.send(embed);
	message.channel.send(embed);
	person.kick();
}
module.exports.config = {
	category: "modération",
	name: __filename.slice(__dirname.length + 1, __filename.length - 3),
	aliases: [],
	serverForced: true
}

module.exports.help = {
	description: "Permet d'éjecter un [membre] du serveur avec une <raison>.",
	utilisations: `kick [ID ou mention de membre] <raison>`,
	exemples: `kick <@159985870458322944> Spam de mentions.`
}