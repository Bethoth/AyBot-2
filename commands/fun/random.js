module.exports.run = async (client, message, args, argsError) => {
	let nbr1,nbr2 = 0,nbrFinal,nbrMax,nbrMin;
	if(args[0]) nbr1 = args[0]; else return await argsError("Veuillez écrire au moins un nombre.");
	if(args[1]) nbr2 = args[1];
	if(nbr2 != 0 && nbr1 != nbr2) {
		if(nbr1 > nbr2) { nbrMax = Math.ceil(nbr1); nbrMin = Math.floor(nbr2); } else { nbrMax = Math.floor(nbr2); nbrMin = Math.ceil(nbr1); }
		nbrFinal = Math.floor(Math.random()* (nbrMax - nbrMin) + nbrMin);
		return message.channel.send("Résultat : "+nbrFinal+".");
	} else if(nbr2 == nbr1) return await argsError("Veuillez d'enter deux nombres différents.");
	if(nbr2 == 0 && nbr1 != 0) {
		nbrFinal = Math.floor(Math.random()*nbr1);
		return message.channel.send("Résultat : "+nbrFinal+".");
	} else await argsError("Veuillez d'entrer un nombre différent de 0.");
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