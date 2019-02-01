const chalk = require("chalk");
module.exports.run = async (client, message, args) => {
	try {
        let reponses = ['bien sur !',
        'je crois oui...',
        'pour le coup je sais pas...',
        'mmmmh demande plus tard.',
        'alors je crois mais vraiment je suis pas du tout sûr...',
        'oui.',
        'non.',
        'possible...',
        'non impossible.',
        "ça m'étonnerait...",
        'je crois pas...',
        "devine :3",
        "j'ai pas envie de le dire.",
        "boarf, ça dépend...",
        "mmmmh, excellente question !",
        "c'est obligé !",
        "alors si ça arrive je demissionne.",
        "oui oui bien sûr... et puis quoi encore...",
        "je l'ai sur le bout de la langue mais... Non je sais pas..."];
        if(args < 1) {  return message.channel.send("Veuillez mettre une question."); } else { return message.channel.send(`**${message.author.username}**, ${String(reponses[Math.floor(Math.random()*reponses.length)])}`); }
	} catch (e) {
		console.log(chalk.red("== ERREUR == \n\nFichier : "+__filename.slice(__dirname.length + 1)+"\n"+e+"\n"));
	}
}
module.exports.config = {
	category: "fun",
	name: "avenir",
	aliases: ["av","futur"]
}

module.exports.help = {
	description: "Donne une réponse aux questions simples (oui/non), attention, pas fiable à 100%.",
	utilisations: `avenir [question]`,
	exemples: ``
}