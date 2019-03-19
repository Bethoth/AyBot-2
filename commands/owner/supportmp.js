const argsError = require("../../functions/argsError");
module.exports.run = async (client, message, args) => {
	let person = client.users.find(user => user.id == args[0]);
	if(person == undefined) return message.channel.send(argsError("Veuillez préciser une personne avec son ID.", "Erreur sur le premier argument.",client.commands.get(__filename.slice(__dirname.length + 1, __filename.length - 3))));
	args.splice(0, 1);
	let text = args.join(" ");
	if(text == undefined) return message.channel.send(argsError("Veuillez mettre du [texte].", "Erreur sur le deuxième argument.",client.commands.get(__filename.slice(__dirname.length + 1, __filename.length - 3))));
	person.send(text);
	message.channel.send(`Message bien envoyé en privé à ${person}.`)
}
module.exports.config = {
	category: "owner",
	name: __filename.slice(__dirname.length + 1, __filename.length - 3),
	aliases: [],
	serverForced: false
}

module.exports.help = {
	description: "Permet d'envoyer un message en privé à un [utilisateur].",
	utilisations: `supportmp [ID d'utilisateur] [texte]`,
	exemples: ``
}