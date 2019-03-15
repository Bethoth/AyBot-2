module.exports.run = async (client, message, args, argsError) => {
	if(argsError);
	let guild = client.guilds.get(`${args[0]}`);
	if(guild == undefined) return await argsError("ID de serveur invalide. (ou le bot n'est pas dessus)");
	message.channel.send(guild.owner.user.tag);
}
module.exports.config = {
	category: "not-ready",
	name: __filename.slice(__dirname.length + 1, __filename.length - 3),
	aliases: [],
	serverForced: false
}

module.exports.help = {
	description: "",
	utilisations: ``,
	exemples: ``
}