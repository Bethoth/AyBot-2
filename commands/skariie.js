const Discord = require("discord.js");
const chalk = require("chalk");
module.exports.run = async (client, message, args) => {
	try {
        const skariie = client.users.get("509726675416645642");
        const embed = new Discord.RichEmbed()
        embed.setTitle("Informations sur Skariie_")
        embed.setThumbnail(skariie.displayAvatarURL)
        embed.setColor("#4b5afd")
        embed.setDescription(`Compte Discord : ${skariie.tag}\n\n`+
                                "**Liens utiles :**\n\n"+
                                "Twitter : https://twitter.com/SkariieOff"
        );
        message.channel.send(embed);
	} catch (e) {
		console.log(chalk.red("== ERREUR == \n\nFichier : "+__filename.slice(__dirname.length + 1)+"\n"+e+"\n"));
	}
}
module.exports.config = {
	category: "informations",
	name: "skariie",
	aliases: ["skr","host"]
}

module.exports.help = {
	description: "Permet de voir des informations sur Skariie_#0001 l'hébergeur du bot.",
	utilisations: `skariie`,
	exemples: ``
}