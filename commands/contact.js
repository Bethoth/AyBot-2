const Discord = require("discord.js");
module.exports.run = async (client, message, args, argsError) => {
	if(argsError);
	if(args.length == 0) return await argsError("Veuillez mettre du [texte].")
	let text = args.join(" ");
	let embed = new Discord.RichEmbed();
	embed.setAuthor(`${message.author.tag} nous contact pour :`,message.author.displayAvatarURL);
	embed.setDescription(text);
	if(message.guild !== null) embed.setFooter("Du serveur :"+message.guild.name,message.guild.iconURL); else embed.setFooter("Envoyé en messages privés."); 

	client.channels.get("544130287894790154").send(embed);
	return message.channel.send("Message envoyé au créateur :ok_hand:.");
}
module.exports.config = {
	category: "utiles",
	cooldown: 300,
	name: __filename.slice(__dirname.length + 1, __filename.length - 3),
	aliases: ["support","supp","report"],
	serverForced: false
}

module.exports.help = {
	description: "Permet de contacter le créateur sur une suggestion ou un problème..\n**Temps d'attente entre 2 commandes : 5 minutes.**",
	utilisations: `contact [texte]`,
	exemples: `support Pourquoi la commande \`shrek\` ?`
}