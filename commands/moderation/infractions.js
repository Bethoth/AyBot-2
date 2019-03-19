const userdata = require("../../informations/userdata.json");
const argsError = require("../../functions/argsError");
const Discord = require("discord.js");
const fs = require("fs");
const moment = require("moment");
module.exports.run = async (client, message, args) => {
	
	function sortInfracsWithPage(pageNumber, user, embed) {
		let pageMax = Math.floor(userdata[message.guild.id][user.id].sanctions.length/10)+1;
		if(args[2] > pageMax || args[2] < 1 || !parseInt(args[2])) pageNumber = pageMax; 
		
		let warns = 0,bans = 0,kicks = 0,mutes = 0;
		embedDesc = userdata[message.guild.id][user.id].sanctions.map(sanction => {
			if(sanction.sanction == "warn") warns++;
			if(sanction.sanction == "ban" || sanction.sanction == "tempban") bans++;
			if(sanction.sanction == "kick") kicks++;
			if(sanction.sanction == "mute" || sanction.sanction == "tempmute") mutes++;
			return `**cas ${sanction.case}** |** __${sanction.sanction}__**\t|\t${sanction.reason}`;
		}).slice((pageNumber*10)-10,pageNumber*10).join("\n");

		embed.setAuthor('Sanctions de : '+user.tag,user.displayAvatarURL);
		embed.setDescription(`Bannissements : **${bans}** Éjections : **${kicks}** Silences : **${mutes}** Avertissements : **${warns}**\n\n`+embedDesc);
		embed.setFooter(`Aybot 2 • Page ${pageNumber}/${pageMax}`, client.user.displayAvatarURL);
		return message.channel.send(embed);
	};
	
	let page = 0;
	if(args.length > 2) page = args[2];
	let person = args.length > 1 ? message.mentions.members.first() || message.guild.members.get(args[1]) : message.member;
	if(person == undefined) person = message.member;
	let embed = new Discord.RichEmbed();
	embed.setColor("#4b5afd");
	if(args[0] == "supprimer") {
		if(!userdata[message.guild.id].hasOwnProperty(person.user.id) || !userdata[message.guild.id][person.user.id].hasOwnProperty('sanctions')) {
			return message.channel.send(argsError("Cette personne n'a aucune sanctions.", "Erreur sur les arguments.",client.commands.get(__filename.slice(__dirname.length + 1, __filename.length - 3))));
		} else {
			if(args[2] == "toutes") {
				try { message.guild.unban(person.user.id); } catch(e) {}
				
				userdata[message.guild.id][person.user.id].sanctions.splice(0, userdata[message.guild.id][person.user.id].sanctions.length);
				fs.writeFile("./informations/userdata.json", JSON.stringify(userdata, null, '\t'), (err) => {if(err) console.log(err)});
				return message.channel.send(`Toutes les sanctions de ${person.user.tag} ont été supprimées.`);
			} else if(parseInt(args[2])) {

				userdata[message.guild.id][person.user.id].sanctions.forEach((sanction, index) => {
					if(args[2] == sanction.case) {
						if(sanction.sanction == "ban") message.guild.unban(person.user.id);
						message.channel.send(`La sanction ${args[2]} a bien été supprimé. (${sanction.sanction})`);
						userdata[message.guild.id][person.user.id].sanctions.splice(index, 1);
						return fs.writeFile("./informations/userdata.json", JSON.stringify(userdata, null, '\t'), (err) => {if(err) console.log(err)});
					} else {
						return message.channel.send(argsError(`La sanction ${args[2]} n'a pas été trouvée ou n'est pas valide.`, "Erreur sur le troisième argument.",client.commands.get(__filename.slice(__dirname.length + 1, __filename.length - 3))));
					}
				});

			} else {
				return message.channel.send(argsError("Veuillez mettre `toutes` ou le numéro d'une sanction valide.", "3 arguments attendus.",client.commands.get(__filename.slice(__dirname.length + 1, __filename.length - 3))));
			}
		}
	} else if(args[0] == "modifier") {
		
				if(userdata[message.guild.id].find()) return console.log("trouvé !");
			
		if(!userdata[message.guild.id].hasOwnProperty(person.user.id) || !userdata[message.guild.id][person.user.id].hasOwnProperty('sanctions')) {
			return message.channel.send(argsError("Cette personne n'a aucune sanctions.", "Erreur sur les arguments.",client.commands.get(__filename.slice(__dirname.length + 1, __filename.length - 3))));
		} else if(parseInt(args[2])) {

			userdata[message.guild.id][person.user.id].sanctions.forEach((sanction, index) => {
				if(args[2] == sanction.case) {
					if(args.length < 4) return message.channel.send(argsError("Veuillez mettre la nouvelle raison de cette sanction.", "4 arguments attendus.",client.commands.get(__filename.slice(__dirname.length + 1, __filename.length - 3))));

					sanctionFinded = userdata[message.guild.id][person.user.id].sanctions.find(sanction => sanction.case == args[2])
					sanctionFinded.reason = args[3];

					fs.writeFile("./informations/userdata.json", JSON.stringify(userdata, null, '\t'), (err) => {if(err) console.log(err)});
					return message.channel.send(`La sanction ${args[2]} a bien été modifié. (${sanction.sanction})`);
				}
			});
		} else {
			return message.channel.send(argsError("Veuillez mettre `toutes` ou le numéro d'une sanction valide.", "3 arguments attendus.",client.commands.get(__filename.slice(__dirname.length + 1, __filename.length - 3))));
		}
	} else if(args[0] == "voir") {
		if(!userdata[message.guild.id].hasOwnProperty(person.user.id) || !userdata[message.guild.id][person.user.id].hasOwnProperty('sanctions')) {
			embed.setAuthor('Sanctions de : '+person.user.tag,person.user.displayAvatarURL);
			embed.setDescription(`Bannissements : **0** Éjections : **0** Silences : **0** Avertissements : **0**`);
			embed.setFooter(`AyBot 2 • `+moment().format('LT'),client.user.displayAvatarURL);
			return message.channel.send(embed);
		} else {
			return sortInfracsWithPage(page, person.user, embed);
		}
	} else return message.channel.send(argsError("Veuillez mettre `modifier`/`supprimer`/`voir`.", "Erreur sur le premier argument.",client.commands.get(__filename.slice(__dirname.length + 1, __filename.length - 3))));

}
module.exports.config = {
	category: "modération",
	name: __filename.slice(__dirname.length + 1, __filename.length - 3),
	aliases: ['infracs'],
	serverForced: true
}

module.exports.help = {
	description: "Permet de modifier/supprimer/voir les infractions d'un <membre> ou de vous même.",
	utilisations: `infractions modifier [ID/Mention de membre] [numéro de cas] [nouvelle raison]\ninfractions supprimer [ID/Mention de membre] [numéro de cas/toutes]\ninfractions voir <ID/Mention de membre> <page>`,
	exemples: `infractions voir 386893236498857985\ninfractions supprimer <@386893236498857985> toutes`
}