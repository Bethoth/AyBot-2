const argsError = require("../../functions/argsError");
module.exports.run = async (client, message, args) => {
	let nbr1,nbr2 = 0,nbrFinal,nbrMax,nbrMin;
	if(args[0]) nbr1 = args[0]; else return message.channel.send(argsError("Veuillez entrer au moins 1 nombre.", "1 argument attendu.",client.commands.get(__filename.slice(__dirname.length + 1, __filename.length - 3))));
	if(args[1]) nbr2 = args[1];
	if(nbr2 != 0 && nbr1 != nbr2) {
		if(nbr1 > nbr2) { nbrMax = Math.ceil(nbr1); nbrMin = Math.floor(nbr2); } else { nbrMax = Math.floor(nbr2); nbrMin = Math.ceil(nbr1); }
		nbrFinal = Math.floor(Math.random()* (nbrMax - nbrMin) + nbrMin);
		return message.channel.send("Résultat : "+nbrFinal+".");
	} else if(nbr2 == nbr1) return message.channel.send(argsError("Veuillez entrer 2 nombres différents.", "Erreur sur les arguments.",client.commands.get(__filename.slice(__dirname.length + 1, __filename.length - 3))));
	if(nbr2 == 0 && nbr1 != 0) {
		nbrFinal = Math.floor(Math.random()*nbr1);
		return message.channel.send("Résultat : "+nbrFinal+".");
	} else return message.channel.send(argsError("Veuillez entrer un nombre différent de 0.", "Erreur sur le deuxième argument.",client.commands.get(__filename.slice(__dirname.length + 1, __filename.length - 3))));
}
module.exports.config = {
	category: "fun",
	name: __filename.slice(__dirname.length + 1, __filename.length - 3),
	aliases: ["randint","rand"],
	serverForced: false
}

module.exports.help = {
	description: "Permet de générer un nombre entier aléatoire entre 0 et [nombre1] ou entre [nombre1] et <nombre2>.",
	utilisations: `random [nombre1] <nombre2>`,
	exemples: `random 5\nrand -2 8`
}