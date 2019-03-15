module.exports.run = async (client, message, args) => {
    if(args.length > 0) {
		let find = args.join(" ").toString();
		let link = " Votre recherche : https://developer.mozilla.org/fr/search?q="+find;
		if(message.guild && message.guild.me.hasPermission('MANAGE_MESSAGES', true)) message.delete();
		return message.channel.send(link);
	} else {
		message.channel.send("Voici la documentation en JavaScript : https://developer.mozilla.org/fr/docs/Web/JavaScript");
		if(message.guild && message.guild.me.hasPermission('MANAGE_MESSAGES', true)) message.delete();
	}
}
module.exports.config = {
	category: "utiles",
	name: __filename.slice(__dirname.length + 1, __filename.length - 3),
	aliases: ["djs","docjs"],
	serverForced: false
}

module.exports.help = {
	description: "Envoie le lien de la documentation de MDN en JavaScript ou permet de faire une recherche.",
	utilisations: `docJS <texte>`,
	exemples: ``
}