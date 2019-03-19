const argsError = require("../../functions/argsError");
module.exports.run = async (client, message, args) => {
	let guild = client.guilds.get(`${args[0]}`);
	if(guild == undefined) return message.channel.send(argsError("L'ID n'est pas valide ou le bot n'est pas sur ce serveur.", "Erreur sur l'argument.",client.commands.get(__filename.slice(__dirname.length + 1, __filename.length - 3))));
	message.channel.send(guild.owner.user.tag);
}
module.exports.config = {
	category: "owner",
	name: __filename.slice(__dirname.length + 1, __filename.length - 3),
	aliases: [],
	serverForced: false
}

module.exports.help = {
	description: "",
	utilisations: ``,
	exemples: ``
}