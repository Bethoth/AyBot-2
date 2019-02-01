const chalk = require("chalk");
module.exports.run = async (client, message, args) => {
	try {
        message.channel.send("Voici la documentation de Discord.js : https://discord.js.org/#/docs/main");
	} catch (e) {
		console.log(chalk.red("== ERREUR == \n\nFichier : "+__filename.slice(__dirname.length + 1)+"\n"+e+"\n"));
	}
}
module.exports.config = {
	category: "utiles",
	name: "docDiscordJS",
	aliases: ["docDJS","docdiscordjs","docdjs"]
}

module.exports.help = {
	description: "Affiche le lien de la documentation de discord.js.",
	utilisations: `docJS`,
	exemples: ``
}