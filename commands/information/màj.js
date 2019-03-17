const update = require("../../informations/updates.json");
const config = require("../../informations/config.json");
module.exports.run = async (client, message, args) => {
	let versions = "";
	Object.keys(update).forEach(version => {
		versions+=`\n${version}`;
	});
	if(args[0] == "liste" || !update.hasOwnProperty(args[0])) {
		if(message.guild.me.hasPermission('MANAGE_MESSAGES', true)) message.delete();
		return message.channel.send(`Liste des versions :\n**${versions}**`);
	}
	if(update.hasOwnProperty(args[0])) {
		message.channel.send(`Le contenu de la mise à jour ${args[0]} vous a été envoyé en **privé** ! :thumbsup:`); 
		return message.author.send(update[args[0]]); 
	}
	if(args.length < 1) {
		message.author.send(update[config.version]);
		message.channel.send("Le contenu de la dernière mise à jour vous a été envoyé en **privé** ! :thumbsup:");
	}
}
module.exports.config = {
	category: "informations",
	name: __filename.slice(__dirname.length + 1, __filename.length - 3),
	aliases: ["update","maj"],
	serverForced: false
}

module.exports.help = {
	description: "Vous envoie en privé le contenu d'une mise à jour ou de la dernière en date.",
	utilisations: `màj <version>\nmàj liste`,
	exemples: ``
}