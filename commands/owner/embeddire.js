const toEmbed = require("../../functions/KingEmbed");
const config = require("../../informations/config.json");
const argsError = require("../../functions/argsError");
module.exports.run = async (client, message, args) => {
	if(config.owners.includes(message.author.id)) {
		let channelID = args[0];
		let channel,text;
		if (!client.channels.get(channelID)) {
			text = args.join(" ");

			if(text.length > 0 && text.length < 1024) {
				message.channel.send(toEmbed(text, message.guild)).catch(async (err) => {
					await message.channel.send(`Une erreur a eu lieu dans votre message : ${err.message}`);
					await message.channel.send(`\`\`\`md\n${text}\`\`\``);
				});

				if(message.guild && message.guild.me.hasPermission('MANAGE_MESSAGES', true)) return message.delete();
			
			} else return message.channel.send(argsError("Veuillez mettre du texte.", "Erreur sur l'argument.",client.commands.get(__filename.slice(__dirname.length + 1, __filename.length - 3))));
		} else {
			args.splice(0, 1);
			text = args.join(" ");
			channel = client.channels.find(chan => chan.id === channelID);

			if(text.length > 0 && text.length < 1024) {
				return channel.send(toEmbed(text, channel.guild)).catch(async (err) => {
					await message.channel.send(`Une erreur a eu lieu dans votre message : ${err.message}`);
					await message.channel.send(`\`\`\`md\n${text}\`\`\``);
				});

			} else return message.channel.send(argsError("Veuillez mettre du texte.", "Erreur sur l'argument.",client.commands.get(__filename.slice(__dirname.length + 1, __filename.length - 3))));
		}
	}
}
module.exports.config = {
	category: "owner",
	name: __filename.slice(__dirname.length + 1, __filename.length - 3),
	aliases: ["embedsay","edire","embdire"],
	serverForced: false
}

module.exports.help = {
	description: "**Système fait par Ghom.**\nPermet de faire parler le bot avec un embed qui contient du [texte] et/ou avec différentes options.",
	utilisations: `- Les [argument] reçoivent un argument textuel.
- Les {arguments} doivent être écrits comme tels.
- Les [arguments{arguments}] demandent 2 arguments.

> Les paramètres de l'embed :

**{time}** met l'heure en bas.
**e[emojiName]e** met un émoji.
**t[titre]t** met le titre.
**i[lien]i** ajoute une image.
**l[lien]l** met un logo à gauche.
**c[couleur]c** met une couleur.
**b[texte{lien}]b** met du texte en base avec une petite image.
**a[nom{lien}]a** met un titre avec une petite image.
**f[nom{valeur}]f** ajoute une partie.`,
	exemples: `embeddire e[ok_dab]e {time} t[hey]t ça va ?`
}