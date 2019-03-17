const Discord = require("discord.js");
const config = require("../../informations/config.json");
module.exports.run = async (client, message, args, argsError) => {
	if(argsError);
	if(config.owners.includes(message.author.id)) {
		let channelID = args[0];
		let channel,text;
		if (!client.channels.get(channelID)) {
			let embed = new Discord.RichEmbed();
			text = args.join(" ");
			if(args[0].includes(`title=`)) {
				let title = String(text.slice(text.indexOf('title="'),text.lastIndexOf('" ')));
				title = title.substring(7,title.length);
				text = text.slice(text.lastIndexOf('" ')+2,text.length);
				if(title.length > 0 && title.length < 256) { embed.setTitle(title) } else { await argsError("Veuillez mettre un titre."); return message.delete(); }
			}
			//embed.setAuthor("",message.author.displayAvatarURL);
			embed.setDescription(text);
			embed.setColor("#4b5afd");
			if(text.length > 0 && text.length < 1024) { message.channel.send(embed); return message.delete(); } else return await argsError("Veuillez mettre du texte ou l'ID d'un salon dont le bot a accès.");
		} else {
			args.splice(0, 1);
			text = args.join(" ");
			let embed = new Discord.RichEmbed();
			channel = client.channels.find(chan => chan.id === channelID);
			if(args[0] == "--title") {
				let title = String(text.slice(text.indexOf(' "'),text.lastIndexOf('" ')));
				title = title.substring(2,title.length);
				text = text.slice(text.lastIndexOf('" ')+2,text.length);
				if(title.length > 0 && title.length < 256) { embed.setTitle(title); } else { await argsError("Veuillez mettre un titre"); return message.delete(); }
			}
			
			//embed.setAuthor("",message.author.displayAvatarURL);
			embed.setDescription(text);
			embed.setColor("#4b5afd");
			if(text.length > 0 && text.length < 1024) { return channel.send(embed); } else return await argsError("Veuillez mettre du texte.");
		}
	}
}
module.exports.config = {
	category: "owner",
	name: __filename.slice(__dirname.length + 1, __filename.length - 3),
	aliases: ["embddire","edire","embdire"],
	serverForced: false
}

module.exports.help = {
	description: "Permet de faire parler le bot avec un embed qui contient du [texte] ou avec différentes options.",
	utilisations: `embeddire [texte]\nembeddire title="[texte]" [texte]`,
	exemples: ``
}