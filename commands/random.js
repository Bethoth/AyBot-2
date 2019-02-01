const chalk = require("chalk");
module.exports.run = async (client, message, args) => {
	try {
        let nbr1;
        let nbr2 = 0;
        let nbrFinal;
        let nbrMax;
        let nbrMin;
        if(args[0]) nbr1 = args[0]; else message.channel.send("Merci d'entrer au moins un nombre");
        if(args[1]) nbr2 = args[1];
        if(nbr2 != 0 && nbr1 != nbr2) {
            if(nbr1 > nbr2) { nbrMax = Math.ceil(nbr1); nbrMin = Math.floor(nbr2); } else { nbrMax = Math.floor(nbr2); nbrMin = Math.ceil(nbr1); }
            nbrFinal = Math.floor(Math.random()* (nbrMax - nbrMin) + nbrMin);
            return message.channel.send("Résultat : "+nbrFinal+".");
        } else if(nbr2 == nbr1) return message.channel.send("Merci d'enter deux nombres différents.");
        if(nbr2 == 0 && nbr1 != 0) {
            nbrFinal = Math.floor(Math.random()*nbr1);
            return message.channel.send("Résultat : "+nbrFinal+".");
        } else message.channel.send("Merci d'entrer un nombre différent de 0.");

        

	} catch (e) {
		console.log(chalk.red("== ERREUR == \n\nFichier : "+__filename.slice(__dirname.length + 1)+"\n"+e+"\n"));
	}
}
module.exports.config = {
	category: "utiles",
	name: "random",
	aliases: ["randint","rand"]
}

module.exports.help = {
	description: "Permet de générer un nombre entier aléatoire entre 0 et [nombre1] ou entre [nombre1] et <nombre2>",
	utilisations: `random [nombre1] <nombre2>`,
	exemples: `random 5\nrand 2 8`
}