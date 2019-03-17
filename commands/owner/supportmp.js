module.exports.run = async (client, message, args, argsError) => {
	let person = client.users.find(user => user.tag == args[0]);
	if(person == undefined) return await argsError("Veuillez préciser une personne.");
	args.splice(0, 1);
	let text = args.join(" ");
	if(text == undefined) return await argsError("Veuillez mettre du texte.");
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
	utilisations: `supportmp [tag d'un utilisateur] [texte]`,
	exemples: ``
}