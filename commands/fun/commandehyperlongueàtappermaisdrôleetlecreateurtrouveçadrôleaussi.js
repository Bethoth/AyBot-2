module.exports.run = async (client, message, args) => {
	if(message.guild && message.guild.me.hasPermission('MANAGE_MESSAGES', true)) message.delete();
    message.author.send("Eh beh, c'était pas trop long de tapper ça ? "+message.author);
}
module.exports.config = {
	category: "cachée",
	name: __filename.slice(__dirname.length + 1, __filename.length - 3),
	aliases: ["mdr"],
	serverForced: false
}

module.exports.help = {
	description: "GG t'as eu le courrage de la tapper !",
	utilisations: `commandehyperlongueàtappermaisdrôleetlecreateurtrouveçadrôleaussi`,
	exemples: ``
}