module.exports.run = async (client, message, args) => {
	let texte = args.join(" ");
	let finalText = "`";
	if(args.length == 0 && message.guild.me.hasPermission('MANAGE_MESSAGES', true)) return message.delete();
	for(let i = 0; i < texte.length; i++) {
		finalText+="||"+texte.charAt(i)+"||";
	} 
	finalText+='`';
	message.channel.send(finalText);
}
module.exports.config = {
	category: "owner",
	name: __filename.slice(__dirname.length + 1, __filename.length - 3),
	aliases: ['sspam'],
	serverForced: false
}

module.exports.help = {
	description: "Renvoie le texte avec 1 spoil par caractère.",
	utilisations: `spamSpoil [texte]`,
	exemples: ``
}