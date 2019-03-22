const Discord = require("discord.js");
const moment = require("moment");
const argsError = require("../../functions/argsError");
module.exports.run = async (client, message, args) => {
	let emoji = args[0] ? args[0] : "Aucun";
	let emojis = client.emojis.array();
	let name,id;

	if(emoji == "Aucun") return message.channel.send(argsError("Veuillez mettre un émoji ou `liste`.", "1 argument attendus",client.commands.get(__filename.slice(__dirname.length + 1, __filename.length - 3))));
	if(emoji == "liste" || emoji == "list") {
		let emojis = message.guild.emojis.filter(e => {if(!e.animated) return e}).map(e => e.toString()).join(" ");
		let animEmojis = message.guild.emojis.filter(e => {if(e.animated) return e}).map(e => e.toString()).join(" ");

		let embed = new Discord.RichEmbed();
		embed.setAuthor("Liste des émojis du serveur : ",message.guild.iconURL);
		embed.setDescription(emojis);
		embed.addField("Émojis animés :",animEmojis);
		embed.setColor("#4b5afd");
		embed.setFooter(`AyBot • `+moment().format('LT'),client.user.displayAvatarURL);
		return message.channel.send(embed);
	} else {
		let anim = false;
		if(emoji.includes('<a:')) anim = true;
		if(!emoji.includes('<')) {
			name = args[0];
			emojiFind = message.guild.emojis.find(e => e.name == name);
			if(emojiFind == null) return message.channel.send(argsError("Cet émoji n'a pas été trouvé ou est un émoji de base.", "Erreur sur l'argument.",client.commands.get(__filename.slice(__dirname.length + 1, __filename.length - 3))));
			id = emojiFind.id;
			anim = emojiFind.animated;
		} else {
			name = String(emoji.slice(emoji.indexOf(":")+1,emoji.lastIndexOf(":")));
			id = emoji.slice(emoji.lastIndexOf(":")+1,emoji.lastIndexOf(">"));
		}
		if(id != undefined && id != null) {
			if(anim) {
				emojiFinal = client.guilds.get('512735679474827275').createEmoji(`https://cdn.discordapp.com/emojis/${id}.gif`, name).then(e=>{
					let embed = new Discord.RichEmbed();
					embed.setAuthor("Information sur l'émoji :",message.author.displayAvatarURL);
					embed.setThumbnail(`https://cdn.discordapp.com/emojis/${id}.gif`);
					embed.setColor("#4b5afd");
					embed.setDescription(`Émoji : ${e}
ID : **${id}**
Nom : **${name}**
Créé le : **${moment(e.createdAt).format("DD/MM/YYYY** à **hh:mm")}**`);
					message.channel.send(embed);
					console.log("oui animé");
					delete client.guilds.get('512735679474827275').emojis.get(e.id);
				});
			} else {		
				emojiFinal = client.guilds.get('512735679474827275').createEmoji(`https://cdn.discordapp.com/emojis/${id}.png`, name).then(e=>{
					let embed = new Discord.RichEmbed();
					embed.setAuthor("Information sur l'émoji :",message.author.displayAvatarURL);
					embed.setThumbnail(`https://cdn.discordapp.com/emojis/${id}.png`);
					embed.setColor("#4b5afd");
					embed.setDescription(`Émoji : ${e}
ID : **${id}**
Nom : **${name}**
Créé le : **${moment(e.createdAt).format("DD/MM/YYYY** à **hh:mm")}**`);
					message.channel.send(embed);
					delete client.guilds.get('512735679474827275').emojis.get(e.id);
				});
			}
		} else return message.channel.send(argsError("Veuillez mettre un émoji valide.", "Erreur sur l'argument.",client.commands.get(__filename.slice(__dirname.length + 1, __filename.length - 3))));
	}
}
module.exports.config = {
	category: "informations",
	name: __filename.slice(__dirname.length + 1, __filename.length - 3),
	aliases: ["émojis","emoji","emojis"],
	serverForced: false
}

module.exports.help = {
	description: "Permet d'avoir la liste des émojis du serveur ou des informations sur un [émoji].",
	utilisations: `émoji [émoji]\némoji liste (uniquement sur serveur)`,
	exemples: ``
}
