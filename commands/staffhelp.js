const servconfig = require("../informations/servconfig.json");
module.exports.run = async (client, message, args) => {
	let channel = client.channels.get(servconfig[message.guild.id].staffchannel);
	channel.send(`${message.author} a besoin d'aide dans ${message.channel}.`);
}
module.exports.config = {
	category: "utiles",
	name: __filename.slice(__dirname.length + 1, __filename.length - 3),
	aliases: ["staffhlp","staffaide"],
	cooldown: 60,
	serverForced: true
}

module.exports.help = {
	description: "Permet d'envoyer un message dans le salon de staff disant que vous avez besoin d'aide et où.",
	utilisations: `staffhelp`,
	exemples: ``
}