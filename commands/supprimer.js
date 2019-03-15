module.exports.run = async (client, message, args, argsError) => {
	if(argsError);
	if(args[0]) var nbr = args[0]; else return await argsError("Veuillez préciser un [nombre].");
	let member = "Aucun";
	++nbr;
	if(nbr > 100 || nbr < 1) return await argsError("Veuillez mettre un [nombre] entre 1 et 100.");
	if(args.size > 1) {
		if(message.mentions.users.size > 0) member = message.mentions.users.first();
	}
	if(member == "Aucun") {
		message.channel.bulkDelete(nbr,true);
	} else {
		message.channel.fetchMessages({ limit: 100, }).then(messages => {
			messages = messages.filter(m => m.author === member).array().slice(0, nbr);
			messages.channel.bulkDelete(messages,true).catch(console.error());
		});
	}
}
module.exports.config = {
	category: "modération",
	name: __filename.slice(__dirname.length + 1, __filename.length - 3),
	aliases: ["clear","purge","suppr","clr"],
	serverForced: true
}

module.exports.help = {
	description: "Permet de supprimer un [nombre] de messages ou [nombre] de messages d'un membre grâce une <mention>.",
	utilisations: `supprimer [nombre] <mention>`,
	exemples: `supprimer 5\nsuppr 12 @Ayfri#0453`
}