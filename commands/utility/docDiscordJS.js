module.exports.run = async (client, message, args) => {
    if(args.length > 0) {
		let find = args.join(" ").toString();
		let link = " Votre recherche : https://discord.js.org/#/docs/main/stable/search?q="+find;
		console.trace();
		if(message.guild && message.guild.me.hasPermission('MANAGE_MESSAGES', true)) message.delete();
		return message.channel.send(link);
	} else {
		message.channel.send("Voici la documentation de Discord.js : https://discord.js.org/#/docs/main");
		if(message.guild && message.guild.me.hasPermission('MANAGE_MESSAGES', true)) message.delete();
	}
}
module.exports.config = {
	category: "utiles",
	name: __filename.slice(__dirname.length + 1, __filename.length - 3),
	aliases: ["docDJS","docdiscordjs","docdjs"],
	serverForced: false
}

module.exports.help = {
	description: "Envoie le lien de la documentation officielle de Discord.js ou permet de faire une recherche.",
	utilisations: `docJS <recherche>`,
	exemples: ``
}